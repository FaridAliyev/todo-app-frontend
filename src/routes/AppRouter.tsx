import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('views/home'));
const AppLayout = lazy(() => import('views/layout/app'));
const SignInPage = lazy(() => import('views/auth/sign-in'));
const SignUpPage = lazy(() => import('views/auth/sign-up'));
const ForgotPasswordPage = lazy(() => import('views/auth/forgot-password'));
const TasksDashboardPage = lazy(() => import('views/tasks'));
const TasksCreatePage = lazy(() => import('views/tasks/create'));
const TasksArchivedPage = lazy(() => import('views/tasks/archived-tasks'));

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/tasks/dashboard" element={<TasksDashboardPage />} />
                <Route path="/tasks/create" element={<TasksCreatePage />} />
                <Route path="/tasks/archived" element={<TasksArchivedPage />} />

                {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/reset-password" element={<ForgotPasswordPage />} />
        </Routes>
    );
};
export default AppRouter;
