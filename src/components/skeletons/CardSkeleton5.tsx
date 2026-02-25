interface CardSkeleton5Props {
  variant: 'r-full' | 'r-sm' 
}

const CardSkeleton5 = ({variant}: CardSkeleton5Props) => {
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

export default CardSkeleton5
