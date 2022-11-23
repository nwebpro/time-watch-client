import React, { useContext } from 'react';
import { Link, NavLink, Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import { MdDashboard } from 'react-icons/md'
import { AiFillHome } from 'react-icons/ai'
import { FiFile } from 'react-icons/fi'
import { FiLogOut } from 'react-icons/fi'
import { toast } from 'react-toastify';
import DashboardTopHeader from '../Pages/Dashboard/DashboardTopHeader/DashboardTopHeader';
import { useState } from 'react';

const DashboardLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(true)
    const { user, userLogout } = useContext(AuthContext)
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
            <div className='grid grid-cols-1 lg:grid-cols-7'>
                    <div className={`${ openSidebar ? 'block' : 'hidden' } col-span-2 lg:col-span-1 bg-[#111827] h-screen flex flex-col justify-between`}>
                        <div className="flex flex-col items-center mt-6 -mx-2 border-b border-theme-body pb-5">
                            <img className="object-cover w-16 h-16 mx-2 rounded-full" src={ user?.photoURL } alt="avatar" />
                            <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">{ user?.displayName }</h4>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-400 hover:underline">{ user?.email }</p>
                        </div>

                        <div className="flex flex-col justify-between flex-1 mt-6">
                            <nav>
                                <ul>
                                    <li>
                                        <Link 
                                            to="/home"
                                            className='flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                        >
                                            <AiFillHome />
                                            <span className="mx-4">Home</span>
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
                                            <MdDashboard />
                                            <span className="mx-4">Dashboard</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/my-buyer"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <MdDashboard />
                                            <span className="mx-4">My Buyer</span>
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
                                            <FiFile />
                                            <span className="mx-4">My Products</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to="/dashboard/add-product"
                                            className={({ isActive }) =>
                                            isActive
                                                ? 'flex items-center py-3 px-5 text-base tracking-wide bg-[#1F2937] text-theme-secondary transition-colors duration-200'
                                                : 'flex items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                                            }
                                        >
                                            <FiFile />
                                            <span className="mx-4">Add Product</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className='border-t border-theme-body'>
                            <button onClick={handleUserLogout}
                                className='flex w-full items-center py-3 px-5 text-base tracking-wide text-gray-400 hover:text-gray-200 transition hover:bg-gray-800'
                            >
                                <FiLogOut />
                                <span className="mx-4">Logout</span>
                            </button>
                        </div>
                    </div>
                
                <div className={`${openSidebar ? 'col-span-6' : 'col-span-full'} bg-gray-200`}>
                    <DashboardTopHeader setOpenSidebar={ setOpenSidebar } openSidebar={ openSidebar } />
                    <ScrollRestoration />
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;