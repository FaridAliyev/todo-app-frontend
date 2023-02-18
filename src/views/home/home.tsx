import { Link } from 'react-router-dom';
import landingBackground from 'assets/img/landing-background.svg';

export const Home: React.FC = () => {
    return (
        <main className="start-content">
            <div>
                <div className="start-content-row aic">
                    <div className="start-content-welcome-img-b">
                        <img src={landingBackground} className="start-content-welcome-img" alt="#" />
                    </div>
                    <div className="start-content-welcome-text-b text-right">
                        <h1 className="welcome-title">Welcome 👋</h1>
                        <p className="welcome-text">
                            ToDo app is a tool where you can plan and manage your activities by creating your to-do
                            lists, organizing them, and many more! Click on the button below to start your journey!
                        </p>
                        <Link to="/tasks/dashboard" className="btn btn-dark">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};
