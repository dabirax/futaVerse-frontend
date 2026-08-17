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
  { icon: Rss, label: 'Feed', path: '/student/feed' },
  { icon: Newspaper, label: 'Posts', path: '/student/posts' },
  { icon: Briefcase, label: 'Internship', path: '/student/internships' },
  { icon: Users, label: 'Mentorship', path: '/student/mentorships' },
  { icon: Calendar, label: 'Events', path: '/student/events' },
  { icon: TicketCheck, label: 'Tickets', path: '/student/tickets' },
  { icon: MessageSquare, label: 'Messages', path: '/student/messages' },
  { icon: Calendar, label: 'Calendar', path: '/student/calendar' },
  { icon: BarChart3, label: 'Analytics', path: '/student/analytics' },
  { icon: Settings, label: 'Settings', path: '/student/settings' },
]

export default function StudentLayout() {
  return <DashboardLayout role="student" sidebarItems={sidebarItems} />
}
