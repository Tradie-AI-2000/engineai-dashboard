import { createClient } from './supabase';
import { IntelligenceItem } from './hub-data';

/**
 * getIntelligenceRecords (Client Side)
 */
export async function getIntelligenceRecords() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('intelligence_records')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as IntelligenceItem[];
}
