import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Calendar, MapPin, Search, Video } from 'lucide-react'
import { format } from 'date-fns'
import type { FeedItemData } from '@/types/feed'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useFeed } from '@/hooks/useFeed'
import { useMe } from '@/hooks/useMe'
import InternshipFeedCard from '@/components/user/feed/InternshipFeedCard'
import MentorshipFeedCard from '@/components/user/feed/MentorshipFeedCard'
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

function getGreeting(): string {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning'
  if (h >= 12 && h < 17) return 'Good afternoon'
  if (h >= 17 && h < 22) return 'Good evening'
  return 'Good night'
}

const filters: Array<{ label: string; value: FeedFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Opportunities', value: 'opportunities' },
  { label: 'Mentorship', value: 'mentorship' },
  { label: 'Events', value: 'events' },
  { label: 'Posts', value: 'posts' },
]

const categoryLabels: Record<string, string> = {
  workshop: 'Workshop',
  seminar: 'Seminar',
  networking: 'Networking',
  career_fair: 'Career Fair',
  webinar: 'Webinar',
  conference: 'Conference',
}

// ----------- Inline Event Card -----------

function EventFeedCard({ item }: { item: FeedItemData }) {
  const router = useRouter()

  const formattedDate = item.date
    ? format(new Date(item.date), 'MMM d, yyyy')
    : ''

  return (
    <div
      className="group bg-surface rounded-md border border-line shadow-xs p-6 cursor-pointer transition-[box-shadow,border-color] duration-200 ease-out hover:shadow-sm hover:border-line-strong"
      onClick={() => router.navigate({ to: `/student/events/${item.sqid}` })}
    >
      {/* Category kicker */}
      <div className="mb-4">
        <span className="text-overline text-ink-faint">Event</span>
        <div className="mt-1.5 h-px bg-green w-12" />
      </div>

      {/* Title */}
      <h3 className="font-display text-[1.1875rem] text-ink leading-snug mb-1.5">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-ink-soft line-clamp-2 mb-3">
        {item.alumni ? `Hosted by ${item.alumni.full_name}` : 'A new event.'}
      </p>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-ink-faint mb-4">
        {item.category && (
          <span>{categoryLabels[item.category] || item.category}</span>
        )}
        {formattedDate && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
        )}
        {item.mode && (
          <span className="flex items-center gap-1">
            {item.mode === 'virtual' || item.mode === 'hybrid' ? (
              <Video className="h-3 w-3" />
            ) : (
              <MapPin className="h-3 w-3" />
            )}
            <span className="capitalize">{item.mode}</span>
          </span>
        )}
      </div>

      {/* Footer: poster identity + action */}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-green-soft text-green-on-soft text-[10px] font-semibold rounded-full">
              {item.alumni ? (
                item.alumni.full_name
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
            {item.alumni?.full_name || 'Unknown'}
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

const quickActions = [
  { label: 'Update Profile', path: '/student/settings' },
  { label: 'Find a Mentor', path: '/student/mentorships' },
  { label: 'Browse Events', path: '/student/events' },
  { label: 'View Tickets', path: '/student/tickets' },
]

function RightSidebar() {
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 gap-4">
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

      {/* Top Mentors */}
      <div className="bg-surface rounded-md border border-line shadow-xs p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-[1.1875rem] text-ink">
            Top Mentors
          </h3>
          <button className="text-[11px] font-semibold text-indigo hover:underline shrink-0 whitespace-nowrap">
            See all
          </button>
        </div>
        <div className="space-y-3">
          {[
            {
              id: 1,
              name: 'Dr. Jane Doe',
              role: 'Data Scientist',
              company: 'Google',
            },
            {
              id: 2,
              name: 'Prof. John Smith',
              role: 'AI Researcher',
              company: 'FUTA',
            },
          ].map((mentor) => (
            <div key={mentor.id} className="flex items-center gap-2.5">
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="bg-indigo-soft text-indigo-on-soft text-[10px] font-semibold rounded-full">
                  {mentor.name
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-ink leading-tight">
                  {mentor.name}
                </p>
                <p className="text-caption text-ink-soft truncate">
                  {mentor.role}
                </p>
                <p className="text-caption text-ink-faint truncate">
                  {mentor.company}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 h-7 text-xs px-3 rounded-xs"
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ----------- Main Page -----------

export default function StudentFeed() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<FeedFilter>('all')

  const { data: me } = useMe()
  const firstName = me?.role === 'student' ? me.profile.firstname : undefined

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

    if (activeTab === 'opportunities')
      items = items.filter((i) => i.event_type.includes('internship'))
    else if (activeTab === 'mentorship')
      items = items.filter((i) => i.event_type.includes('mentorship'))
    else if (activeTab === 'events')
      items = items.filter((i) => i.event_type.includes('event'))
    else if (activeTab === 'posts')
      items = items.filter((i) => POST_EVENT_TYPES.has(i.event_type))

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter((item) => {
        const title = item.data.title
        return title ? title.toLowerCase().includes(q) : false
      })
    }

    return items
  }, [feedItems, activeTab, search])

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start">
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
              onClick={() => setActiveTab(f.value)}
              className={`px-4 py-2 rounded-xs text-sm font-medium transition-colors duration-200 ${
                activeTab === f.value
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
              if (item.event_type.includes('internship')) {
                return <InternshipFeedCard key={item.sqid} item={item.data} />
              }
              if (item.event_type.includes('mentorship')) {
                return <MentorshipFeedCard key={item.sqid} item={item.data} />
              }
              return <EventFeedCard key={item.sqid} item={item.data} />
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

      <div className="hidden xl:block xl:w-80 xl:shrink-0 xl:sticky xl:top-6">
        <RightSidebar />
      </div>
    </div>
  )
}
