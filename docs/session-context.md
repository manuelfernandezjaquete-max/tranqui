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
| Monitoring | Sentry + Vercel Analytics |

---

## Repositorio

- **GitHub:** `https://github.com/manuelfernandezjaquete-max/tranqui`
- **Prod URL:** `https://tranqui-eight.vercel.app`
- **Convex deployment:** `admired-hummingbird-875` (prod) / `valiant-leopard-194` (dev)
- **Repo local:** `/Users/manuelfernandezjaquete/tranqui`

---

## Estado del roadmap (29 abril 2026)

**Todo el código en `main`. Phase 5 completada y mergeada.**

### ✅ Completadas

| Fase | Tasks | Estado |
|------|-------|--------|
| Fase 0 — Foundation & Setup | TASK-001→016 | ✅ Merged PR #1 |
| Fase 1 — Pet Profiles | TASK-017→025 | ✅ Merged PR #2 |
| Fase 2 — Core Consultation | TASK-026→042 | ✅ Merged PR #4+5 |
| Fase 3 — Vet Booking & Video | TASK-045→057 | ✅ Merged PR #6 |
| Fase 5 — Polish & Launch | TASK-071→079, 081, 083 | ✅ PR #7 merged |
| Feature — Consultation Photos | — | ✅ PR #9 merged |
| Feature — Logo Westie | — | ✅ En main |

### ✅ Phase 5 tasks completadas

- TASK-071 — Landing page ✅
- TASK-072 — Pricing + FAQ ✅
- TASK-073 — Legal pages (terms, privacy, disclaimer) ✅
- TASK-074 — Empty/loading/error states (Skeleton, ErrorState) ✅
- TASK-075 — Form validation (SettingsForm) ✅
- TASK-076 — Accessibility pass (skip link, aria-*, reduced-motion) ✅
- TASK-077 — Performance pass (next.config optimizations) ✅
- TASK-078 — Vercel Analytics + Sentry ✅
- TASK-079 — SEO (metadata, sitemap, robots, OG image) ✅
- TASK-081 — Disclaimer/safety surface audit ✅
- TASK-083 — Phase 5 PR merged ✅

### ⏭️ Pendientes / skipeadas

- TASK-058 — Vet onboarding: Carlota onboarded ✅, Daily.co billing ⚠️ pendiente
- TASK-080 — Clinical audit con Carlota (50 consultas, ≥85% triage) — manual, pendiente
- TASK-082 — Dominio — skipeado, usando tranqui-eight.vercel.app; deferred post App Store
- **Fase 4 completa (TASK-060→070)** — Polar/pagos skipeada para post-launch

### ⏭️ Post-launch (Fase 6)

- TASK-084 — Onboarding micro-flow
- TASK-085 — Household invitations
- TASK-086 — Pet photo upload (profile pics — la subida en consulta ya está hecha)
- TASK-087 — Admin/cost dashboard

### 🆕 Features añadidas fuera del roadmap

- **Fotos en consulta** — usuario adjunta foto en el chat → Claude analiza con visión. `messages.imageStorageId`, `generateUploadUrl`, ChatInput con 📎, MessageBubble renderiza imagen.
- **Logo Westie** — SVG minimalista con cara de Westie + wordmark "tranqui". Integrado en Wordmark, AppNav, favicon (`src/app/icon.svg`).

---

## Vercel env vars

```
NEXT_PUBLIC_CONVEX_URL          ✅
CONVEX_DEPLOYMENT               ✅
NEXT_PUBLIC_CONVEX_SITE_URL     ✅
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ✅
CLERK_SECRET_KEY                ✅
CLERK_JWT_ISSUER_DOMAIN         ✅
NEXT_PUBLIC_SENTRY_DSN          ✅ (añadido 29/04/2026)
NEXT_PUBLIC_APP_URL             ✅ https://tranqui-eight.vercel.app
```

## Convex env vars (prod: admired-hummingbird-875)

```
ANTHROPIC_API_KEY      ✅ seteada
CLERK_JWT_ISSUER_DOMAIN ✅ https://upward-orca-32.clerk.accounts.dev
DAILY_API_KEY          ✅ seteada
RESEND_API_KEY         ✅ seteada
```

⚠️ **Rotar estas keys** — se expusieron en chat el 29/04/2026.

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
│   ├── launch-readiness.md      ← checklist pre-launch + disclaimer audit
│   └── session-context.md       ← este archivo
├── convex/
│   ├── schema.ts                ← tablas: users, households, pets, consultations,
│   │                               messages (+ imageStorageId), veterinarians,
│   │                               availabilitySlots, bookings
│   ├── ai.ts                    ← continueConversation (Claude Sonnet streaming + vision)
│   ├── messages.ts              ← generateUploadUrl, appendUserMessage (+ imageStorageId)
│   ├── vets.ts                  ← upgradeToVet, listActive
│   ├── bookings.ts              ← create, cancel, markCompleted
│   └── lib/
│       ├── auth.ts              ← requireUser, requireHousehold
│       └── permissions.ts       ← requireAdmin, requireVet
├── public/
│   ├── logo.svg                 ← logo principal (círculo Westie + wordmark horizontal)
│   └── logo-westie.svg          ← versión anterior (deprecada)
├── src/
│   ├── app/
│   │   ├── icon.svg             ← favicon (círculo Westie cuadrado 200×200)
│   │   ├── opengraph-image.tsx  ← OG image edge-rendered
│   │   ├── sitemap.ts           ← sitemap.xml automático
│   │   ├── robots.ts            ← robots.txt
│   │   ├── (marketing)/         ← landing, pricing, faq, legal/*
│   │   ├── (app)/               ← pets, history, bookings, settings, consult
│   │   ├── (vet)/               ← dashboard, consultation/[bookingId]
│   │   └── consult/             ← [consultationId], new (free trial)
│   ├── components/
│   │   ├── ui/                  ← Button, Input, Textarea, Card, Badge
│   │   ├── chat/                ← TriageBadge, DisclaimerBanner, AnalysisCard,
│   │   │                           ChatInput (con 📎 foto), MessageBubble (renderiza imagen)
│   │   ├── marketing/           ← MarketingNav, Wordmark (usa logo.svg), HeroPreview, LegalPage
│   │   └── shared/              ← AppNav (usa logo.svg), ConvexClientProvider, UserBootstrap,
│   │                               Skeleton, ErrorState
│   └── lib/
│       ├── disclaimer.ts        ← DISCLAIMER_TEXT_SHORT, DISCLAIMER_TEXT_LONG
│       └── utils.ts             ← cn()
├── sentry.client.config.ts      ← Sentry frontend (PII-safe)
├── sentry.server.config.ts      ← Sentry server
├── sentry.edge.config.ts        ← Sentry edge
└── skills/
    └── agente-veterinario-ia.md ← clinical brain (embebido en system prompt)
```

---

## Decisiones tomadas (no re-preguntar)

- **Plataforma:** web app mobile-first → próximo paso: App Store (React Native / Expo o Capacitor)
- **Idioma UI:** español de España (es-ES)
- **Tono:** cálido pero clínico, tutea, lenguaje probabilístico, nunca diagnóstico
- **Paleta:** cream + sage + coral (tokens en globals.css)
- **Logo:** Westie minimalista sage + wordmark "tranqui" serif
- **URGENTE** rompe paywall siempre — es P0 de producto
- **Polar skipeado** para post-launch; pricing page muestra beta gratuita
- **Daily.co video** operativo pero bloqueado por billing (tarjeta pendiente)
- **Dominio** deferred post App Store; usando tranqui-eight.vercel.app

---

## Próximas tasks activas

1. **App Store** — decidir estrategia: Capacitor (wraps web app) vs Expo (React Native)
2. **TASK-080** — Clinical audit con Carlota (manual, 50 consultas)
3. **Daily.co billing** — añadir tarjeta en dashboard.daily.co
4. **Rotar API keys** — Anthropic, Daily, Resend (expuestas el 29/04/2026)
5. **TASK-082** — Dominio (post App Store)

**Prompt para retomar:**

> "Lee docs/session-context.md. El código está en main. Continúa desde las próximas tasks activas."
