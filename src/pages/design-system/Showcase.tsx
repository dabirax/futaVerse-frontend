import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Moon, Sun } from 'lucide-react'

// ─── Color Swatch Data ───

const lightColors = [
  { name: 'Primary', var: '--primary', hex: '#4A3F35', role: 'Warm charcoal — actions, headings' },
  { name: 'Primary Light', var: '--primary-light', hex: '#6B5C4E', role: 'Hover state' },
  { name: 'Secondary', var: '--secondary', hex: '#2D5A3D', role: 'Forest green — success' },
  { name: 'Secondary Light', var: '--secondary-light', hex: '#4A7D5A', role: 'Green hover' },
  { name: 'Accent', var: '--accent', hex: '#6B5C6E', role: 'Muted mauve — interactive' },
  { name: 'Accent Light', var: '--accent-light', hex: '#8B7C8E', role: 'Mauve hover' },
  { name: 'Gold', var: '--gold', hex: '#A07828', role: 'Achievement, highlights' },
  { name: 'Gold Light', var: '--gold-light', hex: '#C09848', role: 'Gold hover' },
  { name: 'Background', var: '--background', hex: '#FAF8F5', role: 'Page background' },
  { name: 'Foreground', var: '--foreground', hex: '#2B2420', role: 'Primary text' },
  { name: 'Card', var: '--card', hex: '#FFFFFF', role: 'Card background' },
  { name: 'Muted', var: '--muted', hex: '#E8E2D8', role: 'Subtle fills' },
  { name: 'Muted FG', var: '--muted-foreground', hex: '#8A7E74', role: 'Secondary text' },
  { name: 'Border', var: '--border', hex: '#DDD6CC', role: 'Borders, dividers' },
  { name: 'Destructive', var: '--destructive', hex: '#CC3333', role: 'Errors, warnings' },
  { name: 'Ring', var: '--ring', hex: '#6B5C6E', role: 'Focus rings' },
]

// ─── Typography Samples ───

const typeSamples = [
  {
    label: 'Display XL',
    spec: 'Crimson Pro 700 · clamp(2.5rem, 5vw, 3.75rem)',
    className:
      'font-display font-bold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.1] tracking-tight text-foreground',
    text: 'Where alumni shape careers that last',
  },
  {
    label: 'Display LG',
    spec: 'Crimson Pro 600 · 1.75rem',
    className: 'font-display font-semibold text-2xl leading-tight tracking-tight text-foreground',
    text: 'Mentorship Programs',
  },
  {
    label: 'Display MD',
    spec: 'Crimson Pro 600 · 1.3rem',
    className: 'font-display font-semibold text-[1.3rem] leading-snug text-foreground',
    text: 'Software Engineering Career Path',
  },
  {
    label: 'Body LG',
    spec: 'DM Sans 400 · 0.9rem',
    className: 'font-body text-[0.9rem] leading-relaxed text-muted-foreground',
    text: 'Connect with FUTA alumni working at top companies across Nigeria and beyond.',
  },
  {
    label: 'Body',
    spec: 'DM Sans 400 · 0.85rem',
    className: 'font-body text-sm text-muted-foreground',
    text: 'Build real relationships that accelerate your career.',
  },
  {
    label: 'Label',
    spec: 'DM Sans 600 · 0.78rem',
    className: 'font-body font-semibold text-[0.78rem] text-foreground',
    text: 'Full Name',
  },
  {
    label: 'Meta',
    spec: 'IBM Plex Mono 400 · 0.7rem',
    className: 'font-mono text-[0.7rem] text-muted-foreground',
    text: 'MAT/2021/0421 · 2h ago · Computer Science',
  },
  {
    label: 'Overline',
    spec: 'DM Sans 600 · 0.68rem · uppercase',
    className:
      'font-body font-semibold text-[0.68rem] uppercase tracking-[0.06em] text-secondary',
    text: 'Active Mentorship',
  },
]

// ─── Component ───

export default function Showcase() {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    setDark((prev) => !prev)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card px-10 py-3">
        <span className="font-display text-[1.35rem] font-bold text-primary tracking-tight">
          FUTAVerse
        </span>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-7 list-none">
            {['Feed', 'Mentorship', 'Internships', 'Events', 'Profile'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className={`text-[0.85rem] font-medium text-muted-foreground no-underline transition-colors hover:text-foreground ${
                    item === 'Feed'
                      ? 'text-foreground underline decoration-accent decoration-[1.5px] underline-offset-4'
                      : ''
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" onClick={toggleDark}>
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="px-10 py-16 text-center max-w-3xl mx-auto">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent font-medium mb-3">
          Design System
        </p>
        <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,3.75rem)] leading-[1.1] tracking-tight mb-4">
          Professional <span className="text-accent">Grounded</span>
        </h1>
        <p className="text-[1.05rem] text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
          Warm but structured. Career-focused but community-driven. The FUTAVerse design system
          token set.
        </p>
        <div className="flex justify-center gap-6 mt-10 pt-8 border-t border-border-light">
          {[
            { value: '2,400+', label: 'Students' },
            { value: '860', label: 'Alumni' },
            { value: '340', label: 'Mentorships' },
            { value: '95%', label: 'Completion' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-bold text-xl text-foreground tracking-tight">
                {stat.value}
              </div>
              <div className="text-[0.7rem] text-muted-foreground uppercase tracking-[0.06em] mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* ── Color Palette ── */}
      <section className="px-10 py-12 max-w-5xl mx-auto">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground mb-1">
          01 / Color Palette
        </p>
        <h2 className="font-display font-semibold text-[1.75rem] tracking-tight mb-8">
          Core Colors
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {lightColors.map((c) => (
            <div key={c.var} className="rounded-lg border border-border overflow-hidden bg-card">
              <div className="h-16" style={{ backgroundColor: `var(${c.var})` }} />
              <div className="p-2.5">
                <div className="font-semibold text-[0.8rem]">{c.name}</div>
                <div className="font-mono text-[0.68rem] text-muted-foreground mt-0.5">
                  {c.hex}
                </div>
                <div className="text-[0.68rem] text-muted-foreground mt-1">{c.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* ── Typography ── */}
      <section className="px-10 py-12 max-w-5xl mx-auto">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground mb-1">
          02 / Typography
        </p>
        <h2 className="font-display font-semibold text-[1.75rem] tracking-tight mb-8">
          Type Scale
        </h2>
        <div className="space-y-0">
          {typeSamples.map((t) => (
            <div
              key={t.label}
              className="grid grid-cols-[160px_1fr] items-baseline gap-5 py-[1.1rem] border-b border-border-light"
            >
              <div className="font-mono text-[0.65rem] text-muted-foreground">
                <span className="block text-muted-foreground font-medium text-[0.73rem] mb-0.5">
                  {t.label}
                </span>
                {t.spec}
              </div>
              <div className={t.className}>{t.text}</div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* ── Buttons ── */}
      <section className="px-10 py-12 max-w-5xl mx-auto">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground mb-1">
          03 / Components
        </p>
        <h2 className="font-display font-semibold text-[1.75rem] tracking-tight mb-8">
          Buttons
        </h2>
        <div className="flex flex-wrap gap-2.5 items-center mb-6">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-2.5 items-center mb-6">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>

        <Separator className="my-6" />

        <h3 className="font-display font-semibold text-lg mb-4">Badges</h3>
        <div className="flex flex-wrap gap-2.5 items-center">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="accent">Accent</Badge>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* ── Form Elements ── */}
      <section className="px-10 py-12 max-w-5xl mx-auto">
        <h2 className="font-display font-semibold text-[1.75rem] tracking-tight mb-8">
          Form Elements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-lg">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="Adebayo Ogundimu" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="matric">Matric Number</Label>
            <Input id="matric" placeholder="MAT/2021/0421" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dept">Department</Label>
            <Input id="dept" placeholder="Computer Science" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="search">Search</Label>
            <Input id="search" placeholder="Search mentorships, events..." />
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* ── Feed Cards ── */}
      <section className="px-10 py-12 max-w-5xl mx-auto">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground mb-1">
          04 / Feed
        </p>
        <h2 className="font-display font-semibold text-[1.75rem] tracking-tight mb-8">
          Content Cards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mentorship Card */}
          <Card className="rounded-[10px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="accent" className="rounded text-[0.62rem]">
                  Mentorship
                </Badge>
                <span className="font-mono text-[0.68rem] text-muted-foreground">2h ago</span>
              </div>
              <CardTitle className="font-display font-semibold text-[1.2rem] tracking-tight leading-snug">
                <span className="underline decoration-accent-light decoration-[1.5px] underline-offset-[3px] cursor-pointer transition-colors hover:decoration-accent">
                  Software Engineering Career Path
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-border-light">
                <Avatar className="size-8 rounded-md">
                  <AvatarFallback className="bg-primary text-primary-foreground text-[0.65rem] font-semibold rounded-md">
                    AO
                  </AvatarFallback>
                </Avatar>
                <div className="text-[0.8rem]">
                  <div className="font-semibold">Adebayo Ogundimu</div>
                  <div className="text-muted-foreground text-[0.73rem]">
                    Senior Engineer, Andela
                  </div>
                </div>
              </div>
              <p className="text-[0.875rem] text-muted-foreground leading-snug">
                12-week mentorship covering system design, technical interviews, and career growth.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Software Engineering', 'Career Growth', 'System Design'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.68rem] font-medium px-2 py-0.5 rounded-[3px] border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 py-2.5 border-t border-b border-border-light text-[0.78rem] text-muted-foreground">
                <span>12 weeks</span>
                <span>Remote</span>
                <span>
                  <strong className="text-foreground">8/12</strong> slots
                </span>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[0.75rem] text-muted-foreground">Capacity</span>
                  <span className="font-mono text-[0.7rem] text-accent">67%</span>
                </div>
                <Progress value={67} className="h-1" />
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-3">
              <div className="flex -space-x-1.5">
                {['TO', 'CN', 'FK'].map((initials, i) => (
                  <Avatar key={i} className="size-6 border-2 border-card rounded-md">
                    <AvatarFallback
                      className={`text-[0.5rem] font-semibold rounded-md ${
                        i === 0
                          ? 'bg-accent text-accent-foreground'
                          : i === 1
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button size="sm">Apply Now</Button>
            </CardFooter>
          </Card>

          {/* Internship Card */}
          <Card className="rounded-[10px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="rounded text-[0.62rem]">
                  Internship
                </Badge>
                <span className="font-mono text-[0.68rem] text-muted-foreground">5h ago</span>
              </div>
              <CardTitle className="font-display font-semibold text-[1.2rem] tracking-tight leading-snug">
                <span className="underline decoration-accent-light decoration-[1.5px] underline-offset-[3px] cursor-pointer transition-colors hover:decoration-accent">
                  Frontend Developer Intern
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-border-light">
                <Avatar className="size-8 rounded-md">
                  <AvatarFallback className="bg-secondary text-secondary-foreground text-[0.65rem] font-semibold rounded-md">
                    CO
                  </AvatarFallback>
                </Avatar>
                <div className="text-[0.8rem]">
                  <div className="font-semibold">Chidinma Okonkwo</div>
                  <div className="text-muted-foreground text-[0.73rem]">
                    Tech Lead, Paystack
                  </div>
                </div>
              </div>
              <p className="text-[0.875rem] text-muted-foreground leading-snug">
                3-month internship working on payment infrastructure. React, TypeScript, and Go.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Frontend', 'React', 'TypeScript'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.68rem] font-medium px-2 py-0.5 rounded-[3px] border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 py-2.5 border-t border-b border-border-light text-[0.78rem] text-muted-foreground">
                <span>Lagos, Nigeria</span>
                <span>Remote</span>
                <span>
                  <strong className="text-foreground">&#x20A6;150,000</strong>/mo
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-3">
              <span className="text-[0.8rem] text-muted-foreground">14 applicants</span>
              <Button size="sm" variant="secondary">
                Apply Now
              </Button>
            </CardFooter>
          </Card>

          {/* Event Card */}
          <Card className="rounded-[10px]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge className="rounded text-[0.62rem] bg-gold text-gold-light border-gold hover:bg-gold">
                  Event
                </Badge>
                <span className="font-mono text-[0.68rem] text-muted-foreground">1d ago</span>
              </div>
              <CardTitle className="font-display font-semibold text-[1.2rem] tracking-tight leading-snug">
                <span className="underline decoration-accent-light decoration-[1.5px] underline-offset-[3px] cursor-pointer transition-colors hover:decoration-accent">
                  Career Fair 2026
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-border-light">
                <Avatar className="size-8 rounded-md">
                  <AvatarFallback className="bg-gold text-foreground text-[0.65rem] font-semibold rounded-md">
                    FA
                  </AvatarFallback>
                </Avatar>
                <div className="text-[0.8rem]">
                  <div className="font-semibold">FUTA Alumni Network</div>
                  <div className="text-muted-foreground text-[0.73rem]">
                    Annual Career Event
                  </div>
                </div>
              </div>
              <p className="text-[0.875rem] text-muted-foreground leading-snug">
                Connect with 50+ top employers at FUTA's biggest career fair.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Career Fair', 'Networking', 'On-site'].map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.68rem] font-medium px-2 py-0.5 rounded-[3px] border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 py-2.5 border-t border-b border-border-light text-[0.78rem] text-muted-foreground">
                <span>March 15, 2026</span>
                <span>10:00 AM</span>
                <span>FUTA Sports Complex</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-3">
              <span className="font-mono text-[0.75rem] text-gold font-medium">Free Entry</span>
              <Button size="sm" className="bg-gold text-foreground hover:bg-gold-light">
                Register
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ── Footer ── */}
      <div className="text-center py-8 text-[0.75rem] text-muted-foreground font-mono">
        FUTAVerse Design System &middot; Direction D: Professional Grounded
      </div>
    </div>
  )
}
