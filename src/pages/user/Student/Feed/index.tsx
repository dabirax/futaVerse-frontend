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
  ChevronRight,
  Trophy,
  Zap,
} from 'lucide-react'
import { format } from 'date-fns'
import { useFeed } from '@/hooks/useFeed'
import { FeedItemData } from '@/types/feed'
import { Button } from '@/components/ui/button'
import InternshipFeedCard from '@/components/user/feed/InternshipFeedCard'

type FeedFilter = 'all' | 'opportunities' | 'mentorship' | 'events'

function getGreeting(): string {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Good morning'
  if (h >= 12 && h < 17) return 'Good afternoon'
  if (h >= 17 && h < 22) return 'Good evening'
  return 'Good night'
}

const filters: { label: string; value: FeedFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Opportunities', value: 'opportunities' },
  { label: 'Mentorship', value: 'mentorship' },
  { label: 'Events', value: 'events' },
]

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

// ----------- Right Sidebar -----------

const quickActions = [
  { label: 'Update Profile', icon: Zap },
  { label: 'Explore Resources', icon: Trophy },
  { label: 'Find a Mentor', icon: GraduationCap },
  { label: 'Register for Event', icon: Calendar },
]

function RightSidebar() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
      {/* Quick Actions */}
      <div className="bg-card rounded-xl border shadow-sm p-4">
        <h3 className="font-semibold text-sm text-foreground mb-3">Quick Actions</h3>
        <div className="space-y-1">
          {quickActions.map((action, idx) => {
            const Icon = action.icon
            return (
              <button
                key={idx}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            )
          })}
        </div>
      </div>

      {/* Suggested Mentors (Mockup) */}
      <div className="bg-card rounded-xl border shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-foreground">Top Mentors</h3>
          <button className="text-xs text-primary font-medium hover:underline">See all</button>
        </div>
        <div className="space-y-3">
          {[
            { id: 1, name: 'Dr. Jane Doe', role: 'Data Scientist', company: 'Google' },
            { id: 2, name: 'Prof. John Smith', role: 'AI Researcher', company: 'FUTA' },
          ].map((mentor) => (
            <div key={mentor.id} className="flex items-center gap-2.5">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="bg-purple-100 text-purple-700 text-xs font-semibold">
                  {mentor.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground leading-tight truncate">{mentor.name}</p>
                <p className="text-xs text-muted-foreground truncate">{mentor.role}</p>
                <p className="text-xs text-muted-foreground truncate">{mentor.company}</p>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 h-7 text-xs px-3">
                View
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
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

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start">
      {/* Main Feed */}
      <div className="flex-1 min-w-0 space-y-4">
        {/* Greeting */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{getGreeting()} 👋</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Discover mentorships, internships, and events
            </p>
          </div>

          <div className="relative shrink-0 hidden md:block">
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
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveTab(f.value)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === f.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Feed Cards */}
        <div className="space-y-3 pt-2">
          {filteredItems.length === 0 ? (
            <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
              <p className="text-sm text-muted-foreground">No results found</p>
            </div>
          ) : (
            filteredItems.map((item) => {
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
            })
          )}
        </div>
      </div>

      {/* Right Sidebar — xl+ only */}
      <div className="hidden xl:block xl:w-72 xl:shrink-0 xl:sticky xl:top-6">
        <RightSidebar />
      </div>
    </div>
  )
}
