import React from 'react';
import useSetTitle from '../../../Hooks/useSetTitle';
import WelcomeMessage from '../WelcomeMessage/WelcomeMessage';

const Dashboard = () => {
    useSetTitle('Dashboard')
    return (
        <main>
            <WelcomeMessage />
        </main>
    );
};

export default Dashboard;