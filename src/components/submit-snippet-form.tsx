'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { languages } from '@/lib/data';
import { generateDescriptionAction, submitSnippetAction } from '@/app/actions';
import type { CodeSnippet } from '@/lib/types';


const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  language: z.string({ required_error: 'Please select a language.' }),
  tags: z.string().min(2, { message: 'Please add at least one tag.' }),
  code: z.string().min(10, { message: 'Code must be at least 10 characters.' }),
});

type SubmitSnippetFormProps = {
  onSuccess: (snippet: Partial<CodeSnippet>) => void;
};

export function SubmitSnippetForm({ onSuccess }: SubmitSnippetFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      language: undefined,
      tags: '',
      code: '',
    },
  });

  const handleGenerateDescription = async () => {
    const code = form.getValues('code');
    const language = form.getValues('language');
    if (!code || !language) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please provide code and select a language before generating a description.',
      });
      return;
    }
    setIsGeneratingDesc(true);
    const result = await generateDescriptionAction(code, language);
    setIsGeneratingDesc(false);
    if (result.description) {
      form.setValue('description', result.description);
      toast({
        title: 'Success!',
        description: 'AI-powered description has been generated.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: result.error,
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await submitSnippetAction(values);
    setIsSubmitting(false);

    if (result.success && result.snippet) {
      toast({
        title: 'Snippet Submitted!',
        description: `"${values.title}" has been added to the showcase.`,
      });
      onSuccess(result.snippet);
      form.reset();
    } else {
      toast({
        variant: 'destructive',
        title: 'Submission Failed',
        description: result.error || 'An unknown error occurred.',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., React Custom Hook for Fetching Data" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="e.g., React, Hooks, JavaScript" {...field} />
              </FormControl>
              <FormDescription>Comma-separated tags for categorization.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste your code snippet here."
                  className="font-code h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <div className="relative">
                <FormControl>
                  <Textarea
                    placeholder="Describe what your code does."
                    className="pr-10"
                    {...field}
                  />
                </FormControl>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute top-1/2 right-1 -translate-y-1/2"
                  onClick={handleGenerateDescription}
                  disabled={isGeneratingDesc}
                  aria-label="Generate description"
                >
                  {isGeneratingDesc ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                </Button>
              </div>
              <FormDescription>You can write your own or generate one with AI.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Snippet
          </Button>
        </div>
      </form>
    </Form>
  );
}
