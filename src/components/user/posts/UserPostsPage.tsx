import { useUserPosts } from '@/hooks/usePosts'
import PostsList from '@/components/user/posts/PostsList'

interface UserPostsPageProps {
  role: 'student' | 'alumnus'
  sqid: string
}

export default function UserPostsPage({ role, sqid }: UserPostsPageProps) {
  const { data, isLoading, isError } = useUserPosts(sqid)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Posts</h1>
        <p className="text-sm text-muted-foreground">
          Posts shared by this user with the FUTA community.
        </p>
      </div>

      {isError ? (
        <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
          <p className="text-sm text-red-500">
            Something went wrong fetching these posts.
          </p>
        </div>
      ) : (
        <PostsList
          posts={data?.results ?? []}
          role={role}
          authorSqid={sqid}
          isSelf={sqid === (sessionStorage.getItem('user_sqid') ?? '')}
          loading={isLoading}
          emptyMessage="This user hasn't shared any posts yet."
        />
      )}
    </div>
  )
}
