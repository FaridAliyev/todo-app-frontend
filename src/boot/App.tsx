import { NotificationsProvider } from 'context/NotificationsContext';
import { useEffect } from 'react';
import Routes from 'routes';
import smoothscroll from 'smoothscroll-polyfill';
import './App.css';

const App: React.FC = () => {
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return (
        <NotificationsProvider>
            <Routes />
        </NotificationsProvider>
    );
};

export default App;
