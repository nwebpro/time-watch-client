import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const WelcomeMessage = () => {
    const { user } = useContext(AuthContext)
    return (
        <section className='bg-theme-secondary py-5 px-5 rounded'>
            <h3 className='text-2xl md:text-3xl font-bold mb-1'>Welcome, { user?.displayName }. 👋</h3>
            <p className='text-base text-theme-body'>Here is what’s happening with your product.</p>
        </section>
    );
};

export default WelcomeMessage;