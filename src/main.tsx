import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import App from './App'
import { toast } from '@/hooks/use-toast'
import { getErrorMessage } from '@/lib/utils'

const toastedErrorKeys = new Set<string>()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const isNetworkError = error instanceof TypeError
        if (isNetworkError) {
          return failureCount < 3
        }
        return failureCount < 1
      },
    },
  },
  queryCache: new QueryCache({
    onSuccess: (_data, query) => {
      toastedErrorKeys.delete(query.queryHash)
    },
    onError: (error, query) => {
      if (toastedErrorKeys.has(query.queryHash)) return
      toastedErrorKeys.add(query.queryHash)
      toast({
        title: 'Error',
        description: getErrorMessage(
          error,
          'Something went wrong loading your data.',
        ),
        variant: 'destructive',
      })
    },
  }),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
