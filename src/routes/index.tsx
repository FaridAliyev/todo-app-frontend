import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter';

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<></>}>
                <AppRouter />
            </Suspense>
        </BrowserRouter>
    );
};

export default Routes;
