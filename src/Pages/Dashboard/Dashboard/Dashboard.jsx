import React from 'react';
import useSetTitle from '../../../Hooks/useSetTitle';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';

const Dashboard = () => {
    useSetTitle('Dashboard')
    return (
        <main className='pt-10 px-10 lg:px-20'>
            <WelcomeMessage />
        </main>
    );
};

export default Dashboard;