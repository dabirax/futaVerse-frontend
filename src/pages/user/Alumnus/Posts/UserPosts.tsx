import UserPostsPage from '@/components/user/posts/UserPostsPage'
import { alumnusUserPostsRoute } from '@/routes/user-alumnus'

export default function AlumnusUserPosts() {
  const { sqid } = alumnusUserPostsRoute.useParams()
  return <UserPostsPage role="alumnus" sqid={sqid} />
}
