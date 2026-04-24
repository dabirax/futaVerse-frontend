import { useState, useMemo } from 'react'
import { useRouter } from '@tanstack/react-router'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  GraduationCap,
  ArrowRight,
} from 'lucide-react'
import { format } from 'date-fns'
import { FeedMentorship, FeedInternship, mockEventListItems } from './mockFeed'
import { EventListItem } from '@/types/event'
import InternshipFeedCard from '@/components/user/feed/InternshipFeedCard'
import { useInternships } from '@/hooks/useInternships'
import { useMentorships } from '@/hooks/useMentorships'

type FeedItemType = 'all' | 'mentorship' | 'internship' | 'event'

interface FeedItem {
  type: 'mentorship' | 'internship' | 'event'
  data: FeedMentorship | FeedInternship | EventListItem
  created_at: string
}

const categoryLabels: Record<string, string> = {
  workshop: 'Workshop',
  seminar: 'Seminar',
  networking: 'Networking',
  career_fair: 'Career Fair',
  webinar: 'Webinar',
  conference: 'Conference',
}

function MentorshipFeedCard({ item }: { item: FeedMentorship }) {
  const router = useRouter()
  const navigate = router.navigate

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border-l-4 border-l-primary"
      onClick={() => navigate({ to: `/alumnus/mentorship/${item.sqid}` })}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 rounded-lg shrink-0">
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-sm font-semibold">
              <GraduationCap className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-primary/10 text-primary border-0 text-xs">
                Mentorship
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.category}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {item.work_mode}
              </Badge>
            </div>

            <h3 className="font-semibold text-foreground line-clamp-1">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
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

          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  )
}

function EventFeedCard({ item }: { item: EventListItem }) {
  const router = useRouter()
  const navigate = router.navigate

  const formattedDate = format(new Date(item.date), 'MMM d, yyyy')
  const formattedTime = format(
    new Date(`2000-01-01T${item.start_time}`),
    'h:mm a',
  )

  const modeIcon =
    item.mode === 'virtual' ? (
      <Video className="h-3.5 w-3.5" />
    ) : item.mode === 'physical' ? (
      <MapPin className="h-3.5 w-3.5" />
    ) : (
      <>
        <Video className="h-3.5 w-3.5" />
        <MapPin className="h-3.5 w-3.5" />
      </>
    )

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border-l-4 border-l-accent"
      onClick={() => navigate({ to: `/alumnus/events/${item.sqid}` })}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 rounded-lg shrink-0">
            <AvatarFallback className="rounded-lg bg-accent/10 text-accent text-sm font-semibold">
              <Calendar className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className="bg-accent/10 text-accent border-0 text-xs">
                Event
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {categoryLabels[item.category] || item.category}
              </Badge>
              {!item.is_published && (
                <Badge
                  variant="outline"
                  className="text-xs text-muted-foreground"
                >
                  Draft
                </Badge>
              )}
              {item.is_cancelled && (
                <Badge variant="destructive" className="text-xs">
                  Cancelled
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-foreground line-clamp-1">
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {formattedTime}
              </span>
              <span className="flex items-center gap-1.5">
                {modeIcon}
                <span className="capitalize">{item.mode}</span>
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {item.max_capacity} capacity
              </span>
            </div>

            {item.starting_price && (
              <p className="text-xs font-medium text-accent pt-1">
                {parseFloat(item.starting_price) === 0
                  ? 'Free'
                  : `From ₦${parseFloat(item.starting_price).toLocaleString()}`}
              </p>
            )}
          </div>

          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function AlumnusFeed() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<FeedItemType>('all')

  const {
    data: internships,
    // isLoading: isLoadingInternships,
    // isError: isErrorInternships,
  } = useInternships()

  const {
    data: mentorships,
    // isLoading: isLoadingMentorships,
    // isError: isErrorMentorships,
  } = useMentorships()
  
const feedInternships = internships?.results ?? []
const feedMentorships = mentorships?.results ?? []

  const allItems: FeedItem[] = useMemo(() => {
    const items: FeedItem[] = [
      ...feedMentorships.map((m: FeedMentorship) => ({
        type: 'mentorship' as const,
        data: m,
        created_at: m.created_at,
      })),
      ...feedInternships.map((i: FeedInternship) => ({
        type: 'internship' as const,
        data: i,
        created_at: i.created_at,
      })),
      ...mockEventListItems
        .filter((e) => e.is_published && !e.is_cancelled)
        .map((e) => ({
          type: 'event' as const,
          data: e,
          created_at: e.created_at,
        })),
    ]
    return items.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
  }, [])

  const filteredItems = useMemo(() => {
    let items =
      activeTab === 'all'
        ? allItems
        : allItems.filter((i) => i.type === activeTab)

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter((item) => {
        const d = item.data
        return (
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q)
        )
      })
    }

    return items
  }, [allItems, activeTab, search])

  const counts = useMemo(
    () => ({
      all: allItems.length,
      mentorship: allItems.filter((i) => i.type === 'mentorship').length,
      internship: allItems.filter((i) => i.type === 'internship').length,
      event: allItems.filter((i) => i.type === 'event').length,
    }),
    [allItems],
  )

  return (
    <div className="space-y-6">
      <div className="md:flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feed</h1>

          <p className="text-muted-foreground ">
            Discover mentorships, internships, and events
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 w-72"
          />
        </div>
      </div>
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as FeedItemType)}
      >
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="mentorship">
            Mentorships ({counts.mentorship})
          </TabsTrigger>
          <TabsTrigger value="internship">
            Internships ({counts.internship})
          </TabsTrigger>
          <TabsTrigger value="event">Events ({counts.event})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {filteredItems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No results found</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item, idx) => {
                if (item.type === 'internship') {
                  return (
                    <InternshipFeedCard
                      key={`i-${idx}`}
                      item={item.data as FeedInternship}
                    />
                  )
                }
                if (item.type === 'mentorship') {
                  return (
                    <MentorshipFeedCard
                      key={`m-${idx}`}
                      item={item.data as FeedMentorship}
                    />
                  )
                }
                return (
                  <EventFeedCard
                    key={`e-${idx}`}
                    item={item.data as EventListItem}
                  />
                )
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
