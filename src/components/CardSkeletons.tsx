interface CardSkeleton4Props {
  variant: 'r-full' | 'r-sm'
}

export const CardSkeleton1 = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="border border-line rounded-md bg-surface p-4 shadow-xs animate-pulse"
        >
          <div className="flex gap-4">
            <div className="h-12 w-12 bg-surface-2 rounded-md shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-surface-2 rounded w-3/4" />
              <div className="h-3 bg-surface-2 rounded w-full" />
              <div className="h-3 bg-surface-2 rounded w-5/6" />
              <div className="flex gap-2">
                <div className="h-5 bg-surface-2 rounded w-16" />
                <div className="h-5 bg-surface-2 rounded w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const CardSkeleton2 = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="border border-line rounded-md bg-surface p-6 shadow-xs animate-pulse"
        >
          <div className="h-4 bg-surface-2 rounded w-1/3 mb-4" />
          <div className="space-y-2">
            <div className="h-3 bg-surface-2 rounded w-full" />
            <div className="h-3 bg-surface-2 rounded w-5/6" />
            <div className="h-3 bg-surface-2 rounded w-2/3" />
          </div>
          <div className="flex gap-4 mt-4">
            <div className="h-5 bg-surface-2 rounded w-20" />
            <div className="h-5 bg-surface-2 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const CardSkeleton3 = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="border border-line rounded-md bg-surface p-4 shadow-xs animate-pulse"
        >
          <div className="flex gap-4">
            <div className="h-12 w-12 bg-surface-2 rounded-md shrink-0" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-surface-2 rounded w-1/2" />
              <div className="h-4 bg-surface-2 rounded w-3/4" />
              <div className="flex justify-end gap-2">
                <div className="h-8 bg-surface-2 rounded w-20" />
                <div className="h-8 bg-surface-2 rounded w-20" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const CardSkeleton4 = ({ variant }: CardSkeleton4Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-1">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="border border-line rounded-md bg-surface p-4 shadow-xs animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 bg-surface-2 shrink-0 ${variant === 'r-full' ? 'rounded-full' : 'rounded-md'}`}
            />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-surface-2 rounded w-1/4" />
              <div className="h-3 bg-surface-2 rounded w-2/5" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 bg-surface-2 rounded w-20" />
              <div className="h-8 bg-surface-2 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const CardSkeleton5 = ({ variant }: CardSkeleton4Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-1">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="border border-line rounded-md bg-surface p-4 shadow-xs animate-pulse"
        >
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 bg-surface-2 shrink-0 ${variant === 'r-full' ? 'rounded-full' : 'rounded-md'}`}
            />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-surface-2 rounded w-1/4" />
              <div className="h-3 bg-surface-2 rounded w-2/5" />
            </div>
            <div className="h-8 bg-surface-2 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const FeedCardSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-surface rounded-md border border-line shadow-xs p-5 animate-pulse"
        >
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-surface-2 shrink-0" />
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-surface-2 rounded w-20" />
                <div className="h-4 bg-surface-2 rounded w-14" />
              </div>
              <div className="h-4 bg-surface-2 rounded w-3/4" />
              <div className="h-3 bg-surface-2 rounded w-full" />
              <div className="h-3 bg-surface-2 rounded w-2/3" />
              <div className="flex items-center gap-4 pt-1">
                <div className="h-3 bg-surface-2 rounded w-20" />
                <div className="h-3 bg-surface-2 rounded w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const EventCardSkeleton = () => {
  return (
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-surface rounded-md border border-line shadow-xs p-5 animate-pulse"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-surface-2 rounded w-20" />
                <div className="h-4 bg-surface-2 rounded w-16" />
              </div>
              <div className="h-4 bg-surface-2 rounded w-3/4" />
              <div className="h-3 bg-surface-2 rounded w-full" />
              <div className="h-3 bg-surface-2 rounded w-2/3" />
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
                <div className="h-3 bg-surface-2 rounded w-24" />
                <div className="h-3 bg-surface-2 rounded w-16" />
                <div className="h-3 bg-surface-2 rounded w-20" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0">
              <div className="h-4 bg-surface-2 rounded w-16" />
              <div className="h-8 bg-surface-2 rounded w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const StudentEventCardSkeleton = () => {
  return (
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="border border-line rounded-md overflow-hidden shadow-xs animate-pulse"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center">
            <div className="bg-surface-2 p-6 sm:w-32 flex flex-row sm:flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-line self-stretch gap-2 sm:gap-0">
              <div className="h-3 bg-line rounded w-8" />
              <div className="h-6 bg-line rounded w-10" />
            </div>
            <div className="flex-1 p-5 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-4 bg-surface-2 rounded w-20" />
                <div className="h-4 bg-surface-2 rounded w-16" />
              </div>
              <div className="h-4 bg-surface-2 rounded w-3/4" />
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                <div className="h-3 bg-surface-2 rounded w-16" />
                <div className="h-3 bg-surface-2 rounded w-20" />
              </div>
            </div>
            <div className="p-5 sm:pl-0 sm:w-48 flex sm:flex-col items-center sm:items-end justify-between self-stretch sm:justify-center border-t sm:border-t-0 border-line gap-2">
              <div className="text-left sm:text-right space-y-1">
                <div className="h-3 bg-surface-2 rounded w-16" />
                <div className="h-4 bg-surface-2 rounded w-20" />
                <div className="h-3 bg-surface-2 rounded w-24" />
              </div>
              <div className="h-5 w-5 bg-surface-2 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const TicketCardSkeleton = () => {
  return (
    <div className="grid gap-4">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="border border-line rounded-md shadow-xs animate-pulse"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-6 pb-3">
            <div className="space-y-2">
              <div className="h-4 bg-surface-2 rounded w-48" />
              <div className="flex gap-3">
                <div className="h-3 bg-surface-2 rounded w-24" />
                <div className="h-3 bg-surface-2 rounded w-20" />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-4 bg-surface-2 rounded-full w-14" />
              <div className="h-4 bg-surface-2 rounded-full w-20" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 pt-3 border-t border-line">
            <div className="space-y-1">
              <div className="h-3 bg-surface-2 rounded w-24" />
              <div className="h-3 bg-surface-2 rounded w-16" />
              <div className="h-3 bg-surface-2 rounded w-32" />
            </div>
            <div className="h-8 bg-surface-2 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const EventDetailSkeleton = () => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div className="relative rounded-md overflow-hidden bg-surface-2 min-h-75 animate-pulse">
        <div className="p-8 space-y-4">
          <div className="h-4 bg-line rounded w-20 mb-6" />
          <div className="flex gap-3">
            <div className="h-5 bg-line rounded w-20" />
            <div className="h-5 bg-line rounded w-24" />
          </div>
          <div className="h-8 bg-line rounded w-2/3" />
          <div className="h-8 bg-line rounded w-1/2" />
          <div className="flex gap-6 pt-2">
            <div className="h-3 bg-line rounded w-40" />
            <div className="h-3 bg-line rounded w-32" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="h-5 bg-surface-2 rounded w-40" />
            <div className="space-y-2">
              <div className="h-3 bg-surface-2 rounded w-full" />
              <div className="h-3 bg-surface-2 rounded w-5/6" />
              <div className="h-3 bg-surface-2 rounded w-4/5" />
              <div className="h-3 bg-surface-2 rounded w-3/4" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-5 bg-surface-2 rounded w-48" />
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="border border-line rounded-md p-6 shadow-xs animate-pulse"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-surface-2 rounded w-32" />
                      <div className="h-4 bg-surface-2 rounded-full w-10" />
                    </div>
                    <div className="h-3 bg-surface-2 rounded w-full" />
                    <div className="h-3 bg-surface-2 rounded w-2/3" />
                    <div className="h-3 bg-surface-2 rounded w-1/2" />
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                    <div className="space-y-1 text-left sm:text-right">
                      <div className="h-3 bg-surface-2 rounded w-10" />
                      <div className="h-5 bg-surface-2 rounded w-20" />
                    </div>
                    <div className="h-8 bg-surface-2 rounded-full w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-line shadow-xs rounded-md p-6 space-y-6 animate-pulse">
            <div className="h-4 bg-surface-2 rounded w-32" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="h-10 w-10 bg-surface-2 rounded-full shrink-0" />
                <div className="space-y-1">
                  <div className="h-3 bg-surface-2 rounded w-20" />
                  <div className="h-3 bg-surface-2 rounded w-32" />
                  <div className="h-3 bg-surface-2 rounded w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const SettingsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-6 bg-surface-2 rounded w-32" />
        <div className="h-3 bg-surface-2 rounded w-56" />
      </div>

      <div className="border border-line rounded-md shadow-xs animate-pulse">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="space-y-2">
            <div className="h-4 bg-surface-2 rounded w-20" />
            <div className="h-3 bg-surface-2 rounded w-64" />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 bg-surface-2 rounded-full" />
            <div className="space-y-2">
              <div className="h-8 bg-surface-2 rounded w-40" />
              <div className="h-3 bg-surface-2 rounded w-20" />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <div className="flex gap-2">
            <div className="h-7 bg-surface-2 rounded w-14" />
            <div className="h-7 bg-surface-2 rounded w-16" />
            <div className="h-7 bg-surface-2 rounded w-26" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-surface-2 rounded w-20" />
                <div className="h-9 bg-surface-2 rounded w-full" />
              </div>
            ))}
          </div>

          <div className="h-px bg-line my-2" />

          <div className="flex justify-end">
            <div className="h-8 bg-surface-2 rounded w-28" />
          </div>
        </div>
      </div>

      <div className="border border-line rounded-md shadow-xs animate-pulse">
        <div className="p-6 space-y-2">
          <div className="h-4 bg-surface-2 rounded w-28" />
          <div className="h-3 bg-surface-2 rounded w-72" />
        </div>
      </div>
    </div>
  )
}
