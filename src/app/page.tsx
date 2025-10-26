
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { AppHeader } from '@/components/header';
import { initialSnippets, categories } from '@/lib/data';
import type { CodeSnippet } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeSnippetCard } from '@/components/code-snippet-card';
import { CodeSnippetView } from '@/components/code-snippet-view';
import { Search } from 'lucide-react';
import { Suspense } from 'react';
import Slider from '@/components/slider';
import TechnologyArea from '@/components/technology-area';
import WhoWeAre from '@/components/who-we-are';
import CollaborationPage from '@/components/collaboration';
import ProgramsPage from '@/components/programs';
import CounterSection from '@/components/counter-section';
import EventsSection from '@/components/events-section';
import ContactSection from '@/components/contact-section';
import QuickButtonArea from '@/components/quick-button-area';
import MembersPage from '@/components/members-page';

function Showcase() {
  const searchParams = useSearchParams();
  const [snippets, setSnippets] = useState<CodeSnippet[]>(initialSnippets);
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null);

  useEffect(() => {
    const snippetId = searchParams.get('snippet');
    if (snippetId) {
      const snippetFromUrl = snippets.find((s) => s.id === snippetId);
      if (snippetFromUrl) {
        setSelectedSnippet(snippetFromUrl);
      }
    } else {
      setSelectedSnippet(null);
    }
  }, [searchParams, snippets]);

  const handleAddSnippet = (newSnippet: CodeSnippet) => {
    const newId = `snippet-${Date.now()}`;
    const snippetWithId = { ...newSnippet, id: newId };
    setSnippets((prev) => [snippetWithId, ...prev]);
  };

  
  return (
    <div className="flex flex-col min-h-screen">
      <Slider />
      <TechnologyArea />
      <WhoWeAre />
      <CollaborationPage />
      <ProgramsPage />
      <CounterSection />
      <EventsSection />
      <QuickButtonArea />
      <ContactSection />
      <MembersPage />
      <CodeSnippetView
        snippet={selectedSnippet}
        open={!!selectedSnippet}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedSnippet(null);
            // Clear URL param
            window.history.pushState({}, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
}


export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Showcase />
    </Suspense>
  )
}
