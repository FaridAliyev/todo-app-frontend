import { useEffect } from 'react';
import Routes from 'routes';
import smoothscroll from 'smoothscroll-polyfill';
import './App.css';

const App: React.FC = () => {
    useEffect(() => {
        smoothscroll.polyfill();
    }, []);

    return <Routes />;
};

export default App;
