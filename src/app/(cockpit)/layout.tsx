import type { ReactNode } from 'react';
import { CockpitShell } from '@/components/CockpitShell';

export default function CockpitLayout({ children }: { children: ReactNode }) {
  return <CockpitShell>{children}</CockpitShell>;
}
