import HUD from "@/features/cockpit/HUD";
import { DIVISIONS, DivisionSlug } from "@/lib/data";
import { notFound } from "next/navigation";

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const division = DIVISIONS.find(d => d.slug === slug);
  
  if (!division) {
    notFound();
  }

  return <HUD activeDivision={slug as DivisionSlug} />;
}
