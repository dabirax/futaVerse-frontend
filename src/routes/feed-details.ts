import { createRoute } from '@tanstack/react-router'
import { rootRoute } from './__root'
import FeedDetailsPage from '@/pages/user/FeedDetails'

export const feedDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/feed/details/$sqid/$type',
  component: FeedDetailsPage,
})
