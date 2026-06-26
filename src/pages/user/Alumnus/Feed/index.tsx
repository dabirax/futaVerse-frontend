import { useState, useMemo } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Bookmark,
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  GraduationCap,
  MapPin,
  Search,
  Trophy,
  Users,
  Video,
  Zap,
} from 'lucide-react'
import { format } from 'date-fns'
import { FeedMentorship, FeedInternship, mockEventListItems } from './mockFeed'
import { EventListItem } from '@/types/event'
import { useInternships } from '@/hooks/useInternships'
import { useMentorships } from '@/hooks/useMentorships'

type FeedFilter = 'all' | 'opportunities' | 'mentorship' | 'events'

interface FeedItem {
  type: 'internship' | 'mentorship' | 'event'
  data: FeedInternship | FeedMentorship | EventListItem
  created_at: string
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  const hours = Math.floor(mins / 60)
  const days = Math.floor(hours / 24)
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

function getGreeting(): string {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning'
  if (h >= 12 && h < 17) return 'Good afternoon'
  if (h >= 17 && h < 22) return 'Good evening'
  return 'Good night'
}

// ----------- Card Components -----------

function InternshipCard({ item }: { item: FeedInternship }) {
  const router = useRouter()

  return (
    <div
      className="bg-card rounded-xl border shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.navigate({ to: `/alumnus/internships/${item.sqid}` })}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-green-100 text-green-700">
          New Internship
        </span>
        <span className="text-xs text-muted-foreground">{timeAgo(item.created_at)}</span>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <Briefcase className="h-5 w-5 text-primary-foreground" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-sm leading-tight">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{item.industry}</p>
            </div>
            <Bookmark className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            {item.work_mode} • {item.engagement_type}
            {item.is_paid && ` • Stipend: ₦${parseFloat(item.stipend).toLocaleString()} / month`}
          </p>

          {item.remaining_slots > 0 && (
            <p className="text-xs text-green-600 font-medium mt-1.5">
              {item.remaining_slots} of {item.available_slots} slots remaining
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function MentorshipCard({ item }: { item: FeedMentorship }) {
  const router = useRouter()

  return (
    <div
      className="bg-card rounded-xl border shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => router.navigate({ to: `/alumnus/mentorships/${item.sqid}` })}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-purple-100 text-purple-700">
          Mentorship
        </span>
        <span className="text-xs text-muted-foreground">{timeAgo(item.created_at)}</span>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center shrink-0">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground text-sm leading-tight">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
            </div>
            <Badge variant="secondary" className="text-xs shrink-0">{item.work_mode}</Badge>
          </div>

          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>

          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {item.duration_weeks} weeks
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {format(new Date(item.start_date), 'MMM d, yyyy')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {item.remaining_slots} of {item.available_slots} slots
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function EventCard({ item }: { item: EventListItem }) {
  const router = useRouter()
  const formattedDate = format(new Date(item.date), 'EEE, d MMM yyyy')
  const formattedTime = format(new Date(`2000-01-01T${item.start_time}`), 'h:mm a')

  return (
    <div className="bg-card rounded-xl border shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-blue-100 text-blue-700">
          Upcoming Event
        </span>
        <span className="text-xs text-muted-foreground">{timeAgo(item.created_at)}</span>
      </div>

      <div className="flex items-start gap-3">
        <div className="h-16 w-24 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
          <Calendar className="h-7 w-7 text-white opacity-80" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">{item.title}</h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{formattedDate} • {formattedTime}</span>
            </div>
            {item.mode === 'virtual' || item.mode === 'hybrid' ? (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Video className="h-3.5 w-3.5 shrink-0" />
                <span>Virtual</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>{item.venue || 'TBD'}</span>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="shrink-0 text-xs h-8"
          onClick={() => router.navigate({ to: `/alumnus/events/${item.sqid}` })}
        >
          View Details
        </Button>
      </div>
    </div>
  )
}

// ----------- Right Sidebar -----------

const mockAlumniSuggestions = [
  { id: 1, name: 'Oluseyi A.', role: 'Software Engineer', company: 'Moniepoint', gradYear: '2018', initials: 'OA' },
  { id: 2, name: 'Grace B.', role: 'Product Manager', company: 'Flutterwave', gradYear: '2017', initials: 'GB' },
  { id: 3, name: 'Kehinde P.', role: 'Data Scientist', company: 'PiggyVest', gradYear: '2019', initials: 'KP' },
]

const quickActions = [
  { label: 'Post an Update', icon: Zap },
  { label: 'Share an Achievement', icon: Trophy },
  { label: 'Create an Opportunity', icon: Briefcase },
  { label: 'Sponsor an Event', icon: Calendar },
]

function RightSidebar({ mentorships }: { mentorships: FeedMentorship[] }) {
  const availableMentors = mentorships.filter((m) => m.remaining_slots > 0).slice(0, 2)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
      {/* Alumni You Might Know */}
      <div className="bg-card rounded-xl border shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-foreground">Alumni You Might Know</h3>
          <button className="text-xs text-primary font-medium hover:underline">See all</button>
        </div>

        <div className="space-y-3">
          {mockAlumniSuggestions.map((alumni) => (
            <div key={alumni.id} className="flex items-center gap-2.5">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {alumni.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground leading-tight truncate">{alumni.name}</p>
                <p className="text-xs text-muted-foreground truncate">{alumni.role} at {alumni.company}</p>
                <p className="text-xs text-muted-foreground">FUTA • {alumni.gradYear}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 h-7 text-xs px-3">
                Connect
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Availability */}
      {availableMentors.length > 0 && (
        <div className="bg-card rounded-xl border shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-foreground">Mentor Availability</h3>
            <button className="text-xs text-primary font-medium hover:underline">See all</button>
          </div>

          <div className="space-y-3">
            {availableMentors.map((mentor) => (
              <div key={mentor.sqid} className="flex items-center gap-2.5">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-xs font-semibold">
                    {mentor.title.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground leading-tight truncate">{mentor.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{mentor.category}</p>
                  <p className={`text-xs font-medium ${mentor.remaining_slots > 1 ? 'text-green-600' : 'text-amber-600'}`}>
                    {mentor.remaining_slots} slot{mentor.remaining_slots !== 1 ? 's' : ''} available
                  </p>
                </div>
                <Button size="sm" className="shrink-0 h-7 text-xs px-3">
                  Book Slot
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-card rounded-xl border shadow-sm p-4">
        <h3 className="font-semibold text-sm text-foreground mb-2">Quick Actions</h3>
        <div className="space-y-0.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-muted transition-colors text-left"
            >
              <action.icon className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="flex-1 text-xs font-medium text-foreground">{action.label}</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Your Stats */}
      <div className="bg-card rounded-xl border shadow-sm p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">Your Stats</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-xs text-muted-foreground">Profile views</p>
            <p className="text-2xl font-bold text-foreground">248</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Connections</p>
            <p className="text-2xl font-bold text-foreground">356</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Opportunities posted</p>
          <p className="text-2xl font-bold text-foreground">12</p>
        </div>
      </div>
    </div>
  )
}

// ----------- Filter config -----------

const filters: { label: string; value: FeedFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Opportunities', value: 'opportunities' },
  { label: 'Mentorship', value: 'mentorship' },
  { label: 'Events', value: 'events' },
]

// ----------- Main Page -----------

export default function AlumnusFeed() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('all')

  const { data: internships } = useInternships()
  const { data: mentorships } = useMentorships()

  const feedInternships: FeedInternship[] = internships?.results ?? []
  const feedMentorships: FeedMentorship[] = mentorships?.results ?? []

  const allItems: FeedItem[] = useMemo(() => {
    const items: FeedItem[] = [
      ...feedInternships.map((i) => ({ type: 'internship' as const, data: i, created_at: i.created_at })),
      ...feedMentorships.map((m) => ({ type: 'mentorship' as const, data: m, created_at: m.created_at })),
      ...mockEventListItems
        .filter((e) => e.is_published && !e.is_cancelled)
        .map((e) => ({ type: 'event' as const, data: e, created_at: e.created_at })),
    ]
    return items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }, [feedInternships, feedMentorships])

  const filteredItems = useMemo(() => {
    let items = allItems

    if (activeFilter === 'opportunities') items = items.filter((i) => i.type === 'internship')
    else if (activeFilter === 'mentorship') items = items.filter((i) => i.type === 'mentorship')
    else if (activeFilter === 'events') items = items.filter((i) => i.type === 'event')

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter((item) => {
        const d = item.data as { title: string; description: string }
        return d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      })
    }

    return items
  }, [allItems, activeFilter, search])

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start">
      {/* Main Feed */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Greeting */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{getGreeting()} 👋</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Discover mentorships, internships, and events in your network.
            </p>
          </div>

          <div className="relative shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-64 h-9"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Feed Cards */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
              <p className="text-sm text-muted-foreground">No results found</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              if (item.type === 'internship') return <InternshipCard key={`i-${idx}`} item={item.data as FeedInternship} />
              if (item.type === 'mentorship') return <MentorshipCard key={`m-${idx}`} item={item.data as FeedMentorship} />
              if (item.type === 'event') return <EventCard key={`ev-${idx}`} item={item.data as EventListItem} />
              return null
            })
          )}
        </div>
      </div>

      {/* Right Sidebar — xl+ only */}
      <div className="hidden xl:block xl:w-72 xl:shrink-0 xl:sticky xl:top-6">
        <RightSidebar mentorships={feedMentorships} />
      </div>
    </div>
  )
}
