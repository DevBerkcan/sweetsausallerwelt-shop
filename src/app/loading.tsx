
export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col items-center animate-pulse">
            {/* Hero Skeleton */}
            <div className="w-full h-[90vh] bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <div className="w-full max-w-4xl px-4 text-center">
                    <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-8"></div>
                    <div className="h-20 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-xl mx-auto mb-6"></div>
                    <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-10"></div>
                    <div className="h-14 w-48 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto"></div>
                </div>
            </div>

            {/* USP Skeleton */}
            <div className="container mx-auto py-20 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-32 bg-gray-100 dark:bg-gray-800 rounded-xl"></div>
                    ))}
                </div>
            </div>

            {/* Bestseller Skeleton */}
            <div className="container mx-auto py-20 px-4">
                <div className="flex justify-between items-end mb-12">
                    <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
                            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                            <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded-xl mt-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
