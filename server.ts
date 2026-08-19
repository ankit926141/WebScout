import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { executeWebScrapingSearch, scrapeDirectUrl } from './server/scraper';
import { MONITORED_WEBSITES } from './server/knowledgeBank';
import { getAllSources, addCustomDomain, removeCustomDomain } from './server/customSources';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // CORS and Security Headers for Web & Mobile APK WebViews
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // API Routes First
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Directory of monitored & custom added websites
  app.get('/api/websites', (req, res) => {
    const allSources = getAllSources();
    res.json({
      total: allSources.length,
      websites: allSources
    });
  });

  // Add one or multiple custom domains for scraping
  app.post('/api/websites', (req, res) => {
    try {
      const { domain, domains, category } = req.body;
      const added: any[] = [];

      if (Array.isArray(domains)) {
        for (const d of domains) {
          if (typeof d === 'string') {
            const res = addCustomDomain(d, category);
            if (res) added.push(res);
          }
        }
      } else if (typeof domain === 'string' && domain.trim()) {
        const res = addCustomDomain(domain, category);
        if (res) added.push(res);
      } else {
        res.status(400).json({ error: 'Please provide a domain name (e.g. linkedin.com, instagram.com, custom-news.org).' });
        return;
      }

      if (added.length === 0) {
        res.status(400).json({ error: 'Invalid domain format. Please enter valid domains like "example.com".' });
        return;
      }

      res.json({
        success: true,
        message: `Successfully registered ${added.length} web source(s) into active scraping engine.`,
        added,
        total: getAllSources().length
      });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Failed to add custom domain.' });
    }
  });

  // Remove a custom domain
  app.delete('/api/websites/:idOrDomain', (req, res) => {
    const { idOrDomain } = req.params;
    if (!idOrDomain) {
      res.status(400).json({ error: 'Identifier is required.' });
      return;
    }
    const removed = removeCustomDomain(idOrDomain);
    res.json({
      success: removed,
      message: removed ? 'Web source removed from active scraping index.' : 'Source not found or cannot be removed.',
      total: getAllSources().length
    });
  });

  // Custom Direct URL Scraper
  app.post('/api/scrape', async (req, res) => {
    try {
      const { url } = req.body;
      if (!url || typeof url !== 'string') {
        res.status(400).json({ error: 'Valid URL is required.' });
        return;
      }
      const result = await scrapeDirectUrl(url);
      if (!result) {
        res.status(404).json({ error: 'Could not extract text content from the requested URL.' });
        return;
      }
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Scraper encountered an error.' });
    }
  });

  // Instant Web Search and Scraping
  app.get('/api/search', async (req, res) => {
    try {
      const query = (req.query.q as string) || '';
      if (!query.trim()) {
        res.status(400).json({ error: 'Search query is required' });
        return;
      }
      const result = await executeWebScrapingSearch(query);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Search execution failed.' });
    }
  });

  // Single Chatbot Chat Message Handler
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string' || !message.trim()) {
        res.status(400).json({ error: 'Message cannot be empty.' });
        return;
      }

      const summaryData = await executeWebScrapingSearch(message);

      res.json({
        reply: summaryData.conciseSummary,
        headline: summaryData.headline,
        summaryData
      });
    } catch (err: any) {
      res.status(500).json({ error: err?.message || 'Chatbot search failure.' });
    }
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WebScout Android Chatbot server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
