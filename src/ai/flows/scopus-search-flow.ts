'use server';
/**
 * @fileOverview A flow to search for journal metrics on Scopus.
 * 
 * - searchScopus - A function that searches Scopus for journal metrics.
 * - ScopusSearchInput - The input type for the searchScopus function.
 * - ScopusSearchOutput - The return type for the searchScopus function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { JournalMetrics } from '@/app/lib/definitions';

const ScopusSearchInputSchema = z.object({
  query: z.string().describe('The journal ISSN or title to search for.'),
});
export type ScopusSearchInput = z.infer<typeof ScopusSearchInputSchema>;

export type ScopusSearchOutput = JournalMetrics | null;

async function fetchFromScopus(query: string, view: 'enhanced' | 'standard'): Promise<Response> {
    const apiKey = process.env.SCOPUS_API_KEY;
    if (!apiKey) {
      throw new Error('SCOPUS_API_KEY is not set. Please add it to your .env file.');
    }
    
    let url = `https://api.elsevier.com/content/serial/title?query=${encodeURIComponent(query)}`;
    if (view === 'enhanced') {
        url += `&view=enhanced`;
    }

    return await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-ELS-APIKey': apiKey,
      },
    });
}


function processScopusResponse(result: any): ScopusSearchOutput {
    const entry = result['serial-metadata-response']?.entry?.[0];
    if (!entry) {
      return null;
    }

    return {
      title: entry['dc:title'] || 'N/A',
      citeScore: entry.citeScoreYearInfoList?.citeScoreCurrentMetric?.citeScore || 'N/A',
      sjr: entry.SJRList?.SJR?.[0]?.$ || 'N/A',
      snip: entry.SNIPList?.SNIP?.[0]?.$ || 'N/A',
      publisher: entry['dc:publisher'] || 'N/A',
      issn: entry['prism:issn'] || entry['prism:eIssn'] || 'N/A',
      subjectAreas: entry.subjectArea?.map((sa: any) => sa.$) || [],
      sourceType: entry['prism:aggregationType'] || 'N/A',
    };
}


export async function searchScopus(input: ScopusSearchInput): Promise<ScopusSearchOutput> {
  return scopusSearchFlow(input);
}

const scopusSearchFlow = ai.defineFlow(
  {
    name: 'scopusSearchFlow',
    inputSchema: ScopusSearchInputSchema,
    outputSchema: z.custom<ScopusSearchOutput>(),
  },
  async ({ query }) => {
    let response = await fetchFromScopus(query, 'enhanced');
    let errorBody = await response.json().catch(() => ({}));

    // If enhanced view fails due to authorization, fall back to standard view
    const serviceError = errorBody['service-error']?.status;
    if (serviceError?.statusCode === 'AUTHORIZATION_ERROR') {
        response = await fetchFromScopus(query, 'standard');
        errorBody = await response.json().catch(() => ({}));
    }

    if (!response.ok) {
      const status = errorBody['service-error']?.status;
      if (status?.statusCode === 'INVALID_INPUT' || status?.statusCode === 'NOT_FOUND') {
          return null;
      }
      const errorMessage = status?.statusText || `Scopus API request failed with status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return processScopusResponse(errorBody);
  }
);
