'use client'

import { useMemo } from 'react';
import { MOCK_PROJECTS, DivisionSlug, Project } from '@/lib/data';

/**
 * useFilteredProjects Hook
 * 
 * Centralises the filtering logic for projects across the dashboard.
 * Supports 'global' view or division-specific filtering.
 */
export function useFilteredProjects(activeDivision: DivisionSlug = 'global'): Project[] {
  return useMemo(() => {
    if (activeDivision === 'global') {
      return MOCK_PROJECTS;
    }
    return MOCK_PROJECTS.filter(p => p.division === activeDivision);
  }, [activeDivision]);
}
