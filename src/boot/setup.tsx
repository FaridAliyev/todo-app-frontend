import { AuthProvider } from 'context/auth/store';
import App from './App';

const Setup: React.FC = () => {
    return (
        <AuthProvider>
            <App />
        </AuthProvider>
    );
};

export default Setup;
