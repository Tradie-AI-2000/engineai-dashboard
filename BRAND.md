---
name: brand
description: >
  Engine AI visual identity and brand system. Use this skill whenever building
  UI, pages, components, proposals, or any visual output for Engine AI. Covers
  colours, typography, spacing, component patterns, animation, tone of voice,
  and asset references. Source of truth extracted from the live website at
  engineai.co.nz.
---

# Engine AI Brand System

You are applying the Engine AI brand. This is a dark, premium, gold-accented identity
built for a New Zealand AI consultancy. Every UI decision should feel precise,
confident, and minimal. No corporate fluff. No generic SaaS aesthetic.

Reference site: engineai.co.nz

---

## Colour Palette

### Core

| Token | Hex | Usage |
|---|---|---|
| `background` | `#0A0A0A` | Page background, scrollbar track |
| `surface` | `#111111` | Elevated surfaces |
| `card-bg` | `rgba(12, 12, 12, 0.84)` | Card backgrounds (semi-transparent) |
| `gold` | `#C4A35A` | Primary accent, CTAs, highlights, section borders |
| `text-primary` | `#E8E6E1` | Body text (warm off-white) |
| `text-highlight` | `#F2EFE8` | Emphasis text |
| `text-secondary` | `#888888` | Labels, mono captions |
| `text-muted` | `#555555` | Minimal prominence |
| `white` | `#ffffff` | Headlines, hover states |

### Borders

| Token | Value |
|---|---|
| `border-default` | `rgba(255, 255, 255, 0.07)` |
| `border-subtle` | `rgba(255, 255, 255, 0.04)` |
| `border-gold` | `rgba(196, 163, 90, 0.24)` |

---

## Typography

### Font Stack

| Role | Family | Variable |
|---|---|---|
| Body / Headlines | Inter | `--font-sans` |
| Labels / Mono | JetBrains Mono | `--font-mono` |

### Rules

- Headlines use **light weight** for premium feel. Gold accent on the emphasis line uses semibold.
- Mono labels (`JetBrains Mono`) are always uppercase with wide tracking (0.34em).
- Body text uses generous line height (leading-7 / leading-8).
- Never use bold for headlines. Light + large is the pattern.

---

## Component Patterns

### Cards

**Standard card:**
```
rounded-[1.75rem] border border-white/[0.07] bg-[rgba(12,12,12,0.84)] p-6
shadow-[0_24px_80px_rgba(0,0,0,0.32)]
hover:-translate-y-1 hover:border-gold/20 duration-500
```

### Buttons

**Primary CTA:**
```
rounded-full border border-gold/30 bg-gold px-6 py-3
text-sm font-semibold tracking-[0.08em] text-black
hover:-translate-y-0.5 hover:brightness-110 duration-300
```

**Secondary/Ghost:**
```
rounded-full border border-white/[0.12] bg-white/[0.02] backdrop-blur-2xl px-6 py-3
font-mono text-[11px] uppercase tracking-[0.2em] text-white
hover:border-gold/25
```

---

## Atmosphere

### Page Background
```css
background: linear-gradient(145deg, #080808 0%, #0f0f0f 48%, #0a0a0a 100%);
```

### Ambient Grid
- White grid lines at `rgba(255,255,255,0.04)`, 96px spacing
- Masked with radial gradient (visible center, fades at edges)

### Blur Blobs
- Gold blob: `bg-gold/[0.10] blur-[140px]` (top-left)
- White blob: `bg-white/[0.04] blur-[160px]` (top-right)
