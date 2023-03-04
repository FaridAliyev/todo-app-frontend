import { Navigate } from 'react-router-dom';
import { useAuth } from 'context/auth/store';
import { ReactNode } from 'react';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [{ isLoggedIn }] = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/sign-in" replace />;
    }
    return <>{children}</>;
};

export default PrivateRoute;
