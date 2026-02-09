import { memo } from 'react';

/**
 * Reusable skeleton loading placeholders for better perceived performance.
 * Uses CSS animations only (no JS) for minimal overhead.
 */

function Skeleton({ className = '' }) {
    return (
        <div className={`animate-pulse bg-gray-200 dark:bg-dark-tertiary rounded ${className}`} />
    );
}

export function ComicCardSkeleton() {
    return (
        <div className="bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-sm dark:shadow-none">
            <Skeleton className="aspect-[3/4] rounded-none" />
            <div className="p-2 space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-2.5 w-1/2" />
                <Skeleton className="h-2.5 w-2/3" />
            </div>
        </div>
    );
}

export function ComicGridSkeleton({ count = 12, columns = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' }) {
    return (
        <div className={`grid ${columns} gap-2 sm:gap-3`}>
            {Array.from({ length: count }, (_, i) => (
                <ComicCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function FeaturedCarouselSkeleton() {
    return (
        <div className="flex gap-3 sm:gap-4 overflow-hidden">
            {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex-shrink-0 w-[calc((100%-24px)/3)] sm:w-[calc((100%-64px)/5)]">
                    <Skeleton className="aspect-[3/4] rounded-lg mb-2" />
                    <Skeleton className="h-3 w-3/4 mb-1" />
                    <Skeleton className="h-2 w-1/2" />
                </div>
            ))}
        </div>
    );
}

export function ComicDetailSkeleton() {
    return (
        <div className="bg-white dark:bg-dark-card p-3 sm:p-4 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-5">
                <Skeleton className="w-36 sm:w-48 h-48 sm:h-64 mx-auto md:mx-0 rounded-lg flex-shrink-0" />
                <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-2/3" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/5" />
                    <div className="flex gap-1.5">
                        {Array.from({ length: 4 }, (_, i) => (
                            <Skeleton key={i} className="h-5 w-14" />
                        ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Skeleton className="h-9 w-24 rounded" />
                        <Skeleton className="h-9 w-28 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export function RankingSkeleton({ count = 5 }) {
    return (
        <div className="space-y-2">
            {Array.from({ length: count }, (_, i) => (
                <div key={i} className="flex items-center gap-2 p-1.5">
                    <Skeleton className="w-12 h-16 rounded flex-shrink-0" />
                    <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-2.5 w-1/3" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default memo(Skeleton);
