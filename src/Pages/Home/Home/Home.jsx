import React from 'react';
import useSetTitle from '../../../Hooks/useSetTitle';
import Advertisements from '../Advertisements/Advertisements';
import BuyerProtection from '../BuyerProtection/BuyerProtection';
import Categories from '../Categories/Categories';
import Hero from '../Hero/Hero';
import LeadingMarketplace from '../LeadingMarketplace/LeadingMarketplace';

const Home = () => {
    useSetTitle('Home')
    return (
        <>
            <Hero />
            <Advertisements />
            <Categories />
            <LeadingMarketplace />
            <BuyerProtection />
        </>
    );
};

export default Home;