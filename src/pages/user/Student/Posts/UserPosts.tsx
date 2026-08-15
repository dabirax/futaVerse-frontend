import UserPostsPage from '@/components/user/posts/UserPostsPage'
import { studentUserPostsRoute } from '@/routes/user-student'

export default function StudentUserPosts() {
  const { sqid } = studentUserPostsRoute.useParams()
  return <UserPostsPage role="student" sqid={sqid} />
}
