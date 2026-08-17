# FUTAVerse — Product Overview

## What It Is

FUTAVerse is an alumni-student networking and career development platform built for the **Federal University of Technology, Akure (FUTA)** community in Nigeria. The name blends "FUTA" (the university) with "Universe" — it's the complete digital ecosystem for FUTA's academic community.

Think of it as a purpose-built LinkedIn-meets-Mentorship platform: it connects current FUTA students with FUTA alumni for mentorship, internships, career events, and professional networking. It is not a generic career platform — it is tightly scoped to one university's verified alumni network.

## Who It's For

**Students** — Current FUTA students (100–600 level) looking for mentorship, internships, and career events. They sign up with their matriculation number, department, faculty, CGPA, skills, and expected graduation year.

**Alumni** — FUTA graduates who want to give back. They are the supply side of the platform: they create mentorship programs, post internships, host events, and send direct mentorship offers to students. They provide their graduation year, current job title, company, industry, and years of experience.

**Lecturers** — A planned role. The signup route exists but renders a placeholder. Not yet implemented.

**Admins** — Mentioned on the landing page as users who "approve mentors and manage users, monitor platform activity." No admin dashboard or UI exists yet.

## What Problem It Solves

Nigerian university students at FUTA face a gap between academic life and career readiness. Alumni who have graduated and built careers want to give back but lack structured channels. FUTAVerse bridges this by providing:

- A **verified, university-specific network** — you must be a FUTA student or alumnus to join, verified via matriculation number
- **Structured mentorship programs** with formal applications, offers, and engagement tracking
- **Internship and job opportunity pipelines** posted directly by alumni at real companies
- **Career events** (workshops, seminars, networking nights, career fairs) hosted by alumni, with ticketing and payment support via Paystack

## How It Works

1. **Sign up** with your FUTA matriculation number, verify via OTP, and complete a multi-step onboarding (basic info → school info → professional info). Form state is saved across steps so you don't lose progress.

2. **Land on a personalized feed** showing new mentorships, internships, and events from the community. Filter by type (All, Opportunities, Mentorship, Events, Posts) or search by title.

3. **Students browse and apply** to mentorships and internships, submit applications with optional cover letters and resumes, and register for events (free or paid via Paystack checkout).

4. **Alumni create and manage** mentorship programs, internship postings, and events. They review applications, send direct offers to students, and track engagements through completion.

5. **Both sides manage their profile** — basic info, school details, professional info, profile picture, and social links (LinkedIn, GitHub, X, etc.).

## What Users Can Do

### Students
- Browse and apply to mentorship programs
- Browse and apply to internships (with resume/cover letter)
- Register for events (free or paid tickets)
- View purchased tickets (upcoming and past)
- Track engagement history (active and completed mentorships/internships)
- View and share posts about engagement milestones
- Edit their full profile

### Alumni
- Create, edit, and manage mentorship programs (title, description, category, work mode, focus areas, duration, slots)
- Create, edit, and manage internship postings (company, engagement type, location, skills, stipend, level requirements)
- Create and manage events (workshop, seminar, networking, career fair, webinar, conference) with virtual/physical/hybrid support
- Manage event tickets (multiple tiers, pricing in Naira, sales windows, discounts)
- Review applications and send direct mentorship/internship offers to students
- Track active and completed engagements
- Link a Paystack bank account to receive payouts from paid events
- Edit their full profile

## What Makes Up the Product

- **Feed** — The home screen. A scrollable, filterable stream of new opportunities, mentorships, and events.
- **Mentorship** — The platform's centerpiece. Alumni create structured programs; students apply or receive offers. Full lifecycle from creation to completion.
- **Internships** — Job opportunity postings by alumni with detailed requirements, stipend info, and application tracking.
- **Events & Ticketing** — Career events with category support (workshops, seminars, fairs), virtual meeting integrations (Meet, Zoom, Teams), and Paystack-powered paid ticketing.
- **Posts** — Social sharing of engagement milestones (internship started/completed, mentorship started/completed).
- **Profile & Settings** — Full profile management for both roles, including social links and payment account linking.

## Current State

### Fully Built
- Landing page (hero, about, how-it-works, features, roles, CTA, footer)
- Multi-step signup for students and alumni with OTP verification
- Login, forgot/reset password flows
- Student and alumnus dashboards with sidebar navigation
- Feed with infinite scroll and filtering
- Mentorship CRUD, applications, offers, and engagements (full lifecycle)
- Internship CRUD, applications, offers, and engagements (full lifecycle)
- Event creation, editing, ticketing, and registration (full lifecycle)
- Posts system for sharing engagement milestones
- Settings and profile editing for both roles
- Paystack bank account linking for alumni
- Mock data fallback for demo mode (events, banks, tickets)

### Stubbed or Placeholder
- **Messages/Chat** — Route exists, page is a placeholder div. Advertised on landing page but not built.
- **Calendar** — Route exists, no meaningful implementation.
- **Analytics** — Route exists, no meaningful implementation.
- **Lecturer onboarding** — Route exists with a placeholder div.
- **Admin dashboard** — Mentioned on landing page, not built at all.
- **Resume management** — Service layer exists, UI says "coming soon" in alumnus settings.
- **Google OAuth** — Button exists but is disabled with "coming soon" text.
- **Job shadowing** — Advertised on landing page, not implemented.
- **Reports tab** in mentorship — Shows "No reports yet."

### Branding
- **Name**: FUTAVerse
- **Colors**: Purple-based (#5E0B80, #7b2fbe) with gradient accents
- **Font**: Montserrat
- **Tagline**: "Where alumni shape careers that last."
- **Currency**: Nigerian Naira (₦)
- **Payment**: Paystack (Nigerian payment gateway)
- **Domain**: futaverse.com
