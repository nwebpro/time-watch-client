import React from 'react';
import Advertisement from './Advertisement';

const Advertisements = () => {
    return (
        <section className='bg-theme-secondary px-4 md:px-0 py-20'>
            <div className='container mx-auto'>
                <h2 className="text-center font-poppins text-theme-text font-bold text-4xl leading-10 mb-[72px]">Advertisement Products</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        [...Array(3)].map((_, i) => (
                            <Advertisement key={ i } />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Advertisements;