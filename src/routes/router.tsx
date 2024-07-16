
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { AdminScreen } from '../screens/admin/admin';

export const routerConfig = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>404</div>

    },
    {
        path: "/admin",
        element: <AdminScreen />,
        errorElement: <div>404</div>
    }
]);