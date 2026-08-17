# Frontend Feature Coverage Audit — futaVerse-frontend

Method: mapped all routes (`src/routes/*.tsx`), API service layer (`src/services/*`), data hooks (`src/hooks/*`), and pages/components against each feature. Evidence files cited inline. Roles note: the alumnus guard uses role string `'alumni'`.

## Auth & Onboarding

| Feature | Status | Evidence/Notes |
|---|---|---|
| Student signup + OTP | IMPLEMENTED | 3-step wizard → `api.post('/api/auth/signup/student')` (`src/pages/onboarding/Student/pages/03-StudentProfessional.tsx:140`); OTP verify `POST /api/auth/signup/verify-otp` (`src/pages/onboarding/SignUpOTP.tsx:59`). Caveat: profilePic/certificate files collected in steps 1–2 are dropped from payload; "Resend OTP" is a no-op. |
| Alumnus signup + OTP | IMPLEMENTED | `POST /api/auth/signup/alumnus` (`src/pages/onboarding/Alumnus/pages/03-AlumnusProfessional.tsx:167`); same OTP flow. Same file-drop caveat. |
| Login (JWT) + session | IMPLEMENTED | `POST /api/auth/login` (`src/pages/onboarding/Login.tsx:54`); session in `sessionStorage` mirrored via `AuthProvider` (`src/hooks/auth-context.tsx:16-26`); route guards read storage (`src/lib/guard.tsx`). |
| Silent token refresh | MISSING | No refresh logic/endpoint anywhere. 401 interceptor just clears storage + hard redirects to `/login` (`src/lib/api.tsx:21-30`). Only `access_token` stored, no `refresh_token`. |
| Forgot password (OTP→reset) | MISSING | Request step is `console.log` only (`src/pages/onboarding/ForgotPassword.tsx:36-38`); OTP verify is a hardcoded stub (`fetch('/api/auth/forgot-password/verify-otp', {email:'user@example.com'})` at `src/pages/onboarding/CheckEmail.tsx:39-46`); reset step is `console.log` only (`ResetPassword.tsx:50-52`). |
| Profile picture upload | MISSING | File picker stores File in zustand but never transmits it; no upload endpoint/FormData anywhere; Settings pages are empty stubs (`src/pages/user/*/Settings/index.tsx`). |
| Resume upload (student) | MISSING | No resume input/endpoint; only `require_resume` booleans in internship forms. |
| Connect Google (OAuth) | MISSING | Only a disabled "Google (coming soon)" button (`src/pages/onboarding/Login.tsx:281-289`); no oauth endpoints/services. Calendar routes exist but no integration behind them. |

## Internships — Alumnus

| Feature | Status | Evidence/Notes |
|---|---|---|
| Create / edit / toggle-active | PARTIAL | Create (`CreateInternship.tsx:141`), edit/delete (`EditInternship.tsx:142-164`) wired to service. **Toggle-active is local-only**: Switch at `InternshipDetail.tsx:253` flips `useState` with no mutation; `is_active` absent from both form schemas/payloads. |
| View own posted internships | IMPLEMENTED | `tabs/MyInternshipsTab.tsx:10` → `InternshipService.getAll` (relies on backend scoping; no dedicated "my" endpoint). |
| Review incoming applications | IMPLEMENTED | `tabs/ApplicationsTab.tsx:10` → `InternshipApplicationsService.getApplications`. |
| Accept / reject application | IMPLEMENTED | `tabs/ApplicationsTab.tsx:37-38` → `acceptApplication`/`rejectApplication` (`src/services/internships.ts:58-66`). |
| Send / withdraw direct offer | PARTIAL | Withdraw wired (`tabs/OffersTab.tsx:45`). **Send offer is dead UI**: "Create Offer" button has no `onClick` (`OffersTab.tsx:29-33`), "Share Offer" no `onClick` (`InternshipDetail.tsx:265-268`), and no `sendOffer` service method exists. |
| Mark engagement completed | MISSING | `InternsTab` is read-only; engagements service has only `getAll`/`getOne` (`src/services/internships.ts:75-84`); no complete endpoint/UI. |

## Internships — Student

| Feature | Status | Evidence/Notes |
|---|---|---|
| Browse / search / view listings | PARTIAL | No search/filter in the module; "My Internships" tab lists *engagements* (`tabs/MyInternshipsTab.tsx:6`), not open listings. Browse only via Feed (`Student/Feed/index.tsx:294-313`), and detail page loads the **engagement** endpoint (`InternshipDetail.tsx:43` → `getOne` on engagements) so public listings likely 404. |
| Apply to internship (resume + cover letter) | MISSING | No Apply button; `InternshipApplicationsService` has no create method (contrast mentorships). Student detail page instead shows a nonsensical local-only Active/Inactive toggle (`Student/Internship/InternshipDetail.tsx:46,245`). |
| Withdraw own application | IMPLEMENTED | `tabs/ApplicationsTab.tsx:35` → `withdrawApplication`. |
| View & respond to offers | IMPLEMENTED | `tabs/OffersTab.tsx:10,36,39` → get/accept/reject offers. |
| Acknowledge completed engagement | MISSING | No acknowledge UI/endpoint; engagement list is display-only. |

## Mentorships

| Feature | Status | Evidence/Notes |
|---|---|---|
| Alumnus create / edit / toggle | PARTIAL | Create/edit/delete wired (`create.tsx:101`, `edit.tsx:133,156`). **Create is unreachable**: buttons navigate to `/alumnus/mentorships/create` (`index.tsx:39`, `MyMentorshipsTab.tsx:15`) but route registered is `/alumnus/mentorship/create` (`src/routes/user-alumnus.tsx:90`). Toggle-active is cosmetic (local state only, `details.tsx:189`). |
| Alumnus manage applications & offers, mark completed | PARTIAL | Accept/reject applications + withdraw offer wired at tab level. **Detail-page tabs are mock/console.log** (`details.tsx:15-38`). **Mark completed MISSING** — no complete endpoint (`src/services/mentorship.ts:84-93`). |
| Student browse, apply (cover letter), withdraw | PARTIAL | Withdraw wired (`tabs/ApplicationsTab.tsx:45`). Apply page enforces cover letter and calls the API (`create.tsx:19-45`) but **route `/student/mentorships/$sqid/apply` is not registered** (`details.tsx:99`), and it reads wrong param `id` instead of `sqid` (`create.tsx:13`). No browse page — student tab lists engagements. |
| Student manage/accept/reject offers, acknowledge | PARTIAL | Offer accept/reject wired (`tabs/OffersTab.tsx:42-43`). **Acknowledge completion MISSING** — no service/UI. |
| Direct mentorship request (FLAG) | UNSURE | UI references a mentor-targets-student flow that can't work: "Send Offer" navigates to unregistered `/alumnus/mentorships/send-offer` (`OffersTab.tsx:28`); dead "Send Offer" button in `details.tsx:201-204`; `MentorshipOffersService` has no create method. Likely modeled backend-side but not exposed via API. |

## Events — Organizer

| Feature | Status | Evidence/Notes |
|---|---|---|
| Create event (physical/virtual/hybrid) | IMPLEMENTED | Mode select + conditional platform/venue (`CreateEvent.tsx:415-489`) → `POST /api/events/` (`src/services/events.ts:96-109`). |
| Virtual meeting link handling | PARTIAL | Platform enum is only `meet|zoom|teams` (`src/types/event.ts:20`) — **no Jitsi**, no `join_url` input (auto-generated per backend). Link displayed read-only with "Open" button (`Alumnus/Events/EventDetails.tsx:145-181`). |
| Edit event details | IMPLEMENTED | `EditEvent.tsx:197-274` → `PATCH /api/events/update/:id`. |
| Change event mode | IMPLEMENTED | `EditEvent.tsx:236-243` → `PATCH /api/events/update/:id/mode` (mode+venue+platform). |
| Create ticket types | IMPLEMENTED | Free/paid, discount, quantity, sale windows in `TicketsSection.tsx:228-327`; create embeds in payload, edit adds via `POST /api/events/ticket`. Caveat: existing tickets can't be edited/deleted; quantity/active edits are local-only (`EventTicketsManager.tsx:90-91`). |
| View own created events | IMPLEMENTED | `Alumnus/Events/index.tsx` → `GET /api/events/list` with published/drafts/cancelled tabs + filters. Mock fallback on failure. |

## Events — Attendee

| Feature | Status | Evidence/Notes |
|---|---|---|
| Browse / view events | IMPLEMENTED | Via Feed (`Student/Feed/index.tsx:291-313`) → `GET /api/feed` (mock fallback). `/student/events` index is actually "My purchased tickets". Detail via `getOne`. |
| Purchase a ticket (free vs. Paystack) | PARTIAL | Full checkout dialog exists (`Student/Events/EventDetails.tsx:282-495`), but **no real Paystack**: fake card form ("TEST MODE", "Secured by Paystack (Mock)"), payment is a `setTimeout` simulation (`:403-417`). No `paystack`/`initialize`/`redirect_url` anywhere in src. `register` also throws "Ticket not found" for tickets not in `mockEvents` before hitting the API (`src/services/events.ts:187-193`). |
| View own purchased tickets | IMPLEMENTED | `Student/Tickets` + `Alumnus/Tickets` → `GET /api/events/tickets` (`src/services/events.ts:235-268`), mock-driven fallback. |

## Payments

| Feature | Status | Evidence/Notes |
|---|---|---|
| Connect payout bank account | PARTIAL | Full UI flow in `PaystackBankLink.tsx` (bank pick → account number → resolve → link), embedded when paid tickets present. **Both API calls are TODO stubs**: `// TODO: replace with real POST /api/payments/resolve` (`:53`) and `link-account` (`:76`). Linked account lives in component state only — never persisted or included in event payloads. |
| Bank lookup / account resolution | PARTIAL | Bank list is static `src/data/mockBanks.ts`; resolution returns hardcoded fake names after 600ms (`PaystackBankLink.tsx:56-64`). No real resolution, no BVN. Alumnus Settings (logical payout home) is an empty stub. |

## Feed

| Feature | Status | Evidence/Notes |
|---|---|---|
| Personalized ranked feed | PARTIAL | Renders internship/mentorship/event cards from `GET /api/feed` (`src/services/feed.ts:51`). **Not actually ranked**: `score` is typed (`src/types/feed.ts:63`) but never used to sort; no personalization params sent (only page/size); client-side filters only. Falls back to event-derived mocks when base URL missing or on any request failure. |

## Posts ("Share Engagement")

| Feature | Status | Evidence/Notes |
|---|---|---|
| Share "started" post | MISSING | No posts service/route/component. Only trace is the type union `'mentorship_started' | 'internship_started'` (`src/types/feed.ts:61`) with no UI. |
| Share "completed" post | MISSING | No `*_completed` post type and no share action anywhere. |
| View own posts | MISSING | No posts list page/route. |
| View another user's posts | MISSING | No user profile pages exist at all (Settings are stubs); cross-user viewing impossible. |

## Reviews

| Feature | Status | Evidence/Notes |
|---|---|---|
| Student rates alumnus (5-metric) | MISSING | No review service/hooks/types/UI. Reports tabs are "coming soon" stubs (`src/pages/user/*/tabs/ReportsTab.tsx`). |
| Alumnus rates student (5-metric) | MISSING | Same — nothing anywhere. |
| Edit review within window | MISSING | No review model/edit logic. |
| View reviews received by a user | MISSING | No profile/review pages. |
| View own received reviews | MISSING | No section on any user page. |

## Notifications

| Feature | Status | Evidence/Notes |
|---|---|---|
| In-app notification inbox | MISSING | No notification service/component; neither layout has a bell/inbox (`studentLayout.tsx:25-35`, `alumnusLayout.tsx:25-35`). |
| Real-time updates (SSE/polling) | MISSING | No `EventSource`/`WebSocket`/polling/`refetchInterval` anywhere. |
| Mark notification(s) as read | MISSING | No model/UI. (`use-toast.tsx` is form-feedback toasts, not an inbox.) |

---

## Summary

**Coverage: 15/48 IMPLEMENTED (~31%); ~21/48 (~44%) if PARTIAL counts half.** 20 features are completely MISSING; 1 UNSURE.

**Biggest gaps:**
1. **Reviews, Posts, and Notifications are entirely unimplemented** (12 of the 20 MISSING) — no services, hooks, types, routes, or components. There are no user profile pages, so cross-user posts/reviews are impossible.
2. **Engagement lifecycle completion is absent end-to-end** — no "mark completed" (alumnus) or "acknowledge completion" (student) on either internships or mentorships; both engagement services only expose `getAll`/`getOne`.
3. **Core broken/missing flows**: student can't apply to internships at all; mentorship apply is unreachable (unregistered route + wrong param); alumnus "send offer" buttons are dead UI; forgot-password and token refresh are stubs; profile-picture/resume/Google-connect don't exist.
4. **Payments are simulated** — no real Paystack checkout (setTimeout fake) and payout bank linking/account resolution are TODO-stubbed mocks.
5. **Alumnus engagement management is partly mock/console.log** — the per-listing InternshipDetail/Mentorship detail tabs use inline mock data with no service calls (only the aggregate tabs hit the API).

**UNSURE (needs human decision):**
- **Direct mentorship request**: UI references an unregistered `/alumnus/mentorships/send-offer` route and dead "Send Offer" buttons; `MentorshipOffersService` has no create method. Confirm whether the backend models this but doesn't expose it (then the UI is dead weight) or it should be exposed (then the frontend needs a service method + route).
- **Engagement-vs-listing id mismatch**: student detail pages for internships/mentorships call `engagements/{id}` (`/api/internships/engagements/{id}`, `/api/mentorships/engagements/{id}`) using listing sqids from the feed — likely 404s unless the backend accepts listing ids there.
- **Role string inconsistency**: login/guard use `'alumni'` while signup/zustand use `'alumnus'` — verify which the backend returns/expects.
- **Mock fallbacks masking failures**: `EventsService.list/getOne/myTickets` and `FeedService.list` silently return mock data on *any* fetch failure, so a down/broken backend would be invisible to QA.
