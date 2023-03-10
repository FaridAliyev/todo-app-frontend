import { Link, useNavigate } from 'react-router-dom';
import logoDark from 'assets/img/logo-dark.png';
import startPagePromo from 'assets/img/start-page-promo.png';
import { useState } from 'react';
import { axiosInstance } from 'api';
import { useNotifications } from 'context/NotificationsContext';
import emailIcon from 'assets/img/icons/email.png';

export const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const { notify } = useNotifications();
    const [email, setEmail] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axiosInstance
            .put(`/process/reset-password?email=${email}`)
            .then(() => {
                notify({
                    type: 'success',
                    message: 'Please check your email for further instructions',
                });
                navigate('/new-password');
            })
            .catch((error) => {
                notify({
                    type: 'error',
                    message: error.response.data.message || 'Something went wrong',
                });
            });
    };

    return (
        <>
            <div className="navbar-light">
                <div className="container">
                    <Link to="/sign-in" className="logo logo--dark">
                        <div className="logo-img logo-img--dark">
                            <span>
                                <img src={logoDark} alt="" />
                            </span>
                        </div>
                        <div className="logo-text">
                            <p className="logo-text-abbr">IBA</p>
                            <p className="logo-text-company-name">Tech Academy</p>
                        </div>
                    </Link>
                </div>
            </div>
            <main className="start-content">
                <div className="container">
                    <div className="start-content-row">
                        <div className="start-content-welcome-img-b">
                            <img src={startPagePromo} className="start-content-welcome-img" alt="#" />
                        </div>
                        <div className="start-content-welcome-text-b">
                            <h1 className="welcome-title">Reset password</h1>
                            <p className="welcome-text">We???ll e-mail you instruction on how to reset your password</p>

                            <form onSubmit={handleSubmit} className="form" id="reset-password-form">
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src={emailIcon} alt="" />
                                        </span>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control @@complete"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <p className="form-text">
                                    Go back to{' '}
                                    <Link to="/sign-in" className="text-link">
                                        Login
                                    </Link>
                                </p>

                                <div className="button-container">
                                    <button type="submit" className="btn btn-dark">
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
