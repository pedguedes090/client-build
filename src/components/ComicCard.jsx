import { memo } from 'react';
import { Link } from 'react-router-dom';
import { PLACEHOLDER_COVER } from '../constants/placeholders';
import { resolveImageUrl, slugify } from '../api';
import { formatTimeAgo } from '../utils/formatters';
import LazyImage from './LazyImage';


// Vertical card for Featured section (no chapters)
// Uses CSS fade-in animation instead of per-item framer-motion for better scroll perf
export const ComicCard = memo(function ComicCard({ comic, showBadge = false, index = 0, compact = false }) {
    return (
        <div
            className="comic-card-enter hover:-translate-y-1 transition-transform duration-200"
            style={index < 20 ? { animationDelay: `${Math.min(index * 40, 500)}ms` } : undefined}
        >
            <Link to={`/truyen/${comic.slug || slugify(comic.title)}`} className="group block">
                <div className={`relative overflow-hidden rounded-lg ${compact ? 'aspect-[3/4] mb-1.5' : 'aspect-[3/4] mb-2'}`}>
                    <LazyImage
                        src={resolveImageUrl(comic.cover_url) || PLACEHOLDER_COVER}
                        alt={comic.title}
                        fallback={PLACEHOLDER_COVER}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    {showBadge && comic.status && (
                        <span className={`absolute top-1 left-1 font-bold bg-gradient-to-r from-primary to-primary-hover text-white rounded z-10 ${compact ? 'px-1 py-0.5 text-[8px]' : 'px-1.5 py-0.5 text-[10px]'}`}>
                            {comic.status === 'ongoing' ? 'Đang ra' : 'Hoàn thành'}
                        </span>
                    )}
                </div>
                <h3 className={`font-medium line-clamp-2 leading-tight text-gray-800 dark:text-gray-200 group-hover:text-primary transition-colors ${compact ? 'text-[10px]' : 'text-xs'}`}>
                    {comic.title}
                </h3>
                {!compact && <p className="text-[10px] text-gray-500 mt-0.5">{comic.author || 'Updating...'}</p>}
            </Link>
        </div>
    );
});

// Vertical card with chapters below image (TruyenDex style)
// Uses CSS fade-in animation instead of per-item framer-motion for better scroll perf
export const ComicCardWithChapters = memo(function ComicCardWithChapters({ comic, index = 0 }) {
    return (
        <div
            className="comic-card-enter bg-white dark:bg-dark-card rounded-lg overflow-hidden hover:ring-1 hover:ring-primary/50 hover:-translate-y-1 transition-all duration-200 shadow-sm dark:shadow-none"
            style={index < 20 ? { animationDelay: `${Math.min(index * 40, 500)}ms` } : undefined}
        >
            {/* Image - clickable to comic page */}
            <Link to={`/truyen/${comic.slug || slugify(comic.title)}`} className="block relative aspect-[3/4] overflow-hidden">
                <LazyImage
                    src={resolveImageUrl(comic.cover_url) || PLACEHOLDER_COVER}
                    alt={comic.title}
                    fallback={PLACEHOLDER_COVER}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                />
            </Link>

            {/* Title */}
            <div className="p-2">
                <Link to={`/truyen/${comic.slug || slugify(comic.title)}`}>
                    <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-100 hover:text-primary transition-colors line-clamp-1 mb-2">
                        {comic.title}
                    </h3>
                </Link>

                {/* Chapters list - below title */}
                <div className="space-y-1">
                    {comic.recent_chapters && comic.recent_chapters.length > 0 ? (
                        comic.recent_chapters.map(chapter => (
                            <Link
                                key={chapter.id}
                                to={`/truyen/${comic.slug || slugify(comic.title)}/chuong/${chapter.chapter_number}`}
                                className="flex items-center justify-between text-[11px] py-0.5 hover:text-primary transition-colors"
                            >
                                <span className="text-gray-600 dark:text-gray-400 truncate">
                                    Chap {chapter.chapter_number}
                                </span>
                                <span className="text-gray-400 dark:text-gray-600 ml-2 flex-shrink-0">
                                    {formatTimeAgo(chapter.created_at)}
                                </span>
                            </Link>
                        ))
                    ) : (
                        <p className="text-[10px] text-gray-400 dark:text-gray-600">Chưa có chương</p>
                    )}
                </div>
            </div>
        </div>
    );
});

export default ComicCard;
