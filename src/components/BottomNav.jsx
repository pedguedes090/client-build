import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    HomeOutlined,
    SearchOutlined,
    HistoryOutlined,
    HeartOutlined,
} from '@ant-design/icons';

const navItems = [
    { to: '/', icon: HomeOutlined, label: 'Trang chủ' },
    { to: '/search', icon: SearchOutlined, label: 'Tìm kiếm' },
    { to: '/history', icon: HistoryOutlined, label: 'Lịch sử' },
    { to: '/favorites', icon: HeartOutlined, label: 'Yêu thích' },
];

function BottomNav() {
    const location = useLocation();

    return (
        <nav
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-dark-card border-t border-gray-200 dark:border-dark-border pb-[env(safe-area-inset-bottom)]"
            role="navigation"
            aria-label="Bottom navigation"
        >
            <div className="flex items-center justify-around h-14">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = to === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(to);

                    return (
                        <Link
                            key={to}
                            to={to}
                            className={`flex flex-col items-center justify-center flex-1 h-full min-w-[64px] transition-colors ${
                                isActive
                                    ? 'text-primary'
                                    : 'text-gray-400 dark:text-gray-500 hover:text-primary'
                            }`}
                            aria-label={label}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <Icon className={`text-xl ${isActive ? 'text-primary' : ''}`} />
                            <span className="text-[10px] mt-0.5 font-medium">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default memo(BottomNav);
