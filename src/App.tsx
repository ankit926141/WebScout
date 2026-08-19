import React, { useState } from 'react';
import { AndroidFrame } from './components/AndroidFrame';
import { ChatView } from './components/ChatView';
import { SourceModal } from './components/SourceModal';
import { WebsitesDrawer } from './components/WebsitesDrawer';
import { ScrapedSource } from './types';

export default function App() {
  const [selectedSource, setSelectedSource] = useState<ScrapedSource | null>(null);
  const [isWebsitesDrawerOpen, setIsWebsitesDrawerOpen] = useState(false);
  const [suggestedTopic, setSuggestedTopic] = useState<string | null>(null);
  const [chatResetKey, setChatResetKey] = useState<number>(0);

  const handleClearChat = () => {
    setChatResetKey(prev => prev + 1);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      <AndroidFrame
        onOpenWebsitesDrawer={() => setIsWebsitesDrawerOpen(true)}
        onClearChat={handleClearChat}
      >
        <ChatView
          key={chatResetKey}
          onOpenSourceModal={(source) => setSelectedSource(source)}
          onOpenWebsitesDrawer={() => setIsWebsitesDrawerOpen(true)}
          suggestedTopicQuery={suggestedTopic}
          onClearSuggestedTopic={() => setSuggestedTopic(null)}
        />
      </AndroidFrame>

      {/* Scraped Source Detail Inspector Modal */}
      <SourceModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />

      {/* 50+ Monitored Websites Directory Drawer */}
      <WebsitesDrawer
        isOpen={isWebsitesDrawerOpen}
        onClose={() => setIsWebsitesDrawerOpen(false)}
        onSelectTopic={(topic) => setSuggestedTopic(topic)}
      />
    </div>
  );
}
