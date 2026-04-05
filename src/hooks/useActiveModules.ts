'use client'

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';

export interface ActiveModule {
  id: string;
  concept_title: string;
  concept_description: string;
  status: string;
  assessment: any;
  created_at: string;
}

/**
 * useActiveModules Hook
 * 
 * Fetches modules that have been hot-loaded from the Idea Forge.
 */
export function useActiveModules(interval: number = 10000) {
  const [modules, setModules] = useState<ActiveModule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchModules() {
      const supabase = createClient();
      try {
        const { data, error } = await supabase
          .from('incubated_ideas')
          .select('*')
          .eq('status', 'active')
          .order('updated_at', { ascending: false });

        if (error) throw error;
        if (isMounted) setModules(data as ActiveModule[]);
      } catch (err) {
        console.error("HOOK: Failed to sync active modules.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchModules();
    const timer = setInterval(fetchModules, interval);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [interval]);

  return { modules, loading };
}
