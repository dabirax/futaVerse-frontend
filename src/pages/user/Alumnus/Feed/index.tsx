import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Briefcase, Calendar, MapPin, Search, Users, Video } from 'lucide-react'
import { format } from 'date-fns'
import type { FeedItemData } from '@/types/feed'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFeed } from '@/hooks/useFeed'
import { useMe } from '@/hooks/useMe'
import { useMentorships } from '@/hooks/useMentorships'
import { FeedCardSkeleton } from '@/components/CardSkeletons'

type FeedFilter = 'all' | 'opportunities' | 'mentorship' | 'events' | 'posts'

const POST_EVENT_TYPES = new Set([
  'internship_started',
  'internship_completed',
  'mentorship_started',
  'mentorship_completed',
  'engagement_started',
  'engagement_completed',
])

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

function InternshipCard({
  item,
  sqid,
  created_at,
}: {
  item: FeedItemData
  sqid: string
  created_at: string
}) {
  const router = useRouter()

  return (
    <div
      className="group bg-surface rounded-md border border-line shadow-xs p-6 cursor-pointer transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-sm hover:border-line-strong"
      onClick={() => router.navigate({ to: `/alumnus/internships/${sqid}` })}
    >
      {/* Category kicker */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-overline text-ink-faint">Internship</span>
          <div className="mt-1.5 h-px bg-maroon w-12" />
        </div>
        <span className="text-meta text-ink-faint">{timeAgo(created_at)}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-[1.1875rem] text-ink leading-snug mb-1.5">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-ink-soft mb-3">
        {item.company || 'Unknown Company'}
      </p>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-ink-faint mb-4">
        <span>
          {item.work_mode || 'Flexible'} • {item.engagement_type || 'Role'}
        </span>
        {item.is_paid && item.stipend && (
          <span className="text-maroon">
            Stipend: ₦{parseFloat(item.stipend).toLocaleString()}/mo
          </span>
        )}
        {item.remaining_slots !== undefined && item.remaining_slots > 0 && (
          <span className="text-green">
            {item.remaining_slots} of {item.available_slots} slots open
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-maroon-soft text-maroon-on-soft text-[10px] font-semibold rounded-full">
              {item.alumni ? (
                item.alumni
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              ) : (
                <Briefcase className="h-3 w-3" />
              )}
            </AvatarFallback>
          </Avatar>
          <span className="text-caption text-ink-soft">
            {item.alumni || 'Unknown'}
          </span>
        </div>
        <span className="text-caption text-indigo font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View →
        </span>
      </div>
    </div>
  )
}

function MentorshipCard({
  item,
  sqid,
  created_at,
}: {
  item: FeedItemData
  sqid: string
  created_at: string
}) {
  const router = useRouter()

  return (
    <div
      className="group bg-surface rounded-md border border-line shadow-xs p-6 cursor-pointer transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-sm hover:border-line-strong"
      onClick={() => router.navigate({ to: `/alumnus/mentorships/${sqid}` })}
    >
      {/* Category kicker */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-overline text-ink-faint">Mentorship</span>
          <div className="mt-1.5 h-px bg-gold w-12" />
        </div>
        <span className="text-meta text-ink-faint">{timeAgo(created_at)}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-[1.1875rem] text-ink leading-snug mb-1.5">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-ink-soft line-clamp-2 mb-3">
        {item.alumni
          ? `Hosted by ${item.alumni}`
          : 'A new mentorship opportunity.'}
      </p>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-ink-faint mb-4">
        {item.category && <span>{item.category}</span>}
        {item.work_mode && <span>{item.work_mode}</span>}
        {item.start_date && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {format(new Date(item.start_date), 'MMM d, yyyy')}
          </span>
        )}
        {item.remaining_slots !== undefined && (
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {item.remaining_slots} slots available
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-gold-soft text-gold-on-soft text-[10px] font-semibold rounded-full">
              {item.alumni ? (
                item.alumni
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              ) : (
                <Users className="h-3 w-3" />
              )}
            </AvatarFallback>
          </Avatar>
          <span className="text-caption text-ink-soft">
            {item.alumni || 'Unknown'}
          </span>
        </div>
        <span className="text-caption text-indigo font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View →
        </span>
      </div>
    </div>
  )
}

function EventCard({
  item,
  sqid,
  created_at,
}: {
  item: FeedItemData
  sqid: string
  created_at: string
}) {
  const router = useRouter()
  const formattedDate = item.date
    ? format(new Date(item.date), 'EEE, d MMM yyyy')
    : ''

  return (
    <div
      className="group bg-surface rounded-md border border-line shadow-xs p-6 cursor-pointer transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-sm hover:border-line-strong"
      onClick={() => router.navigate({ to: `/alumnus/events/${sqid}` })}
    >
      {/* Category kicker */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-overline text-ink-faint">Event</span>
          <div className="mt-1.5 h-px bg-green w-12" />
        </div>
        <span className="text-meta text-ink-faint">{timeAgo(created_at)}</span>
      </div>

      {/* Title */}
      <h3 className="font-display text-[1.1875rem] text-ink leading-snug mb-1.5">
        {item.title}
      </h3>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-ink-faint mb-4">
        {formattedDate && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
        )}
        {item.mode === 'virtual' || item.mode === 'hybrid' ? (
          <span className="flex items-center gap-1">
            <Video className="h-3 w-3" />
            <span>Virtual</span>
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span className="capitalize">{item.mode || 'Physical'}</span>
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-green-soft text-green-on-soft text-[10px] font-semibold rounded-full">
              {item.alumni ? (
                item.alumni
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              ) : (
                <Calendar className="h-3 w-3" />
              )}
            </AvatarFallback>
          </Avatar>
          <span className="text-caption text-ink-soft">
            {item.alumni || 'Unknown'}
          </span>
        </div>
        <span className="text-caption text-indigo font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          View →
        </span>
      </div>
    </div>
  )
}

// ----------- Right Sidebar -----------

const mockAlumniSuggestions = [
  {
    id: 1,
    name: 'Oluseyi A.',
    role: 'Software Engineer',
    company: 'Moniepoint',
    gradYear: '2018',
    initials: 'OA',
  },
  {
    id: 2,
    name: 'Grace B.',
    role: 'Product Manager',
    company: 'Flutterwave',
    gradYear: '2017',
    initials: 'GB',
  },
  {
    id: 3,
    name: 'Kehinde P.',
    role: 'Data Scientist',
    company: 'PiggyVest',
    gradYear: '2019',
    initials: 'KP',
  },
]

const quickActions = [
  { label: 'Post an Update', path: '/alumnus/posts' },
  { label: 'Create an Opportunity', path: '/alumnus/internships/create' },
  { label: 'Host an Event', path: '/alumnus/events/create' },
  { label: 'Start a Mentorship', path: '/alumnus/mentorships/create' },
]

function RightSidebar() {
  const router = useRouter()
  const { data: mentorships } = useMentorships()
  const availableMentors = (mentorships?.results ?? [])
    .filter((m: any) => m.remaining_slots > 0)
    .slice(0, 2)

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Alumni You Might Know */}
      <div className="bg-surface rounded-md border border-line shadow-xs p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-[1.1875rem] text-ink">
            Alumni You Might Know
          </h3>
          <button className="text-[11px] font-semibold text-indigo hover:underline shrink-0 whitespace-nowrap">
            See all
          </button>
        </div>
        <div className="space-y-3">
          {mockAlumniSuggestions.map((alumni) => (
            <div key={alumni.id} className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-maroon-soft text-maroon-on-soft text-[10px] font-semibold rounded-full">
                  {alumni.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink leading-tight">
                  {alumni.name}
                </p>
                <p className="text-caption text-ink-soft truncate">
                  {alumni.role} at {alumni.company}
                </p>
                <p className="text-caption text-ink-faint">
                  FUTA • {alumni.gradYear}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 h-7 text-xs px-3 rounded-xs"
              >
                Connect
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Availability */}
      {availableMentors.length > 0 && (
        <div className="bg-surface rounded-md border border-line shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-[1.1875rem] text-ink">
              Mentor Availability
            </h3>
            <button className="text-[11px] font-semibold text-indigo hover:underline shrink-0 whitespace-nowrap">
              See all
            </button>
          </div>
          <div className="space-y-3">
            {availableMentors.map((mentor: any) => (
              <div key={mentor.sqid} className="flex items-center gap-2.5">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-gold-soft text-gold-on-soft text-[10px] font-semibold rounded-full">
                    {mentor.title.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ink leading-tight">
                    {mentor.title}
                  </p>
                  <p className="text-caption text-ink-soft truncate">
                    {mentor.category}
                  </p>
                  <p
                    className={`text-caption font-medium ${mentor.remaining_slots > 1 ? 'text-green' : 'text-gold'}`}
                  >
                    {mentor.remaining_slots} slot
                    {mentor.remaining_slots !== 1 ? 's' : ''} available
                  </p>
                </div>
                <Button
                  size="sm"
                  className="shrink-0 h-7 text-xs px-3 rounded-xs"
                >
                  Book Slot
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-surface rounded-md border border-line shadow-xs p-5">
        <h3 className="font-display text-[1.1875rem] text-ink mb-4">
          Quick Actions
        </h3>
        <div className="space-y-1">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => router.navigate({ to: action.path })}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xs hover:bg-surface-2 transition-colors duration-200 text-left"
            >
              <span className="text-sm font-medium text-ink">
                {action.label}
              </span>
              <span className="text-caption text-ink-faint">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Your Stats */}
      <div className="bg-surface rounded-md border border-line shadow-xs p-5">
        <h3 className="font-display text-[1.1875rem] text-ink mb-4">
          Your Stats
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-caption text-ink-soft">Profile views</p>
            <p className="font-mono text-2xl font-semibold text-ink tabular-nums">
              248
            </p>
          </div>
          <div>
            <p className="text-caption text-ink-soft">Connections</p>
            <p className="font-mono text-2xl font-semibold text-ink tabular-nums">
              356
            </p>
          </div>
        </div>
        <div>
          <p className="text-caption text-ink-soft">Opportunities posted</p>
          <p className="font-mono text-2xl font-semibold text-ink tabular-nums">
            12
          </p>
        </div>
      </div>
    </div>
  )
}

// ----------- Filter config -----------

const filters: Array<{ label: string; value: FeedFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Opportunities', value: 'opportunities' },
  { label: 'Mentorship', value: 'mentorship' },
  { label: 'Events', value: 'events' },
  { label: 'Posts', value: 'posts' },
]

// ----------- Main Page -----------

export default function AlumnusFeed() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('all')

  const { data: me } = useMe()
  const firstName = me?.role === 'alumni' ? me.profile.firstname : undefined

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useFeed()
  const feedItems = useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data],
  )

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasNextPage) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isFetchingNextPage) {
        fetchNextPage()
      }
    })

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const filteredItems = useMemo(() => {
    let items = feedItems

    if (activeFilter === 'opportunities')
      items = items.filter((i) => i.event_type.includes('internship'))
    else if (activeFilter === 'mentorship')
      items = items.filter((i) => i.event_type.includes('mentorship'))
    else if (activeFilter === 'events')
      items = items.filter((i) => i.event_type.includes('event'))
    else if (activeFilter === 'posts')
      items = items.filter((i) => POST_EVENT_TYPES.has(i.event_type))

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter((item) => {
        const d = item.data
        return d.title.toLowerCase().includes(q)
      })
    }

    return items
  }, [feedItems, activeFilter, search])

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start">
      {/* Main Feed */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-[1.875rem] text-ink leading-tight">
              {getGreeting()}, {firstName ?? 'there'}
            </h1>
            <p className="text-sm text-ink-soft mt-1">
              Recent from the FUTA network.
            </p>
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />
            <Input
              placeholder="Search opportunities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 rounded-xs text-sm font-medium transition-colors duration-200 ${
                activeFilter === f.value
                  ? 'bg-indigo text-white'
                  : 'bg-surface border border-line text-ink-soft hover:border-line-strong hover:text-ink'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Feed Cards */}
        <div className="space-y-3">
          {isLoading ? (
            <FeedCardSkeleton />
          ) : filteredItems.length === 0 ? (
            <div className="bg-surface rounded-md border border-line p-12 text-center">
              <p className="text-sm text-ink-soft">No results found</p>
            </div>
          ) : (
            filteredItems.map((item) => {
              if (item.event_type.includes('internship'))
                return (
                  <InternshipCard
                    key={item.sqid}
                    item={item.data}
                    sqid={item.sqid}
                    created_at={item.created_at}
                  />
                )
              if (item.event_type.includes('mentorship'))
                return (
                  <MentorshipCard
                    key={item.sqid}
                    item={item.data}
                    sqid={item.sqid}
                    created_at={item.created_at}
                  />
                )
              if (item.event_type.includes('event'))
                return (
                  <EventCard
                    key={item.sqid}
                    item={item.data}
                    sqid={item.sqid}
                    created_at={item.created_at}
                  />
                )
              return null
            })
          )}

          {hasNextPage && (
            <div
              ref={sentinelRef}
              className="py-4 text-center text-sm text-ink-faint"
            >
              {isFetchingNextPage ? 'Loading more…' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar — xl+ only */}
      <div className="hidden xl:block xl:w-80 xl:shrink-0 xl:sticky xl:top-6">
        <RightSidebar />
      </div>
    </div>
  )
}
