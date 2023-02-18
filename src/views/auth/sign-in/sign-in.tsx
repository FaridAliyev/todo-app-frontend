import { Link } from 'react-router-dom';
import logoDark from 'assets/img/logo-dark.png';
import startPagePromo from 'assets/img/start-page-promo.png';

export const SignIn: React.FC = () => {
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
                            <h1 className="welcome-title">Welcome back!</h1>
                            <p className="welcome-text">
                                To keep connected with us please login with personal information by email address and
                                password
                            </p>

                            <form action="#" className="login-form" id="login-form">
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src="./img/icons/email.png" alt="" />
                                        </span>
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control @@complete"
                                        placeholder="Email address"
                                    />
                                </div>
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src="./img/icons/password.png" alt="" />
                                        </span>
                                    </span>
                                    <input type="password" className="form-control @@complete" placeholder="Password" />
                                </div>

                                <div className="login-options">
                                    <Link to="/reset-password" className="form-link">
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="button-container">
                                    <a href="landing.html" className="btn btn-dark">
                                        Login now
                                    </a>

                                    <Link to="/sign-up" className="btn btn-light">
                                        Create account
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
