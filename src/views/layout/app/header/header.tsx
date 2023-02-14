import logo from 'assets/img/iba-tech-logo-white.svg';
import searchIcon from 'assets/img/search-icon.svg';
import userIcon from 'assets/img/user-icon-with-background.svg';
import archiveIcon from 'assets/img/archive-icon.svg';
import favoriteIcon from 'assets/img/favourite-icon.svg';
import logoutIcon from 'assets/img/log-out-icon.svg';

export const Header: React.FC = () => {
    return (
        <header className="main-header">
            <a href="./tasks-dashboard.html" className="main-header-logo">
                <img src={logo} alt="IBA Tech Academy" />
            </a>
            <div className="main-header-wrapper">
                <label className="main-header-search-wrapper">
                    <input type="search" className="main-header-search" placeholder="Search" />
                    <img src={searchIcon} alt="Search Icon" />
                </label>
                <div className="main-header-profile-wrapper">
                    <div className="main-header-profile-credentials">
                        <span className="main-header-profile-welcome">Welcome,</span>
                        <span className="main-header-username">Sample User</span>
                    </div>
                    <img className="main-header-user-icon" src={userIcon} alt="User Icon" />
                    <div className="hidden-accordion-wrapper">
                        <ul className="hidden-accordion">
                            <li className="hidden-accordion-item">
                                <a href="./tasks-archive.html" className="hidden-accordion-item-link">
                                    <img className="hidden-accordion-item-image" src={archiveIcon} alt="User Icon" />
                                    Archive
                                </a>
                            </li>
                            <li className="hidden-accordion-item">
                                <a href="./tasks-dashboard.html" className="hidden-accordion-item-link">
                                    <img
                                        className="hidden-accordion-item-image"
                                        src={favoriteIcon}
                                        alt="Favourite Icon"
                                    />
                                    My tasks
                                </a>
                            </li>
                            <li className="hidden-accordion-item">
                                <a href="./login.html" className="hidden-accordion-item-link">
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
