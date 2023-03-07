import logo from 'assets/img/iba-tech-logo-white.svg';
// import searchIcon from 'assets/img/search-icon.svg';
import userIcon from 'assets/img/user-icon-with-background.svg';
import archiveIcon from 'assets/img/archive-icon.svg';
import favoriteIcon from 'assets/img/favourite-icon.svg';
import logoutIcon from 'assets/img/log-out-icon.svg';
import { Link } from 'react-router-dom';
import { useAuth } from 'context/auth/store';
import { useNotifications } from 'context/NotificationsContext';
import { useEffect, useState } from 'react';
import { axiosInstance } from 'api';

export const Header: React.FC = () => {
    const [{ email }, dispatch] = useAuth();
    const { notify } = useNotifications();
    const [username, setUsername] = useState<string>();

    useEffect(() => {
        axiosInstance
            .get(`/user/username/${email}`)
            .then((response) => {
                setUsername(response.data.fullName);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [email]);

    const logOut = (): void => {
        dispatch({ type: 'LOGGED_OUT' });
        notify({
            type: 'success',
            message: 'Successfully logged out',
        });
    };

    return (
        <header className="main-header">
            <Link to="/tasks/dashboard" className="main-header-logo">
                <img src={logo} alt="IBA Tech Academy" />
            </Link>
            <div className="main-header-wrapper">
                {/* <label className="main-header-search-wrapper">
                    <input type="search" className="main-header-search" placeholder="Search" />
                    <img src={searchIcon} alt="Search Icon" />
                </label> */}
                <div className="main-header-profile-wrapper">
                    <div className="main-header-profile-credentials">
                        <span className="main-header-profile-welcome">Welcome,</span>
                        <span className="main-header-username">{username}</span>
                    </div>
                    <img className="main-header-user-icon" src={userIcon} alt="User Icon" />
                    <div className="hidden-accordion-wrapper">
                        <ul className="hidden-accordion">
                            <li className="hidden-accordion-item">
                                <Link to="/tasks/archived" className="hidden-accordion-item-link">
                                    <img className="hidden-accordion-item-image" src={archiveIcon} alt="User Icon" />
                                    Archive
                                </Link>
                            </li>
                            <li className="hidden-accordion-item">
                                <Link to="/tasks/dashboard" className="hidden-accordion-item-link">
                                    <img
                                        className="hidden-accordion-item-image"
                                        src={favoriteIcon}
                                        alt="Favourite Icon"
                                    />
                                    My tasks
                                </Link>
                            </li>
                            <li className="hidden-accordion-item">
                                <a className="hidden-accordion-item-link" onClick={logOut}>
                                    <img className="hidden-accordion-item-image" src={logoutIcon} alt="Log Out Icon" />
                                    Log Out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};
