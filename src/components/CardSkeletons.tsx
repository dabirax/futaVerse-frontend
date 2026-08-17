interface CardSkeleton4Props {
  variant: 'r-full' | 'r-sm'
}

export const CardSkeleton1 = () => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="border flex gap-4 rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div>
              <div className="h-16 w-16 bg-gray-200 rounded-lg mb-4"></div>
            </div>
            <div className="w-full">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="flex justify-between">
                <div className="h-8 bg-gray-200 rounded w-24"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const CardSkeleton2 = () => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="flex justify-between">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const CardSkeleton3 = () => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="border flex gap-4 rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div>
              <div className="h-16 w-16 bg-gray-200 rounded-lg mb-4"></div>
            </div>
            <div className="w-full">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="flex justify-end space-x-2">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const CardSkeleton4 = ({ variant }: CardSkeleton4Props) => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="border flex gap-4 rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div>
              <div
                className={`h-16 w-16 bg-gray-200 rounded-lg mb-4 ${variant === 'r-full' ? 'rounded-full' : 'rounded-lg'}`}
              ></div>
            </div>
            <div className="w-full">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-2/5 mb-4"></div>
            </div>
            <div className="flex justify-end items-center space-x-2">
              <div className="h-8 bg-gray-200 rounded w-20"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const CardSkeleton5 = ({ variant }: CardSkeleton4Props) => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="border flex gap-4 rounded-lg p-4 shadow-sm animate-pulse"
          >
            <div>
              <div
                className={`h-16 w-16 bg-gray-200 mb-4 ${variant === 'r-full' ? 'rounded-full' : 'rounded-lg'}`}
              ></div>
            </div>
            <div className="w-full">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-2/5 mb-4"></div>
            </div>
            <div className="flex justify-end items-center space-x-2">
              <div className="h-10 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const FeedCardSkeleton = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="bg-card rounded-xl border shadow-sm p-5 animate-pulse"
        >
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-lg bg-gray-200 shrink-0"></div>
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                <div className="h-5 bg-gray-200 rounded-full w-14"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="flex items-center gap-4 pt-1">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="h-5 w-5 bg-gray-200 rounded shrink-0 mt-1"></div>
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
          className="bg-card rounded-xl border shadow-sm p-5 animate-pulse"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
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
          className="border rounded-xl overflow-hidden shadow-sm animate-pulse"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-0">
            <div className="bg-gray-200 p-6 sm:w-32 flex flex-row sm:flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-border self-stretch gap-2 sm:gap-0">
              <div className="h-4 bg-gray-300 rounded w-8"></div>
              <div className="h-8 bg-gray-300 rounded w-10"></div>
            </div>
            <div className="flex-1 p-5 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
                <div className="h-5 bg-gray-200 rounded-full w-16"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="p-5 sm:pl-0 sm:w-48 flex sm:flex-col items-center sm:items-end justify-between self-stretch sm:justify-center border-t sm:border-t-0 border-border bg-muted/10 gap-2">
              <div className="text-left sm:text-right space-y-1">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
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
        <div key={i} className="border rounded-xl shadow-sm animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-6 pb-3">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-48"></div>
              <div className="flex gap-3">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="h-5 bg-gray-200 rounded-full w-14"></div>
              <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 pt-3 border-t">
            <div className="space-y-1">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
            <div className="h-9 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const EventDetailSkeleton = () => {
  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden bg-gray-200 min-h-75 animate-pulse">
        <div className="p-8 space-y-4">
          <div className="h-5 bg-gray-300 rounded-full w-20 mb-6"></div>
          <div className="flex gap-3">
            <div className="h-6 bg-gray-300 rounded-full w-20"></div>
            <div className="h-6 bg-gray-300 rounded-full w-24"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-2/3"></div>
          <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          <div className="flex gap-6 pt-2">
            <div className="h-4 bg-gray-300 rounded w-40"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-40"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="border rounded-xl p-6 shadow-sm animate-pulse"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-5 bg-gray-200 rounded w-32"></div>
                      <div className="h-5 bg-gray-200 rounded-full w-10"></div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2">
                    <div className="space-y-1 text-left sm:text-right">
                      <div className="h-3 bg-gray-200 rounded w-10"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-full w-28"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="border shadow-md rounded-xl p-6 space-y-6 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-32"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="h-10 w-10 bg-gray-200 rounded-lg shrink-0"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
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
        <div className="h-8 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-56"></div>
      </div>

      <div className="border rounded-xl shadow-sm animate-pulse">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-9 bg-gray-200 rounded w-40"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 rounded w-14"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-gray-200 rounded w-26"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-20"></div>
                <div className="h-10 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-200 my-2"></div>

          <div className="flex justify-end">
            <div className="h-9 bg-gray-200 rounded w-28"></div>
          </div>
        </div>
      </div>

      <div className="border rounded-xl shadow-sm animate-pulse">
        <div className="p-6 space-y-2">
          <div className="h-5 bg-gray-200 rounded w-28"></div>
          <div className="h-3 bg-gray-200 rounded w-72"></div>
        </div>
      </div>
    </div>
  )
}
