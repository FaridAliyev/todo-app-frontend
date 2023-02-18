import { Link } from 'react-router-dom';
import logoDark from 'assets/img/logo-dark.png';
import startPagePromo from 'assets/img/start-page-promo.png';
import userIcon from 'assets/img/icons/user.png';
import emailIcon from 'assets/img/icons/email.png';
import passwordIcon from 'assets/img/icons/password.png';

export const SignUp: React.FC = () => {
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

                            <form action="#" className="sign-up-form" id="sign-up-form">
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src={userIcon} alt="" />
                                        </span>
                                    </span>
                                    <input type="text" className="form-control @@complete" placeholder="Full name" />
                                </div>
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src={emailIcon} alt="" />
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
                                            <img src={passwordIcon} alt="" />
                                        </span>
                                    </span>
                                    <input type="password" className="form-control @@complete" placeholder="Password" />
                                </div>
                                <div className="text-input-container @@complete">
                                    <span className="text-input-icon">
                                        <span>
                                            <img src={passwordIcon} alt="" />
                                        </span>
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control @@complete"
                                        placeholder="Confirm password"
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
