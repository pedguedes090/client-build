import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await apiLogin(email, password);
            if (response.success) {
                login(response.user, response.token);
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-dark-card p-6 sm:p-8 shadow-lg dark:shadow-none rounded-xl">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-primary mb-2">Đăng nhập</h1>
                        <p className="text-sm text-gray-500">Chào mừng bạn trở lại!</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label htmlFor="login-email" className="form-label">Email</label>
                            <input
                                id="login-email"
                                type="email"
                                autoComplete="email"
                                inputMode="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                aria-required="true"
                            />
                        </div>

                        <div>
                            <label htmlFor="login-password" className="form-label">Mật khẩu</label>
                            <input
                                id="login-password"
                                type="password"
                                autoComplete="current-password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                aria-required="true"
                            />
                        </div>

                        {error && (
                            <div role="alert" className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-mobile w-full bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Chưa có tài khoản?{' '}
                            <Link to="/register" className="text-primary font-medium hover:underline">
                                Đăng ký ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginPage;
