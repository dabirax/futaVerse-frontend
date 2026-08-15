import { useMyPosts } from '@/hooks/usePosts'
import PostsList from '@/components/user/posts/PostsList'

export default function AlumnusPosts() {
  const { data, isLoading, isError } = useMyPosts()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">My Posts</h1>
        <p className="text-sm text-muted-foreground">
          Posts you have shared with the FUTA community.
        </p>
      </div>

      {isError ? (
        <div className="bg-card rounded-xl border shadow-sm p-12 text-center">
          <p className="text-sm text-red-500">
            Something went wrong fetching your posts.
          </p>
        </div>
      ) : (
        <PostsList
          posts={data?.results ?? []}
          role="alumnus"
          isSelf
          loading={isLoading}
          emptyMessage="You haven't shared any posts yet."
        />
      )}
    </div>
  )
}
