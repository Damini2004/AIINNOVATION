'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SubmitSnippetForm } from '@/components/submit-snippet-form';
import { Icons } from './icons';
import { Code2, Plus } from 'lucide-react';
import type { CodeSnippet } from '@/lib/types';

interface AppHeaderProps {
  onSnippetAdded: (snippet: CodeSnippet) => void;
}

export function AppHeader({ onSnippetAdded }: AppHeaderProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Icons.logo className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline ml-2">Code Showcase</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Snippet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Add a New Code Snippet</DialogTitle>
                <DialogDescription>
                  Fill out the form to add your code snippet to the showcase. You can also use AI to generate a description.
                </DialogDescription>
              </DialogHeader>
              <SubmitSnippetForm
                onSuccess={(newSnippet) => {
                  onSnippetAdded(newSnippet as CodeSnippet);
                  setIsDialogOpen(false);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
