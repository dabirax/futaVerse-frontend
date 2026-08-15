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

const toastedErrorKeys = new Set<string>()

const getErrorMessage = (err: any, fallback: string) =>
  err?.response?.data?.detail?.[0] ||
  err?.response?.data?.detail ||
  err?.response?.data?.message ||
  err?.message ||
  fallback

const queryClient = new QueryClient({
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
