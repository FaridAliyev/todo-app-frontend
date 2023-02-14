import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('views/home'));

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<HomePage />} />
                {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
        </Routes>
    );
};
export default AppRouter;
