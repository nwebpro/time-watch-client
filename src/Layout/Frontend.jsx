import React from 'react';
import Header from '../Pages/Shared/Header/Header';
import { ScrollRestoration, Outlet  } from 'react-router-dom'

const Frontend = () => {
    return (
        <>
            <Header />
            <ScrollRestoration />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Frontend;