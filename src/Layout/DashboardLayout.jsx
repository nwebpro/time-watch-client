import React, { useContext } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import { MdDashboard } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { FiFile } from 'react-icons/fi'
import { FiLogOut } from 'react-icons/fi'
import { toast } from 'react-toastify';
import DashboardTopHeader from '../Pages/Dashboard/DashboardTopHeader/DashboardTopHeader';
import useAdmin from '../Hooks/useAdmin';
import useSeller from '../Hooks/useSeller';

const DashboardLayout = () => {
    const { user, userLogout } = useContext(AuthContext)
    const [isAdmin] = useAdmin(user?.email)
    const [isSeller] = useSeller(user?.email)
    const navigate = useNavigate()

    const handleUserLogout = () => {
        userLogout()
        .then(() => {
            navigate('/')
            toast.warning('User Logout Successfully!', { autoClose: 400 })
        })
        .catch(error => {
            toast.error(error.message, { autoClose: 400 })
        })
    }
    return (
        <>
            <div className='drawer drawer-mobile'>
                <input id="dashboardDrawer" type="checkbox" className="drawer-toggle" />
                <div className={`drawer-content bg-gray-200 overflow-hidden`}>
                    <DashboardTopHeader />
                    <ScrollRestoration />
                    <div className='py-10 px-10 lg:px-20'>
                        <Outlet />
                    </div>
                </div>

                <div className={`drawer-side`}>
                    <label htmlFor="dashboardDrawer" className="drawer-overlay"></label> 
                    <div className={`menu w-72 text-base-content bg-[#111827] h-screen flex flex-col justify-between duration-300`}>
                        <div className={`flex flex-col items-center mt-6 border-b border-theme-body pb-5 duration-300`}>
                            <img className="object-cover w-16 h-16 mx-2 rounded-full" src={ user?.photoURL } alt="avatar" />
                            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 flex gap-1 items-center">{ user?.displayName }
                            {/* <div className="tooltip" data-tip="Unverified">
                                <MdVerified className='text-gray-400' />
                            </div> */}
                            {/* <UserVerified /> */}
                            </h4>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-400">{ user?.email }</p>
                        </div>

                        <div className={`flex flex-col justify-between flex-1 mt-6`}>
                            <nav>
                                <ul>
                                    <li>
                                        <Link 
                                            to="/home"
                                            className='flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                        >
                                            <AiFillHome className='text-xl' />
                                            <span>Home</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/dashboard"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <MdDashboard className='text-xl' />
                                            <span>Dashboard</span>
                                        </NavLink>
                                    </li>
                                    {
                                        isAdmin && 
                                        <>
                                            <li>
                                                <NavLink 
                                                    to="/dashboard/all-sellers"
                                                    className={({ isActive }) =>
                                                    isActive
                                                        ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                        : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                                    }
                                                >
                                                    <MdDashboard className='text-xl' />
                                                    <span>All Seller</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    to="/dashboard/all-buyers"
                                                    className={({ isActive }) =>
                                                    isActive
                                                        ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                        : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                                    }
                                                >
                                                    <MdDashboard className='text-xl' />
                                                    <span>All Buyer</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    to="/dashboard/reported-items"
                                                    className={({ isActive }) =>
                                                    isActive
                                                        ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                        : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                                    }
                                                >
                                                    <MdDashboard className='text-xl' />
                                                    <span>Reported Items</span>
                                                </NavLink>
                                            </li>
                                        </>
                                    }
                                    {
                                        isSeller &&
                                        <>
                                            <li>
                                                <NavLink 
                                                    to="/my-buyer"
                                                    className={({ isActive }) =>
                                                    isActive
                                                        ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                        : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                                    }
                                                >
                                                    <MdDashboard className='text-xl' />
                                                    <span>My Buyer</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    to="/dashboard/my-product"
                                                    className={({ isActive }) =>
                                                    isActive
                                                        ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                        : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                                    }
                                                >
                                                    <FiFile className='text-xl' />
                                                    <span>My Products</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    to="/dashboard/add/product"
                                                    className={({ isActive }) =>
                                                    isActive
                                                        ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                        : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                                    }
                                                >
                                                    <FiFile className='text-xl' />
                                                    <span>Add Product</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    to="/dashboard/all-category"
                                                    className={({ isActive }) =>
                                                    isActive
                                                        ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                        : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                                    }
                                                >
                                                    <FiFile className='text-xl' />
                                                    <span>All Category</span>
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink 
                                                    to="/dashboard/add/category"
                                                    className={({ isActive }) =>
                                                    isActive
                                                        ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                        : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                                    }
                                                >
                                                    <FiFile className='text-xl' />
                                                    <span>Add Category</span>
                                                </NavLink>
                                            </li> 
                                        </>
                                    }
                                    {
                                        !isAdmin && !isSeller &&
                                        <li>
                                        <NavLink 
                                            to="/dashboard/add/category"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <FiFile className='text-xl' />
                                            <span>My Order</span>
                                        </NavLink>
                                    </li>
                                    }
                                    
                                </ul>
                            </nav>
                        </div>
                        <div className={`border-t border-theme-body`}>
                            <button onClick={handleUserLogout}
                                className='flex w-full items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                            >
                                <FiLogOut className='text-xl' />
                                <span className="ml-3">Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default DashboardLayout;