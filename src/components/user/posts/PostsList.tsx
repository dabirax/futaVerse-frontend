import type { Post } from '@/types/posts'
import PostCard from '@/components/user/posts/PostCard'

interface PostsListProps {
  posts: Array<Post>
  role: 'student' | 'alumnus'
  authorSqid?: string
  isSelf?: boolean
  loading?: boolean
  emptyMessage?: string
}

export default function PostsList({
  posts,
  role,
  authorSqid,
  isSelf = false,
  loading = false,
  emptyMessage = 'No posts yet.',
}: PostsListProps) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-card rounded-xl border shadow-sm p-5 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-lg bg-muted shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-muted" />
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-2/3 rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <PostCard
          key={post.sqid}
          post={post}
          role={role}
          authorSqid={authorSqid}
          isSelf={isSelf}
        />
      ))}
    </div>
  )
}
