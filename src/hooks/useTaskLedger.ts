'use client'

import { useState, useEffect } from 'react';
import { getTenantTasks } from '@/lib/tasks-client';
import { HandoffEnvelope } from '@/lib/schemas/handoff';

/**
 * useTaskLedger Hook
 * 
 * Provides real-time access to the tenant's task ledger.
 * Implements polling for high-fidelity audit updates.
 */
export function useTaskLedger(interval: number = 5000) {
  const [tasks, setTasks] = useState<HandoffEnvelope[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchTasks() {
      try {
        const data = await getTenantTasks();
        if (isMounted) {
          setTasks(data as unknown as HandoffEnvelope[]);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err as Error);
          setLoading(false);
        }
      }
    }

    fetchTasks();
    const timer = setInterval(fetchTasks, interval);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [interval]);

  return { tasks, loading, error };
}
