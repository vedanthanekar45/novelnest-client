import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { useAuth } from "../auth/useAuth"
import { ProtectedRoute } from "./ProtectedRoute"

const Routes = () => {
    const { accessToken } = useAuth();

    const routesForPublic = [
        {
            path: "/service",
            element: <div>Service Page</div>,
        },
        {
            path: "/about-us",
            element: <div>About Us</div>,
        },
    ];

  // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
            children: [
                {
                    path: "/",
                    element: <div>User Home Page</div>,
                },
                {
                    path: "/profile",
                    element: <div>User Profile</div>,
                },
                {
                    path: "/logout",
                    element: <div>Logout</div>,
                },
            ],
        },
    ];

    const router = createBrowserRouter([
        ...routesForPublic,
        ...routesForAuthenticatedOnly
    ]);

    return <RouterProvider router={router} />;
}

export default Routes;