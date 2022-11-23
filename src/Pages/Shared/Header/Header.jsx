import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '../../../Components/Button/Button';

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
        path: 'contact-us',
        title: 'Contact Us'
    }
]

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className='py-3'>
            <div className="px-4 mx-auto container">
                <div className="relative flex items-center justify-between">
                    <Link
                        to="/"
                        aria-label="Jerin's Parlour"
                        title="Jerin's Parlour"
                        className="inline-flex items-center"
                    >
                        Watch
                    </Link>
                    <ul className="items-center hidden space-x-8 lg:flex">
                        {
                            menuItems.map(item => (
                                <li key={item.path}>
                                    <NavLink
                                        to={ item.path }
                                        aria-label={ item.title }
                                        title={ item.title }
                                        className={({ isActive }) =>
                                            isActive
                                            ? 'text-sm font-semibold tracking-wide text-[#474747]'
                                            : 'text-sm font-normal tracking-wide text-[#474747]'
                                        }
                                    >
                                        { item.title }
                                    </NavLink>
                                </li>
                            ))
                        }
                        <li>
                            <Link to='/login'>
                                <Button btnText={'Login'} classes={'py-3 px-[46px]'} />
                            </Link>
                        </li>
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
                        <div className="absolute top-0 left-0 w-full bg-theme-secondary">
                            <div className="p-5 bg-white rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <Link
                                            to="/"
                                            aria-label="Jerin's Parlour"
                                            title="Jerin's Parlour"
                                            className="inline-flex items-center"
                                        >
                                            Watch
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
                                            menuItems.map(item => (
                                                <li key={item.path}>
                                                    <NavLink
                                                        to={ item.path }
                                                        aria-label={ item.title }
                                                        title={ item.title }
                                                        className={({ isActive }) =>
                                                            isActive
                                                            ? 'text-sm font-semibold tracking-wide text-[#474747]'
                                                            : 'text-sm font-normal tracking-wide text-[#474747]'
                                                        }
                                                    >
                                                        { item.title }
                                                    </NavLink>
                                                </li>
                                            ))
                                        }
                                        <li>
                                            <Link to='/login'>
                                                <Button btnText={'Login'} classes={'py-3 px-[46px]'} />
                                            </Link>
                                        </li>
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