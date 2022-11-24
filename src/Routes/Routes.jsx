import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../Layout/DashboardLayout'
import Frontend from '../Layout/Frontend'
import AddProduct from '../Pages/Dashboard/AddProduct/AddProduct'
import Dashboard from '../Pages/Dashboard/Dashboard/Dashboard'
import MyProduct from '../Pages/Dashboard/MyProduct/MyProduct'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import Home from '../Pages/Home/Home/Home'
import Login from '../Pages/Login/Login'
import Products from '../Pages/Products/Products'
import Register from '../Pages/Register/Register'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Frontend />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/add/product',
                element: <AddProduct />
            },
            {
                path: '/dashboard/my-product',
                element: <MyProduct />
            }
        ]
    }
])