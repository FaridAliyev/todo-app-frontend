import { Link, useNavigate } from 'react-router-dom';
import logoDark from 'assets/img/logo-dark.png';
import startPagePromo from 'assets/img/start-page-promo.png';
import { useState } from 'react';
import { axiosInstance } from 'api';
import { useNotifications } from 'context/NotificationsContext';
import emailIcon from 'assets/img/icons/email.png';
import passwordIcon from 'assets/img/icons/password.png';

interface ChangePassword {
    email: string;
    password: string;
    confirmPassword: string;
}

export const NewPassword: React.FC = () => {
    const { notify } = useNotifications();
    const navigate = useNavigate();
    const [changePassword, setChangePassword] = useState<ChangePassword>({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangePassword({
            ...changePassword,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axiosInstance
            .put(`/reset-password`, changePassword)
            .then(() => {
                notify({
                    type: 'success',
                    message: 'Password was resetted',
                });
                navigate('/sign-in');
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
                            <h1 className="welcome-title">Set new password</h1>
                            <p className="welcome-text">
                                Please enter your email again and new password to reset your password
                            </p>

                            <form onSubmit={handleSubmit} className="form" id="reset-password-form">
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src={emailIcon} alt="" />
                                        </span>
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control @@complete"
                                        placeholder="Email"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src={passwordIcon} alt="" />
                                        </span>
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control @@complete"
                                        placeholder="Password (min 1 uppercase, 1 symbol)"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src={passwordIcon} alt="" />
                                        </span>
                                    </span>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control @@complete"
                                        placeholder="Confirm password"
                                        onChange={handleChange}
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
