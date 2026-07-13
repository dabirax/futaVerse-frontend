import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const StudentAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Get quick insight into your events, tickets, and engagement.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Events Registered</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Attended</span>
              <Badge variant="secondary">3</Badge>
            </div>
            <Progress value={60} />
            <p className="text-sm text-muted-foreground">You&apos;re on track with your event participation.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Ticket Spend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last 30 days</span>
              <Badge>₦12,500</Badge>
            </div>
            <Progress value={40} />
            <p className="text-sm text-muted-foreground">Shows how much you invested in paid events.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Upcoming Activity</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Open Events</p>
            <p className="text-2xl font-semibold text-foreground">2</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tickets</p>
            <p className="text-2xl font-semibold text-foreground">5</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Check-ins</p>
            <p className="text-2xl font-semibold text-foreground">1</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentAnalytics
