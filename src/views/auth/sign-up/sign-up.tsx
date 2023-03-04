import { Link } from 'react-router-dom';
import logoDark from 'assets/img/logo-dark.png';
import startPagePromo from 'assets/img/start-page-promo.png';
import userIcon from 'assets/img/icons/user.png';
import emailIcon from 'assets/img/icons/email.png';
import passwordIcon from 'assets/img/icons/password.png';
import { useState } from 'react';
import { axiosInstance } from 'api';
import { useNotifications } from 'context/NotificationsContext';

interface NewUser {
    email: string;
    fullName: string;
    password: string;
    confirmPassword: string;
}

export const SignUp: React.FC = () => {
    const { notify } = useNotifications();

    const [newUser, setNewUser] = useState<NewUser>({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        axiosInstance
            .post('/register', newUser)
            .then(() =>
                notify({
                    type: 'success',
                    message: 'Please check your email and confirm your account',
                }),
            )
            .catch((error) =>
                notify({
                    type: 'error',
                    message: error.response.data.message || 'Something went wrong',
                }),
            );
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            <div className="navbar-light">
                <div className="container">
                    <Link to="/sign-up" className="logo logo--dark">
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
                            <h1 className="welcome-title">Create an account</h1>
                            <p className="welcome-text">
                                Create your account, it takes less than a minute. If you already have an account{' '}
                                <Link to="/sign-in" className="text-link">
                                    Login
                                </Link>
                            </p>

                            <form onSubmit={handleSubmit} className="sign-up-form" id="sign-up-form">
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src={userIcon} alt="" />
                                        </span>
                                    </span>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control @@complete"
                                        placeholder="Full name"
                                        onChange={handleChange}
                                    />
                                </div>
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
                                        placeholder="Email address"
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

                                <div className="button-container">
                                    <button className="btn btn-dark">Create account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
