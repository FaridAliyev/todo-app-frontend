import { AuthProvider } from 'context/auth/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const Setup: React.FC = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </QueryClientProvider>
    );
};

export default Setup;
