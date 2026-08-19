import React, { useState, useEffect } from 'react';
import { X, Search, Globe, CheckCircle2, Layers, Plus, Trash2, UserCheck, Sparkles } from 'lucide-react';
import { WebsiteDirectoryItem } from '../types';

interface WebsitesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic?: (topic: string) => void;
}

const POPULAR_QUICK_DOMAINS = [
  { name: 'LinkedIn', domain: 'linkedin.com', category: 'Social & People' },
  { name: 'Instagram', domain: 'instagram.com', category: 'Social & People' },
  { name: 'X / Twitter', domain: 'x.com', category: 'Social & People' },
  { name: 'GitHub', domain: 'github.com', category: 'Social & People' },
  { name: 'Crunchbase', domain: 'crunchbase.com', category: 'Social & People' },
  { name: 'Substack', domain: 'substack.com', category: 'News & Media' },
  { name: 'Medium', domain: 'medium.com', category: 'Tech & Code' },
  { name: 'ArXiv', domain: 'arxiv.org', category: 'Science & Nature' }
];

export const WebsitesDrawer: React.FC<WebsitesDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTopic
}) => {
  const [websites, setWebsites] = useState<WebsiteDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customDomainInput, setCustomDomainInput] = useState('');
  const [isSubmittingDomain, setIsSubmittingDomain] = useState(false);
  const [addFeedback, setAddFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchWebsites = () => {
    fetch('/api/websites')
      .then(res => res.json())
      .then(data => {
        if (data && data.websites) {
          setWebsites(data.websites);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isOpen) {
      fetchWebsites();
    }
  }, [isOpen]);

  const handleAddCustomDomain = async (domainToAdd?: string) => {
    const raw = (domainToAdd || customDomainInput).trim();
    if (!raw) return;

    setIsSubmittingDomain(true);
    setAddFeedback(null);

    try {
      // Support comma or whitespace separated domains
      const domainsList = raw.split(/[\s,]+/).filter(d => d.trim().length > 0);

      const res = await fetch('/api/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(domainsList.length > 1 ? { domains: domainsList } : { domain: domainsList[0] })
      });

      const data = await res.json();
      if (res.ok) {
        setAddFeedback({
          type: 'success',
          message: data.message || `Added ${raw} to active scraping index!`
        });
        setCustomDomainInput('');
        fetchWebsites();
      } else {
        setAddFeedback({
          type: 'error',
          message: data.error || 'Failed to add domain.'
        });
      }
    } catch (err: any) {
      setAddFeedback({
        type: 'error',
        message: err?.message || 'Network error while adding domain.'
      });
    } finally {
      setIsSubmittingDomain(false);
    }
  };

  const handleDeleteDomain = async (idOrDomain: string) => {
    try {
      const res = await fetch(`/api/websites/${encodeURIComponent(idOrDomain)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setWebsites(prev => prev.filter(w => w.id !== idOrDomain && w.domain !== idOrDomain));
        setAddFeedback({
          type: 'success',
          message: `Removed source from scraping index.`
        });
      }
    } catch {}
  };

  if (!isOpen) return null;

  const categories = [
    'All',
    'Social & People',
    'Custom Added',
    'Tech & Code',
    'Science & Nature',
    'News & Media',
    'Reference & Knowledge',
    'Health & Medicine',
    'Finance & Economy'
  ];

  const filtered = websites.filter(w => {
    const matchesCategory = selectedCategory === 'All' || w.category === selectedCategory || (selectedCategory === 'Custom Added' && w.isCustom);
    const matchesSearch = searchFilter === '' ||
      w.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      w.domain.toLowerCase().includes(searchFilter.toLowerCase()) ||
      w.topics.some(t => t.toLowerCase().includes(searchFilter.toLowerCase())) ||
      w.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      id="websites-drawer-backdrop"
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="websites-drawer-panel"
        className="w-full max-w-md h-full bg-slate-900 text-slate-100 shadow-2xl border-l border-slate-800 flex flex-col animate-in slide-in-from-right duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                Scraper Web Directory
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                  {websites.length} sources
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Add unlimited domains & search people or topics
              </p>
            </div>
          </div>
          <button
            id="close-websites-drawer-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Add Custom Source Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 space-y-3">
          <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            Add Custom Web Source (Domain Name)
          </label>
          <div className="flex gap-2">
            <input
              id="add-custom-domain-input"
              type="text"
              placeholder="e.g. linkedin.com, instagram.com, substack.com"
              value={customDomainInput}
              onChange={e => setCustomDomainInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddCustomDomain()}
              className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              id="submit-custom-domain-btn"
              onClick={() => handleAddCustomDomain()}
              disabled={isSubmittingDomain || !customDomainInput.trim()}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 text-xs font-semibold rounded-xl flex items-center gap-1 transition-colors shrink-0"
            >
              {isSubmittingDomain ? (
                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </>
              )}
            </button>
          </div>

          {/* Feedback Message */}
          {addFeedback && (
            <div
              className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${
                addFeedback.type === 'success'
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/40'
                  : 'bg-rose-950/60 text-rose-300 border border-rose-800/40'
              }`}
            >
              {addFeedback.type === 'success' ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> : <X className="w-3.5 h-3.5 shrink-0" />}
              <span>{addFeedback.message}</span>
            </div>
          )}

          {/* Quick Add Suggestions */}
          <div>
            <div className="text-[11px] text-slate-400 mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Quick Add People & Social Sources:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_QUICK_DOMAINS.map(item => {
                const isAlreadyAdded = websites.some(w => w.domain.toLowerCase() === item.domain.toLowerCase());
                return (
                  <button
                    key={item.domain}
                    onClick={() => !isAlreadyAdded && handleAddCustomDomain(item.domain)}
                    disabled={isAlreadyAdded}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                      isAlreadyAdded
                        ? 'bg-slate-800/60 border-slate-700/50 text-slate-400 opacity-70 cursor-default'
                        : 'bg-slate-800 border-slate-700 hover:border-emerald-500 hover:text-emerald-300 text-slate-200 cursor-pointer'
                    }`}
                  >
                    {isAlreadyAdded ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Plus className="w-3 h-3" />}
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="directory-search-input"
              type="text"
              placeholder="Search across all sources or topics..."
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs bg-slate-950 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-sm gap-2">
              <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              Loading web directory...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No matching websites found for "{searchFilter}".
            </div>
          ) : (
            filtered.map(site => (
              <div
                key={site.id}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col gap-2 relative group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      site.category === 'Social & People'
                        ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {site.category === 'Social & People' ? (
                        <UserCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Globe className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-tight flex items-center gap-1.5">
                        {site.name}
                        {site.isCustom && (
                          <span className="px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-[10px] rounded font-normal">
                            Custom
                          </span>
                        )}
                      </h4>
                      <span className="text-xs text-emerald-400 font-mono">
                        {site.domain}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {site.isCustom ? (
                      <button
                        onClick={() => handleDeleteDomain(site.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/30 transition-colors"
                        title="Remove custom source"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-800/40">
                        <CheckCircle2 className="w-3 h-3" />
                        Scraped
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {site.description}
                </p>

                {/* Topics / Keywords */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {site.topics.slice(0, 5).map(topic => (
                    <button
                      key={topic}
                      onClick={() => {
                        if (onSelectTopic) {
                          onSelectTopic(topic);
                          onClose();
                        }
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 text-[11px] text-slate-400 transition-colors"
                    >
                      #{topic}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/90 text-center text-xs text-slate-400">
          All registered sources are actively parsed and summarized on every chat query.
        </div>
      </div>
    </div>
  );
};
