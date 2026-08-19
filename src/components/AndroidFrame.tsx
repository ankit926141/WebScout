import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Bot, Sparkles, Database, Trash2, Smartphone, Monitor } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  onOpenWebsitesDrawer: () => void;
  onClearChat: () => void;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  onOpenWebsitesDrawer,
  onClearChat
}) => {
  const [time, setTime] = useState<string>('10:45');
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center sm:p-4 md:p-6 select-none">
      {/* Top Floating Device Toggle */}
      <div className="w-full max-w-4xl flex items-center justify-between px-3 py-2 text-xs text-slate-400 mb-2 sm:flex">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-emerald-400 font-medium">Android OS 14 • Material You</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            id="toggle-device-frame-btn"
            onClick={() => setIsPhoneFrame(!isPhoneFrame)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
            title="Toggle Device Frame View"
          >
            {isPhoneFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Expanded View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Phone Frame View</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container / Android Device Box */}
      <div
        className={`w-full transition-all duration-300 bg-slate-900 border border-slate-800 shadow-2xl flex flex-col overflow-hidden ${
          isPhoneFrame
            ? 'max-w-[420px] h-[880px] rounded-[44px] ring-12 ring-slate-900/90 shadow-emerald-950/20'
            : 'max-w-4xl h-[92vh] sm:rounded-3xl'
        }`}
      >
        {/* Android Status Bar */}
        <div className="h-9 px-5 bg-slate-950 flex items-center justify-between text-xs text-slate-300 select-none border-b border-slate-900 shrink-0">
          <div className="font-semibold tracking-tight text-white flex items-center gap-2">
            <span>{time}</span>
            <div className="w-1 h-1 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-slate-400 hidden sm:inline font-mono">WebScout OS</span>
          </div>

          {/* Camera Notch for Phone Frame */}
          {isPhoneFrame && (
            <div className="w-4 h-4 rounded-full bg-slate-900 ring-2 ring-slate-800/80 mx-auto" />
          )}

          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-[11px] font-semibold text-emerald-400 font-mono">5G</span>
            <Signal className="w-3.5 h-3.5 text-slate-200" />
            <Wifi className="w-3.5 h-3.5 text-slate-200" />
            <div className="flex items-center gap-0.5">
              <span className="text-[11px] font-mono text-slate-300">94%</span>
              <Battery className="w-4 h-4 text-emerald-400 fill-emerald-400/30" />
            </div>
          </div>
        </div>

        {/* Android Material Top App Bar */}
        <div className="px-4 py-3 bg-slate-900/95 border-b border-slate-800/80 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-md shadow-emerald-900/40">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 ring-1 ring-emerald-400" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  WebScout Scraper Bot
                </h1>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  v2.4
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] text-emerald-400 font-medium">50+ Web Sources Connected</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              id="open-monitored-websites-btn"
              onClick={onOpenWebsitesDrawer}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors"
              title="View 50+ Monitored Scraped Websites"
            >
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">50+ Sites</span>
            </button>

            <button
              id="clear-chat-history-btn"
              onClick={onClearChat}
              className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 border border-slate-700 flex items-center justify-center transition-colors"
              title="Clear Chat Conversation"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content View / Chat Screen */}
        <div className="flex-1 flex flex-col min-h-0 bg-slate-950 relative overflow-hidden">
          {children}
        </div>

        {/* Android Gesture Bar */}
        <div className="h-6 bg-slate-950 flex items-center justify-center shrink-0 border-t border-slate-900">
          <div className="w-32 h-1 bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
  );
};
