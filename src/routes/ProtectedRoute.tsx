import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export const ProtectedRoute = () => {
    const { accessToken } = useAuth();

    if (!accessToken) {
        return <Navigate to='/signin'/>
    }

    return <Outlet />
}