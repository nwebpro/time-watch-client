import React from 'react';
import useSetTitle from '../../../Hooks/useSetTitle';

const MyAllBuyers = () => {
    useSetTitle('My All Buyers')
    return (
        <div>
            <div className='w-full text-center h-[300px] lg:h-[500px] flex items-center justify-center text-4xl text-gray-300'>Coming Soon</div>
        </div>
    );
};

export default MyAllBuyers;