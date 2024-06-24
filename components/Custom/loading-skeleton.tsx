export const LoadingSkeleton = () => {
    return (
      <div className="w-full h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
          </div>
  
          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Left Column */}
            <div className="col-span-2 space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-3/4 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Right Column */}
            <div className="space-y-4">
              {[...Array(2)].map((_, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Footer Skeleton */}
          <div className="mt-8">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full w-48"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  
  export const SmallLoadingSkeleton = () => {
    return (
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded col-span-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }