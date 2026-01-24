/**
 * Format a date/timestamp to Vietnamese relative time string
 * @param {string|number} dateOrTimestamp - Date string or timestamp in milliseconds
 * @returns {string} Formatted relative time string in Vietnamese
 */
export function formatTimeAgo(dateOrTimestamp) {
    if (!dateOrTimestamp) return '';

    let date;
    if (typeof dateOrTimestamp === 'number') {
        date = new Date(dateOrTimestamp);
    } else {
        // Fix: Server returns UTC time string without 'Z' (e.g. "2024-01-24T10:00:00")
        // Browser defaults to Local Time if timezone is missing, causing 7 hours difference in VN
        // We force it to be treated as UTC by appending 'Z' if missing
        let timeString = dateOrTimestamp;
        if (typeof timeString === 'string' &&
            !timeString.endsWith('Z') &&
            !/[+-]\d{2}:?\d{2}$/.test(timeString)) {
            timeString += 'Z';
        }
        date = new Date(timeString);
    }

    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    const diffMonths = Math.floor(diffDays / 30);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 30) return `${diffDays} ngày trước`;
    if (diffMonths < 12) return `${diffMonths} tháng trước`;
    return date.toLocaleDateString('vi-VN');
}

/**
 * Format a date string to Vietnamese locale date
 * @param {string} dateString - Date string
 * @returns {string} Formatted date string
 */
export function formatDate(dateString) {
    let timeString = dateString;
    if (typeof timeString === 'string' &&
        !timeString.endsWith('Z') &&
        !/[+-]\d{2}:?\d{2}$/.test(timeString)) {
        timeString += 'Z';
    }
    const date = new Date(timeString);
    return date.toLocaleDateString('vi-VN');
}

/**
 * Format view count to human readable string (K, M)
 * @param {number} views - Number of views
 * @returns {string} Formatted view count
 */
export function formatViews(views) {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views?.toString() || '0';
}
