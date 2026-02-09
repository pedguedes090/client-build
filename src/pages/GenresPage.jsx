import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGenres } from '../api';
import { AppstoreOutlined } from '@ant-design/icons';

function GenresPage() {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGenres() {
            try {
                const data = await getGenres();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchGenres();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="w-10 h-10 border-4 border-gray-200 dark:border-dark-tertiary border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white dark:bg-dark-card p-4 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-2 mb-4">
                    <AppstoreOutlined className="text-primary text-lg" />
                    <h1 className="text-lg font-semibold text-primary">Thể loại truyện</h1>
                    <span className="text-xs text-gray-500">({genres.length} thể loại)</span>
                </div>

                {genres.length === 0 ? (
                    <div className="py-12 text-center">
                        <AppstoreOutlined className="text-4xl text-gray-300 dark:text-gray-600 mb-3" />
                        <p className="text-gray-400 mb-2">Chưa có thể loại nào</p>
                        <p className="text-sm text-gray-500">Thể loại sẽ xuất hiện khi có truyện được thêm vào hệ thống</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {genres.map((genre) => (
                            <Link
                                key={genre}
                                to={`/search?genre=${encodeURIComponent(genre)}`}
                                className="px-4 py-3 bg-gray-100 dark:bg-dark-secondary hover:bg-gray-200 dark:hover:bg-dark-tertiary text-center text-sm text-gray-700 dark:text-gray-300 hover:text-primary transition-all group"
                            >
                                <span className="group-hover:text-primary">{genre}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default GenresPage;
