# Launch Readiness Checklist

> Updated: 29 de abril de 2026

---

## TASK-081 — Disclaimer / Safety Surface Audit ✅

Manual audit completed. All 5 checkpoints pass:

| # | Checkpoint | Status | Evidence |
|---|-----------|--------|----------|
| 1 | DisclaimerBanner visible at start of **free-trial** consultation (`/consult/new`) | ✅ | `src/app/consult/new/page.tsx:112` |
| 2 | DisclaimerBanner visible at start of **signed-in** consultation (`/consult`) | ✅ | `src/app/(app)/consult/page.tsx:74` |
| 3 | DisclaimerBanner in footer of every **AnalysisCard** | ✅ | `src/components/chat/AnalysisCard.tsx:121` |
| 4 | `/legal/disclaimer` matches `DISCLAIMER_TEXT_LONG` constant | ✅ | `src/app/(marketing)/legal/disclaimer/page.tsx:16` |
| 5 | URGENTE classification bypasses paywall — "Urgencias 24/7 cerca" button always shown | ✅ | `src/components/chat/AnalysisCard.tsx:47–112` |

**Signed off by:** Manu (founder)  
**Date:** 29/04/2026

---

## TASK-080 — Clinical Audit (PENDING — quality gate)

> **Required:** ≥85% appropriate triage across 50 production-style consultations.  
> **Who runs it:** Manu + Carlota Saguar (clinical advisor).

### Audit Log

| # | Species | Chief complaint | Expected triage | AI triage | Appropriate? | Notes |
|---|---------|----------------|-----------------|-----------|-------------|-------|
| 1 | | | | | | |
| 2 | | | | | | |
| ... | | | | | | |

*Fill in rows as consultations are run. Target: ≥43/50 appropriate.*

### Result
- **Total run:** 0/50
- **Appropriate:** —/50
- **Pass/Fail:** PENDING

---

## TASK-058 — Vet Onboarding (Carlota Saguar)

| Step | Status |
|------|--------|
| Carlota upgraded to vet role in Convex prod | ✅ Done 29/04/2026 |
| Test booking created end-to-end | ✅ Confirmed |
| Daily.co video room | ⚠️ Blocked — add payment method at dashboard.daily.co |
| Vet notes + mark completed flow | Pending (blocked by Daily.co billing) |
| Post-completion email received | Pending |

---

## TASK-082 — Domain + Production Deploy (PENDING)

Steps to complete:

1. [ ] Purchase `tranqui.app` (or chosen domain) — Cloudflare/Namecheap
2. [ ] Add custom domain in Vercel → Production → Domains
3. [ ] Update `NEXT_PUBLIC_APP_URL` env var in Vercel to `https://tranqui.app`
4. [ ] Verify Convex prod env vars are current (rotate if needed — keys were exposed 29/04/2026):
   - [ ] `ANTHROPIC_API_KEY` — rotate in Anthropic console
   - [ ] `CLERK_JWT_ISSUER_DOMAIN` — verify still correct
   - [ ] `DAILY_API_KEY` — rotate in Daily.co dashboard
   - [ ] `RESEND_API_KEY` — rotate in Resend dashboard
5. [ ] Add `NEXT_PUBLIC_SENTRY_DSN` env var in Vercel (create project at sentry.io first)
6. [ ] Smoke tests on production:
   - [ ] Sign up fresh user
   - [ ] Free trial consultation end-to-end
   - [ ] Pet create/edit/delete
   - [ ] Settings save
   - [ ] Booking creation flow (Daily.co video pending billing)
7. [ ] Clinical audit (TASK-080) — run 50 consultations, ≥85% appropriate triage
