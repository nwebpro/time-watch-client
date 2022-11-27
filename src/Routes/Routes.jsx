import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../Layout/DashboardLayout'
import Frontend from '../Layout/Frontend'
import AddCategory from '../Pages/Dashboard/AddCategory/AddCategory'
import AddProduct from '../Pages/Dashboard/AddProduct/AddProduct'
import AllSellers from '../Pages/Dashboard/Admin/AllSellers/AllSellers'
import AllCategory from '../Pages/Dashboard/AllCategory/AllCategory'
import Dashboard from '../Pages/Dashboard/Dashboard/Dashboard'
import MyProduct from '../Pages/Dashboard/MyProduct/MyProduct'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import Home from '../Pages/Home/Home/Home'
import Login from '../Pages/Login/Login'
import Products from '../Pages/Products/Products'
import Register from '../Pages/Register/Register'
import AdminRoute from './AdminRoute'
import PrivateRoute from './PrivateRoute'
import ReportedItems from '../Pages/Dashboard/Admin/ReportedItems/ReportedItems'
import AllBuyersList from '../Pages/Dashboard/Admin/AllBuyersList/AllBuyersList'
import Category from '../Pages/Home/Categories/Category'
import MyOrder from '../Pages/Dashboard/Buyer/MyOrder/MyOrder'
import Payment from '../Pages/Dashboard/Payment/Payment'
import MyAllBuyers from '../Pages/Dashboard/MyAllBuyers/MyAllBuyers'
import ContactUs from '../Pages/ContactUs/ContactUs'
import Blog from '../Pages/Blog/Blog'

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
                element: (
                    <PrivateRoute>
                        <Products />
                    </PrivateRoute>
                )
            },
            {
                path: '/category/:categoryId',
                loader: ({ params }) => fetch(`${ process.env.REACT_APP_API_URL }/products/${ params.categoryId }`, {
                    headers: {
                        authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`
                    }
                }),
                element: (
                    <PrivateRoute>
                        <Category />
                    </PrivateRoute>
                )
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/contact-us',
                element: <ContactUs />
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
                path: '/dashboard/my-buyers',
                element: <MyAllBuyers />
            },
            {
                path: '/dashboard/add/product',
                element: <AddProduct />
            },
            {
                path: '/dashboard/my-product',
                element: <MyProduct />
            },
            {
                path: '/dashboard/add/category',
                element: <AddCategory />
            },
            {
                path: '/dashboard/all-category',
                element: <AllCategory />
            },
            {
                path: '/dashboard/my-orders',
                element: <MyOrder />
            },
            {
                path: '/dashboard/all-sellers',
                element: ( 
                    <AdminRoute>
                        <AllSellers />
                    </AdminRoute>
                )
            },
            {
                path: '/dashboard/payment/:orderId',
                loader: ({ params }) => fetch(`${ process.env.REACT_APP_API_URL }/orders/${ params.orderId }`, {
                    headers: {
                        authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`
                    }
                }),
                element: <Payment />
            },
            {
                path: '/dashboard/all-buyers',
                element: ( 
                    <AdminRoute>
                        <AllBuyersList />
                    </AdminRoute>
                )
            },
            {
                path: '/dashboard/reported-items',
                element: ( 
                    <AdminRoute>
                        <ReportedItems />
                    </AdminRoute>
                )
            }
        ]
    }
])