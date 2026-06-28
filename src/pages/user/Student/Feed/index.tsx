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
  MapPin,
  Users,
  Video,
  GraduationCap,
  ArrowRight,
} from 'lucide-react'
import { format } from 'date-fns'
import { useFeed } from '@/hooks/useFeed'
import { FeedItemData } from '@/types/feed'

type FeedFilter = 'all' | 'opportunities' | 'mentorship' | 'events'

const categoryLabels: Record<string, string> = {
  workshop: 'Workshop',
  seminar: 'Seminar',
  networking: 'Networking',
  career_fair: 'Career Fair',
  webinar: 'Webinar',
  conference: 'Conference',
}

function MentorshipFeedCard({ item, sqid }: { item: FeedItemData; sqid: string }) {
  const router = useRouter()
  const navigate = router.navigate

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border-l-4 border-l-primary"
      onClick={() => navigate({ to: `/student/mentorship/${sqid}` })}
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
              {item.category && (
                <Badge variant="outline" className="text-xs">
                  {item.category}
                </Badge>
              )}
              {item.work_mode && (
                <Badge variant="secondary" className="text-xs">
                  {item.work_mode}
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-foreground line-clamp-1">
              {item.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.alumni ? `Hosted by ${item.alumni}` : 'A new mentorship opportunity'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              {item.start_date && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {format(new Date(item.start_date), 'MMM d, yyyy')}
                </span>
              )}
              {item.remaining_slots !== undefined && (
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {item.remaining_slots} of {item.available_slots} slots
                </span>
              )}
            </div>
          </div>

          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  )
}

function EventFeedCard({ item, sqid }: { item: FeedItemData; sqid: string }) {
  const router = useRouter()
  const navigate = router.navigate

  const formattedDate = item.date ? format(new Date(item.date), 'MMM d, yyyy') : ''

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.01] border-l-4 border-l-accent"
      onClick={() => navigate({ to: `/student/events/${sqid}` })}
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
              {item.category && (
                <Badge variant="secondary" className="text-xs">
                  {categoryLabels[item.category] || item.category}
                </Badge>
              )}
            </div>

            <h3 className="font-semibold text-foreground line-clamp-1">
              {item.title}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.alumni ? `Hosted by ${item.alumni}` : 'A new event.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
              {formattedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formattedDate}
                </span>
              )}
              {item.mode && (
                <span className="flex items-center gap-1.5">
                  {item.mode === 'virtual' || item.mode === 'hybrid' ? <Video className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
                  <span className="capitalize">{item.mode}</span>
                </span>
              )}
            </div>
          </div>

          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function StudentFeed() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<FeedFilter>('all')

  const { data: feedData } = useFeed()
  const feedItems = feedData?.results ?? []

  const filteredItems = useMemo(() => {
    let items = feedItems

    if (activeTab === 'opportunities') items = items.filter((i) => i.event_type.includes('internship'))
    else if (activeTab === 'mentorship') items = items.filter((i) => i.event_type.includes('mentorship'))
    else if (activeTab === 'events') items = items.filter((i) => i.event_type.includes('event'))

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter((item) => {
        const d = item.data
        return d.title?.toLowerCase().includes(q)
      })
    }

    return items
  }, [feedItems, activeTab, search])

  const counts = useMemo(
    () => ({
      all: feedItems.length,
      mentorship: feedItems.filter((i) => i.event_type.includes('mentorship')).length,
      internship: feedItems.filter((i) => i.event_type.includes('internship')).length,
      event: feedItems.filter((i) => i.event_type.includes('event')).length,
    }),
    [feedItems],
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
        onValueChange={(v) => setActiveTab(v as FeedFilter)}
      >
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="mentorship">
            Mentorships ({counts.mentorship})
          </TabsTrigger>
          <TabsTrigger value="opportunities">
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
              {filteredItems.map((item) => {
                if (item.event_type.includes('internship')) {
                  return (
                    <InternshipFeedCard
                      key={item.sqid}
                      item={item.data}
                      sqid={item.sqid}
                    />
                  )
                }
                if (item.event_type.includes('mentorship')) {
                  return (
                    <MentorshipFeedCard
                      key={item.sqid}
                      item={item.data}
                      sqid={item.sqid}
                    />
                  )
                }
                return (
                  <EventFeedCard
                    key={item.sqid}
                    item={item.data}
                    sqid={item.sqid}
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
