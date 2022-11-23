import React from 'react';
import useSetTitle from '../../../Hooks/useSetTitle';
import Advertisements from '../Advertisements/Advertisements';
import Hero from '../Hero/Hero';

const Home = () => {
    useSetTitle('Home')
    return (
        <>
            <Hero />
            <Advertisements />
        </>
    );
};

export default Home;