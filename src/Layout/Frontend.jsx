import React from 'react';
import Header from '../Pages/Shared/Header/Header';
import { ScrollRestoration, Outlet  } from 'react-router-dom'
import Footer from '../Pages/Shared/Footer/Footer';

const Frontend = () => {
    return (
        <>
            <Header />
            <ScrollRestoration />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Frontend;