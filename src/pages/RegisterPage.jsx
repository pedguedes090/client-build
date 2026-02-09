import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register as apiRegister } from '../api';

function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return;
        }

        setLoading(true);

        try {
            const response = await apiRegister(username, email, password);
            if (response.success) {
                navigate('/login', { state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' } });
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-dark-card p-6 sm:p-8 shadow-lg dark:shadow-none rounded-xl">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-primary mb-2">Đăng ký</h1>
                        <p className="text-sm text-gray-500">Tạo tài khoản để lưu tiến độ đọc</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label htmlFor="register-username" className="form-label">Tên người dùng</label>
                            <input
                                id="register-username"
                                type="text"
                                autoComplete="username"
                                className="form-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="username"
                                required
                                aria-required="true"
                            />
                        </div>

                        <div>
                            <label htmlFor="register-email" className="form-label">Email</label>
                            <input
                                id="register-email"
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
                            <label htmlFor="register-password" className="form-label">Mật khẩu</label>
                            <input
                                id="register-password"
                                type="password"
                                autoComplete="new-password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                minLength={6}
                                required
                                aria-required="true"
                                aria-describedby="password-hint"
                            />
                            <p id="password-hint" className="text-[11px] text-gray-400 mt-1">Tối thiểu 6 ký tự</p>
                        </div>

                        <div>
                            <label htmlFor="register-confirm" className="form-label">Xác nhận mật khẩu</label>
                            <input
                                id="register-confirm"
                                type="password"
                                autoComplete="new-password"
                                className="form-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {loading ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Đã có tài khoản?{' '}
                            <Link to="/login" className="text-primary font-medium hover:underline">
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default RegisterPage;
