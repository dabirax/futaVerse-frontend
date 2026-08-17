import {
  BarChart3,
  Briefcase,
  Calendar,
  MessageSquare,
  Newspaper,
  Rss,
  Settings,
  TicketCheck,
  Users,
} from 'lucide-react'
import DashboardLayout from '@/components/layout/dashboard-layout'

const sidebarItems = [
  { icon: Rss, label: 'Feed', path: '/alumnus/feed' },
  { icon: Newspaper, label: 'Posts', path: '/alumnus/posts' },
  { icon: Briefcase, label: 'Internships', path: '/alumnus/internships' },
  { icon: Users, label: 'Mentorships', path: '/alumnus/mentorships' },
  { icon: Calendar, label: 'Events', path: '/alumnus/events' },
  { icon: TicketCheck, label: 'Tickets', path: '/alumnus/tickets' },
  { icon: MessageSquare, label: 'Messages', path: '/alumnus/messages' },
  { icon: Calendar, label: 'Calendar', path: '/alumnus/calendar' },
  { icon: BarChart3, label: 'Analytics', path: '/alumnus/analytics' },
  { icon: Settings, label: 'Settings', path: '/alumnus/settings' },
]

export default function AlumnusLayout() {
  return <DashboardLayout role="alumnus" sidebarItems={sidebarItems} />
}
