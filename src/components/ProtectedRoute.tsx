import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/auth.service';

export const ProtectedRoute = () => {
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};
