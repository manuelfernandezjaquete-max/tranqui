# Tranqui — Contexto de sesión

> Último update: 29 de abril de 2026. Pega este archivo al inicio de cualquier sesión nueva para retomar sin perder contexto.

---

## Qué es Tranqui

App web mobile-first para dueños de perros y gatos. Asistente veterinario IA 24/7 con triage clínico estructurado en 3 niveles:

- **URGENTE** → acudir a urgencias ahora (rompe paywall siempre)
- **PREFERENTE** → cita en 24-48h
- **ORIENTATIVO** → observar en casa

Resuelve el 70-80% de dudas con IA (Claude Sonnet). Para el resto, deriva a veterinario aliado por videoconsulta el mismo día.

**Modelo:** suscripción €9,99/mes con 1 videoconsulta incluida + €25 por extra.

**Audiencia primaria:** Marta — primeriza ansiosa urbana 25-45.

---

## Stack

| Capa | Tech |
|------|------|
| Frontend | Next.js 15 (App Router, TypeScript, Tailwind v4) |
| Backend | Convex (DB + funciones serverless + realtime) |
| Auth | Clerk (esES locale) |
| LLM | Anthropic Claude Sonnet |
| Video | Daily.co |
| Email | Resend |
| Pagos | Polar (pendiente — Fase 4 skipeada) |
| Hosting | Vercel |

---

## Repositorio

- **GitHub:** `https://github.com/manuelfernandezjaquete-max/tranqui`
- **Prod URL:** `https://tranqui-eight.vercel.app`
- **Convex deployment:** `admired-hummingbird-875` (prod) / `valiant-leopard-194` (dev)
- **Repo local:** `/Users/manuelfernandezjaquete/tranqui`

---

## Estado del roadmap (29 abril 2026)

**59/88 tasks completas.**

### ✅ Completadas

| Fase | Tasks | Estado |
|------|-------|--------|
| Fase 0 — Foundation & Setup | TASK-001→016 | ✅ Merged PR #1 |
| Fase 1 — Pet Profiles | TASK-017→025 | ✅ Merged PR #2 |
| Fase 2 — Core Consultation | TASK-026→042 | ✅ Merged PR #4+5 |
| Fase 3 — Vet Booking & Video | TASK-045→057 | ✅ Merged PR #6 |
| Fase 5 — Landing | TASK-071, 072, 073 | ✅ PR #7 abierto (phase-5/landing) |

### ⬜ Pendientes en PR #7 (branch: `phase-5/landing`)

- TASK-074 — Polish empty/loading/error states
- TASK-075 — Form validation feedback
- TASK-076 — Accessibility pass
- TASK-077 — Performance pass
- TASK-078 — Vercel Analytics + Sentry
- TASK-079 — SEO basics
- TASK-080 — Final clinical audit
- TASK-081 — Final disclaimer/safety audit
- TASK-082 — Domain + production deploy
- TASK-083 — Push Phase 5 PR

### ⏭️ Skipeadas (decisión consciente)

- TASK-043 — Sample-prompt audit (hecho manualmente por Manu)
- TASK-044, 059 — PRs de cierre de fase 2 y 3 (pendientes)
- TASK-058 — Vet onboarding (parcialmente hecho, Daily.co billing pendiente)
- **Fase 4 completa (TASK-060→070)** — Polar/pagos skipeada para post-launch

### ⏭️ Post-launch (Fase 6)

- TASK-084 — Onboarding micro-flow
- TASK-085 — Household invitations
- TASK-086 — Pet photo upload
- TASK-087 — Admin/cost dashboard

---

## Vet onboarded: Carlota Saguar

- **Email:** carlotasaguar@gmail.com
- **Clerk ID:** `user_3CyRYnoMx35WRn4mOZFgaXlgyHa`
- **Convex users._id:** `j97aepky5jznhnvwrr0c1r9bxn85p7t9`
- **Convex veterinarians._id:** `k574pkj35y297pnchry8kxahs185q6zt`
- **Role:** `vet` en tabla `users`
- **Dashboard:** `https://tranqui-eight.vercel.app/dashboard`

**Pendiente:** Daily.co billing — añadir tarjeta en dashboard.daily.co para activar salas de video.

---

## Archivos clave

```
tranqui/
├── docs/
│   ├── product-roadmap.md       ← checkboxes de todas las tasks
│   ├── product-vision.md        ← estrategia, branding, design tokens (ES)
│   ├── prd.md                   ← spec técnica completa (EN)
│   └── session-context.md       ← este archivo
├── convex/
│   ├── schema.ts                ← tablas: users, households, pets, consultations,
│   │                               messages, veterinarians, availabilitySlots, bookings
│   ├── ai.ts                    ← continueConversation action (Claude Sonnet streaming)
│   ├── vets.ts                  ← upgradeToVet, listActive
│   ├── bookings.ts              ← create, cancel, markCompleted
│   └── lib/
│       ├── auth.ts              ← requireUser, requireHousehold
│       └── permissions.ts       ← requireAdmin, requireVet
├── src/
│   ├── app/
│   │   ├── (marketing)/         ← landing, pricing, faq, legal/*
│   │   ├── (app)/               ← pets, history, bookings, settings, consult
│   │   ├── (vet)/               ← dashboard, consultation/[bookingId]
│   │   └── consult/             ← [consultationId], new (free trial)
│   ├── components/
│   │   ├── ui/                  ← Button, Input, Textarea, Card, Badge
│   │   ├── chat/                ← TriageBadge, DisclaimerBanner, AnalysisCard
│   │   ├── marketing/           ← MarketingNav, Wordmark, HeroPreview, LegalPage
│   │   └── shared/              ← AppNav, ConvexClientProvider, UserBootstrap
│   └── lib/
│       ├── disclaimer.ts        ← DISCLAIMER_TEXT_SHORT, DISCLAIMER_TEXT_LONG
│       └── utils.ts             ← cn()
└── skills/
    └── agente-veterinario-ia.md ← clinical brain (embebido en system prompt)
```

---

## Convex env vars (prod: admired-hummingbird-875)

```
ANTHROPIC_API_KEY      ✅ seteada
CLERK_JWT_ISSUER_DOMAIN ✅ https://upward-orca-32.clerk.accounts.dev
DAILY_API_KEY          ✅ seteada
RESEND_API_KEY         ✅ seteada
```

⚠️ **Rotar estas keys** — se expusieron en chat el 29/04/2026.

---

## Decisiones tomadas (no re-preguntar)

- **Plataforma:** web app mobile-first, no nativa (PWA para móvil)
- **Idioma UI:** español de España (es-ES)
- **Tono:** cálido pero clínico, tutea, lenguaje probabilístico, nunca diagnóstico
- **Paleta:** cream + sage + coral (tokens en globals.css)
- **URGENTE** rompe paywall siempre — es P0 de producto
- **Polar skipeado** para post-launch; pricing page muestra beta gratuita
- **Daily.co video** operativo pero bloqueado por billing (tarjeta pendiente)
- **App Store** no en scope de MVP; testear por Safari PWA en iPhone

---

## Próximas tasks activas

Al retomar, continuar desde **TASK-074** en branch `phase-5/landing`:

```
TASK-074 — Polish empty/loading/error states
TASK-075 — Form validation
TASK-078 — Vercel Analytics + Sentry
TASK-082 — Dominio tranqui.app (o similar) en Cloudflare/Namecheap
```

**Prompt para retomar:**

> "Lee docs/session-context.md y docs/product-roadmap.md. Estoy en branch phase-5/landing. Continúa desde la primera task sin checkear en Fase 5."
