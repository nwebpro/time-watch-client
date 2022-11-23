import { createBrowserRouter } from 'react-router-dom'
import Frontend from '../Layout/Frontend'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import Home from '../Pages/Home/Home/Home'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'

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
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ]
    }
])