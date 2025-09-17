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
      <main className="flex-1 px-4 py-8 md:px-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
              Code <span className="text-primary">Showcase</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore a curated collection of code snippets. Add your own and get AI-powered insights.
            </p>
          </motion.div>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search snippets by title, description, or tag..."
                className="pl-10 w-full text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="flex flex-wrap h-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredSnippets.map((snippet, index) => (
                <CodeSnippetCard
                  key={snippet.id}
                  snippet={snippet}
                  onSelect={() => setSelectedSnippet(snippet)}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
          {filteredSnippets.length === 0 && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16 text-muted-foreground"
             >
              <p className="text-xl font-medium">No snippets found.</p>
              <p>Try a different search or category.</p>
            </motion.div>
          )}
        </div>
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
