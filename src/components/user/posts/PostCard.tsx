import { format } from 'date-fns'
import { Briefcase, Clock, GraduationCap } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { Post } from '@/types/posts'
import { normalizePostType } from '@/types/posts'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const kindLabels: Record<string, string> = {
  internship: 'Internship',
  mentorship: 'Mentorship',
}

export function PostTypeBadge({ postType }: { postType: string }) {
  const { kind, status } = normalizePostType(postType)
  const label = kind
    ? `${kindLabels[kind]} ${status === 'completed' ? 'completed' : 'started'}`
    : postType.replace(/_/g, ' ')
  return (
    <Badge className="bg-primary/10 text-primary border-0 text-xs">
      {label}
    </Badge>
  )
}

interface PostCardProps {
  post: Post
  role: 'student' | 'alumnus'
  authorSqid?: string
  isSelf?: boolean
}

export default function PostCard({
  post,
  role,
  authorSqid,
  isSelf = false,
}: PostCardProps) {
  const { kind } = normalizePostType(post.post_type)
  const Icon = kind === 'internship' ? Briefcase : GraduationCap

  return (
    <Card className="transition-all duration-300 hover:shadow-lg border-l-4 border-l-primary">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12 rounded-lg shrink-0">
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-sm font-semibold">
              <Icon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <PostTypeBadge postType={post.post_type} />
              {isSelf && (
                <Badge variant="outline" className="text-xs">
                  You
                </Badge>
              )}
              {authorSqid && !isSelf && (
                <Link
                  to={`/${role}/posts/u/${authorSqid}`}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  View profile
                </Link>
              )}
            </div>

            <p className="text-sm text-foreground whitespace-pre-line">
              {post.content}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-1">
              <Clock className="h-3.5 w-3.5" />
              {post.created_at
                ? format(new Date(post.created_at), 'MMM d, yyyy h:mm a')
                : ''}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
