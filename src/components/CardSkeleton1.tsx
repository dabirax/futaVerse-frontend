
const CardSkeleton1 = () => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
            <div key={index} className="border flex gap-4 rounded-lg p-4 shadow-sm animate-pulse">
                <div>
                <div className="h-16 w-16 bg-gray-200 rounded-lg mb-4"></div>
                </div>
                <div className='w-full'>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
            <div className="flex justify-between">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardSkeleton1