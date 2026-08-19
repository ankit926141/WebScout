import React from 'react';
import { ExternalLink, X, ShieldCheck, FileText, Globe, Clock, Sparkles } from 'lucide-react';
import { ScrapedSource } from '../types';

interface SourceModalProps {
  source: ScrapedSource | null;
  onClose: () => void;
}

export const SourceModal: React.FC<SourceModalProps> = ({ source, onClose }) => {
  if (!source) return null;

  return (
    <div 
      id="source-modal-backdrop"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div 
        id="source-modal-container"
        className="w-full max-w-lg bg-slate-900 text-slate-100 rounded-t-3xl sm:rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Scraped & Parsed Source
              </div>
              <h3 className="text-sm font-semibold text-white truncate max-w-[260px] sm:max-w-xs">
                {source.domain}
              </h3>
            </div>
          </div>
          <button
            id="close-source-modal-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-300">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Article Title
            </span>
            <h4 className="text-base font-medium text-white leading-snug">
              {source.title}
            </h4>
          </div>

          {/* Badges / Metrics */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Relevance: {source.relevanceScore}%
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300">
              <FileText className="w-3 h-3 text-cyan-400" />
              {source.category}
            </span>
            {source.wordCount && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300">
                {source.wordCount} words extracted
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/80 border border-slate-700 text-slate-400">
              <Clock className="w-3 h-3" />
              Scraped live
            </span>
          </div>

          {/* Extracted snippet */}
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Key Extracted Snippet
            </span>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 text-slate-200 leading-relaxed text-xs sm:text-sm">
              "{source.snippet}"
            </div>
          </div>

          {/* Full Parsed Text Content */}
          {source.fullExtract && source.fullExtract !== source.snippet && (
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Full Scraped Body Text
              </span>
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-300 leading-relaxed text-xs max-h-48 overflow-y-auto space-y-2">
                {source.fullExtract}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-400 truncate max-w-[200px] sm:max-w-xs">
            {source.url}
          </div>
          <a
            id="open-external-source-link"
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shrink-0"
          >
            Visit Source
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
