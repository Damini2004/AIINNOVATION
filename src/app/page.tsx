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

function Showcase() {
  const searchParams = useSearchParams();
  const [snippets, setSnippets] = useState<CodeSnippet[]>(initialSnippets);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet | null>(null);

  useEffect(() => {
    const snippetId = searchParams.get('snippet');
    if (snippetId) {
      const snippetFromUrl = snippets.find((s) => s.id === snippetId);
      if (snippetFromUrl) {
        setSelectedSnippet(snippetFromUrl);
      }
    }
  }, [searchParams, snippets]);

  const handleAddSnippet = (newSnippet: CodeSnippet) => {
    const newId = `snippet-${Date.now()}`;
    const snippetWithId = { ...newSnippet, id: newId };
    setSnippets((prev) => [snippetWithId, ...prev]);
  };

  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const categoryMatch = activeCategory === 'All' || snippet.tags.includes(activeCategory);
      const searchMatch =
        searchTerm === '' ||
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return categoryMatch && searchMatch;
    });
  }, [snippets, searchTerm, activeCategory]);

  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <Slider />
      <TechnologyArea />
      <WhoWeAre />
      <main className="flex-1 px-4 py-8 md:px-8 md:py-12">
        
      </main>
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
