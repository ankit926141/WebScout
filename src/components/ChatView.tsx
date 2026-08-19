import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Search,
  Bot,
  User,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Globe,
  Layers,
  ArrowUpRight,
  RefreshCw,
  Zap,
  UserCheck,
  Share2,
  Linkedin,
  Instagram,
  Twitter,
  Github
} from 'lucide-react';
import { ChatMessage, ScrapedSource, SearchSummary, VerifiedProfileLink } from '../types';
import { executeClientSideFallbackSearch } from '../utils/localSearch';

interface ChatViewProps {
  onOpenSourceModal: (source: ScrapedSource) => void;
  onOpenWebsitesDrawer: () => void;
  suggestedTopicQuery?: string | null;
  onClearSuggestedTopic?: () => void;
}

const SAMPLE_QUESTIONS = [
  'Satya Nadella (Microsoft CEO & Leadership)',
  'Sam Altman (OpenAI Founder & Tech History)',
  'What are the latest James Webb Space Telescope discoveries?',
  'How does Rust ownership model prevent memory leaks?',
  'Explain post-quantum cryptography standards and NIST lattices',
  'How does the MIND diet support brain health and longevity?'
];

export const ChatView: React.FC<ChatViewProps> = ({
  onOpenSourceModal,
  onOpenWebsitesDrawer,
  suggestedTopicQuery,
  onClearSuggestedTopic
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'bot',
      text: "Hello! I'm your WebScout Chatbot. I search across 50+ web domains plus live sources (including LinkedIn, Instagram, X/Twitter, and custom added websites), scrape content in real-time, and parse the data into concise summaries. Search any topic, technology, or person name to begin!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (suggestedTopicQuery) {
      handleSendMessage(suggestedTopicQuery);
      if (onClearSuggestedTopic) onClearSuggestedTopic();
    }
  }, [suggestedTopicQuery]);

  const handleCopySummary = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const botPlaceholderId = `bot-${Date.now()}`;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: query,
      timestamp: timeNow
    };

    const newBotMsg: ChatMessage = {
      id: botPlaceholderId,
      sender: 'bot',
      text: '',
      timestamp: timeNow,
      isSearching: true,
      searchProgress: {
        step: 'analyzing',
        message: 'Analyzing search query and target domains...'
      }
    };

    setMessages(prev => [...prev, newUserMsg, newBotMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      setTimeout(() => {
        setMessages(prev =>
          prev.map(m =>
            m.id === botPlaceholderId
              ? {
                  ...m,
                  searchProgress: {
                    step: 'scraping',
                    message: 'Scraping web sources, social directories & monitored domains...',
                    sitesCheckedCount: 55
                  }
                }
              : m
          )
        );
      }, 350);

      setTimeout(() => {
        setMessages(prev =>
          prev.map(m =>
            m.id === botPlaceholderId
              ? {
                  ...m,
                  searchProgress: {
                    step: 'parsing',
                    message: 'Extracting profile bio, articles & calculating sentence relevance...'
                  }
                }
              : m
          )
        );
      }, 750);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      if (!res.ok) {
        throw new Error('Search scraper request failed.');
      }

      const data = await res.json();
      const summaryData: SearchSummary = data.summaryData;

      setMessages(prev =>
        prev.map(m =>
          m.id === botPlaceholderId
            ? {
                ...m,
                isSearching: false,
                text: summaryData.conciseSummary,
                summaryData: summaryData,
                searchProgress: {
                  step: 'completed',
                  message: `Scraped and synthesized ${summaryData.totalSitesScraped} sources in ${summaryData.scrapingDurationMs}ms`
                }
              }
            : m
        )
      );
    } catch (err: any) {
      try {
        const fallbackSummary = executeClientSideFallbackSearch(query);
        setMessages(prev =>
          prev.map(m =>
            m.id === botPlaceholderId
              ? {
                  ...m,
                  isSearching: false,
                  text: fallbackSummary.conciseSummary,
                  summaryData: fallbackSummary,
                  searchProgress: {
                    step: 'completed',
                    message: `Parsed ${fallbackSummary.sources.length} sources from indexed knowledge databases (offline mode)`
                  }
                }
              : m
          )
        );
      } catch {
        setMessages(prev =>
          prev.map(m =>
            m.id === botPlaceholderId
              ? {
                  ...m,
                  isSearching: false,
                  text: `I encountered an issue while scraping web results: ${err?.message || 'Network error'}. Please try again.`
                }
              : m
          )
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'LinkedIn':
        return <Linkedin className="w-3.5 h-3.5 text-sky-400" />;
      case 'Instagram':
        return <Instagram className="w-3.5 h-3.5 text-pink-400" />;
      case 'X (Twitter)':
        return <Twitter className="w-3.5 h-3.5 text-cyan-400" />;
      case 'GitHub':
        return <Github className="w-3.5 h-3.5 text-slate-200" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div id="chat-view-container" className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-hidden">
      {/* Top Quick Status Bar */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">Scraper Bot Engine</span>
          <span className="hidden sm:inline-block text-slate-500">•</span>
          <span className="hidden sm:inline-block text-slate-400">People & Web Scraper Ready</span>
        </div>

        <button
          id="open-websites-directory-btn"
          onClick={onOpenWebsitesDrawer}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 font-medium text-xs transition-colors"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Web Sources Directory</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div id="chat-messages-scroll" className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* User Message */}
            {msg.sender === 'user' ? (
              <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-xs bg-emerald-500 text-slate-950 font-medium px-4 py-2.5 shadow-md text-sm sm:text-base leading-relaxed">
                <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-900/70 font-semibold mb-0.5">
                  <User className="w-3 h-3" />
                  <span>You</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            ) : (
              /* Bot Message */
              <div className="w-full max-w-[96%] sm:max-w-[92%] flex flex-col items-start gap-1">
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium ml-1">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Bot className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-emerald-400 font-semibold">WebScout Bot</span>
                  <span className="text-slate-500 font-mono text-[10px]">{msg.timestamp}</span>
                </div>

                {/* Searching Progress Indicator */}
                {msg.isSearching ? (
                  <div className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 flex flex-col gap-3 shadow-lg animate-pulse">
                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                      <span>Web Scraping Engine Active</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-cyan-400" />
                          {msg.searchProgress?.message || 'Scraping web data...'}
                        </span>
                        <span className="font-mono text-[11px] text-emerald-400">Multi-source</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 w-3/4 animate-[pulse_1s_infinite] rounded-full" />
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Standard / Parsed Summary Bot Response */
                  <div className="w-full p-4 sm:p-5 rounded-2xl rounded-tl-xs bg-slate-900 border border-slate-800 text-slate-200 shadow-xl space-y-4">
                    
                    {/* Person Profile Special Header */}
                    {msg.summaryData?.isPersonSearch && msg.summaryData?.personProfile ? (
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-sky-950/60 to-slate-950/80 border border-sky-800/40 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-400 shrink-0">
                              <UserCheck className="w-5 h-5" />
                            </div>
                            <div>
                              <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider block">
                                Person Profile & Social Footprint
                              </span>
                              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                                {msg.summaryData.personProfile.name}
                              </h3>
                            </div>
                          </div>

                          <button
                            id={`copy-btn-${msg.id}`}
                            onClick={() => handleCopySummary(msg.text, msg.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Copy Summary"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        {/* Verified Social Profile Buttons */}
                        {msg.summaryData.personProfile.verifiedProfiles.length > 0 && (
                          <div className="space-y-1.5 pt-1 border-t border-slate-800/60">
                            <span className="text-[11px] text-slate-400 font-medium block">
                              Verified Social & Professional Directories:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {msg.summaryData.personProfile.verifiedProfiles.map((p, pIdx) => (
                                <a
                                  key={pIdx}
                                  href={p.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-sky-500/50 text-xs font-medium text-slate-200 transition-colors"
                                >
                                  {getPlatformIcon(p.platform)}
                                  <span>{p.platform}</span>
                                  <ExternalLink className="w-3 h-3 text-slate-400" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : msg.summaryData?.headline ? (
                      /* Topic / Entity Standard Headline */
                      <div className="pb-3 border-b border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block">
                              Synthesized Web Summary
                            </span>
                            <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                              {msg.summaryData.headline}
                            </h3>
                          </div>
                        </div>

                        <button
                          id={`copy-btn-${msg.id}`}
                          onClick={() => handleCopySummary(msg.text, msg.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                          title="Copy Summary"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ) : null}

                    {/* Concise Summary Paragraph */}
                    <div className="text-sm sm:text-base text-slate-200 leading-relaxed space-y-2">
                      <p>{msg.text}</p>
                    </div>

                    {/* Key Highlight Bullets */}
                    {msg.summaryData?.keyPoints && msg.summaryData.keyPoints.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                        <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Key Extracted Takeaways
                        </span>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                          {msg.summaryData.keyPoints.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                              <span className="leading-snug">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Fast Facts / Extracted Metrics */}
                    {msg.summaryData?.fastFacts && msg.summaryData.fastFacts.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.summaryData.fastFacts.map((fact, idx) => (
                          <div
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300"
                          >
                            <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                            <span>{fact}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Scraped Sources & Citations */}
                    {msg.summaryData?.sources && msg.summaryData.sources.length > 0 && (
                      <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                            <Globe className="w-3.5 h-3.5 text-cyan-400" />
                            Scraped Web Sources ({msg.summaryData.sources.length})
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Tap to inspect full extract
                          </span>
                        </div>

                        {/* Sources Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {msg.summaryData.sources.map((source) => (
                            <div
                              key={source.id}
                              onClick={() => onOpenSourceModal(source)}
                              className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between gap-1.5 text-left"
                            >
                              <div className="flex items-start justify-between gap-1.5">
                                <div className="flex items-center gap-1.5 overflow-hidden">
                                  <div className="w-4 h-4 rounded bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                    {source.domain.includes('linkedin') ? (
                                      <Linkedin className="w-2.5 h-2.5 text-sky-400" />
                                    ) : source.domain.includes('instagram') ? (
                                      <Instagram className="w-2.5 h-2.5 text-pink-400" />
                                    ) : (
                                      <Globe className="w-2.5 h-2.5" />
                                    )}
                                  </div>
                                  <span className="text-xs font-semibold text-emerald-400 truncate">
                                    {source.domain}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-emerald-400/90 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40 shrink-0">
                                  {source.relevanceScore}% match
                                </span>
                              </div>

                              <p className="text-xs text-white font-medium line-clamp-1 group-hover:text-emerald-300 transition-colors">
                                {source.title}
                              </p>

                              <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                                "{source.snippet}"
                              </p>

                              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500">
                                <span>{source.category}</span>
                                <span className="flex items-center gap-0.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                                  View Extract <ArrowUpRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Scraper Engine Execution Metrics */}
                    {msg.summaryData && (
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 font-mono border-t border-slate-800/60">
                        <div className="flex items-center gap-2">
                          <span>⚡ {msg.summaryData.scrapingDurationMs}ms</span>
                          <span>•</span>
                          <span>{msg.summaryData.totalSitesChecked}+ sites monitored</span>
                          <span>•</span>
                          <span>{msg.summaryData.totalSitesScraped} sources analyzed</span>
                        </div>
                        <div className="text-slate-400">
                          Intent: {msg.summaryData.queryIntent}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Suggested Queries on Initial / Idle State */}
        {messages.length <= 2 && !isLoading && (
          <div className="pt-3 pb-2 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Popular Web & Person Searches
              </span>
              <button
                onClick={onOpenWebsitesDrawer}
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <Layers className="w-3 h-3" /> Web Sources Directory
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800/80 hover:border-emerald-500/40 text-left text-xs text-slate-200 transition-all flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{q}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-slate-950 border border-slate-700/80 focus-within:border-emerald-500 rounded-2xl px-3 py-2 transition-all shadow-inner"
        >
          <div className="text-slate-400 pl-1">
            <Search className="w-4 h-4 text-emerald-400" />
          </div>

          <input
            id="chat-query-input"
            type="text"
            placeholder="Ask about a person (e.g. Satya Nadella), topic, or tech stack..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none px-2"
          />

          <button
            id="send-chat-btn"
            type="submit"
            disabled={!inputQuery.trim() || isLoading}
            className="w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-bold flex items-center justify-center transition-all cursor-pointer disabled:cursor-not-allowed shrink-0"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4 ml-0.5" />
            )}
          </button>
        </form>
        <div className="text-center text-[10px] text-slate-500 mt-1.5">
          WebScout crawls and parses 50+ websites + custom domains live into concise summaries.
        </div>
      </div>
    </div>
  );
};
