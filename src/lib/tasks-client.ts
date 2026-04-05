import { createClient } from './supabase';

/**
 * getTenantTasks (Client Side)
 */
export async function getTenantTasks() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('task_ledger')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * getTaskAuditTrail (Client Side)
 */
export async function getTaskAuditTrail(taskId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('task_ledger')
    .select('*, parent:parent_task_id(*)')
    .eq('id', taskId)
    .single();

  if (error) throw error;
  return data;
}
