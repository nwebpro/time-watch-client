import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { SlUser } from 'react-icons/sl'
import { CiLogin } from 'react-icons/ci'
import logo from '../../../assets/image/logo.png'
import { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider'
import { toast } from 'react-toastify'

const menuItems = [
    {
        path: 'home',
        title: 'Home'
    },
    {
        path: 'products',
        title: 'Products'
    },
    {
        path: 'blog',
        title: 'Blog'
    },
    {
        path: 'contact-us',
        title: 'Contact Us'
    }
]

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
        <header className='py-5'>
            <div className="px-4 mx-auto container">
                <div className="relative flex items-center justify-between">
                    <Link
                        to="/"
                        aria-label="Time"
                        title="Time"
                        className="inline-flex items-center"
                    >
                        <img src={ logo } alt="" />
                    </Link>
                    <ul className="items-center hidden space-x-8 lg:flex">
                        {
                            user?.uid &&
                            <li>
                                <Link 
                                    to='/dashboard'
                                    aria-label='Dashboard'
                                    title='Dashboard'
                                    className='text-base tracking-wide text-theme-text hover:text-theme-primary'
                                >
                                    Dashboard
                                </Link>
                            </li>
                        }
                        {
                            menuItems.map(item => (
                                <li key={item.path}>
                                    <NavLink
                                        to={ item.path }
                                        aria-label={ item.title }
                                        title={ item.title }
                                        className={({ isActive }) =>
                                            isActive
                                            ? 'text-base tracking-wide text-theme-primary transition-colors duration-200'
                                            : 'text-base tracking-wide text-theme-text hover:text-theme-primary'
                                        }
                                    >
                                        { item.title }
                                    </NavLink>
                                </li>
                            ))
                        }
                        {
                            user?.uid ?
                            <li>
                                <Link to='/login' onClick={handleUserLogout} className='flex gap-2 items-center text-base text-theme-text hover:text-theme-primary transition-colors duration-200'>
                                    <CiLogin /> <span>Logout</span>
                                </Link>
                            </li>
                            :
                            <li>
                                <Link to='/login' className='flex gap-2 items-center text-base text-theme-text hover:text-theme-primary transition-colors duration-200'>
                                    <SlUser /> <span>Login or Register</span>
                                </Link>
                            </li>
                        }
                    </ul>
                    <div className="lg:hidden">
                        <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className="w-5 text-theme-primary" viewBox="0 0 24 24">
                                <path
                                fill="currentColor"
                                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                />
                                <path
                                fill="currentColor"
                                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                                />
                                <path
                                fill="currentColor"
                                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                                />
                            </svg>
                        </button>
                        {isMenuOpen && (
                        <div className="absolute top-0 left-0 w-full bg-theme-secondary z-50">
                            <div className="p-5 bg-white rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <Link
                                            to="/"
                                            aria-label="Time"
                                            title="Time"
                                            className="inline-flex items-center"
                                        > 
                                            <img src={ logo } alt="" />
                                        </Link>
                                    </div>
                                    <div>
                                        <button
                                            aria-label="Close Menu"
                                            title="Close Menu"
                                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded text-theme-primary hover:text-theme-primary focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className="w-5 text-themeWhite" viewBox="0 0 24 24">
                                            <path
                                                fill="currentColor"
                                                d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                            />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul className="space-y-4">
                                        {
                                            user?.uid &&
                                            <li>
                                                <Link 
                                                    to='/dashboard'
                                                    aria-label='Dashboard'
                                                    title='Dashboard'
                                                    className='text-base tracking-wide text-theme-text hover:text-theme-primary'
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        }
                                        {
                                            menuItems.map(item => (
                                                <li key={item.path}>
                                                    <NavLink
                                                        to={ item.path }
                                                        aria-label={ item.title }
                                                        title={ item.title }
                                                        className={({ isActive }) =>
                                                            isActive
                                                            ? 'text-base tracking-wide text-theme-primary transition-colors duration-200'
                                                            : 'text-base tracking-wide text-theme-text hover:text-theme-primary'
                                                        }
                                                    >
                                                        { item.title }
                                                    </NavLink>
                                                </li>
                                            ))
                                        }
                                        {
                                            user?.uid ?
                                            <li>
                                                <Link to='/login' onClick={handleUserLogout} className='flex gap-2 items-center text-base text-theme-text hover:text-theme-primary transition-colors duration-200'>
                                                    <CiLogin /> <span>Logout</span>
                                                </Link>
                                            </li>
                                            :
                                            <li>
                                                <Link to='/login' className='flex gap-2 items-center text-base text-theme-text hover:text-theme-primary transition-colors duration-200'>
                                                    <SlUser /> <span>Login or Register</span>
                                                </Link>
                                            </li>
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header