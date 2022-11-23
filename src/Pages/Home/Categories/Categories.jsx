import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    return (
        <section className='px-4 md:px-0 py-20'>
            <div className='container mx-auto'>
                <h2 className="text-center font-poppins text-theme-text font-bold text-4xl leading-10 mb-[72px]">Our Popular Brands</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
                    {
                        [...Array(6)].map((_, i) => (
                            <div key={i} className='text-center bg-theme-secondary rounded py-5 hover:bg-theme-primary hover:text-white transition duration-200 cursor-pointer'>
                                <Link to='/' className='font-bold text-xl leading-8'>
                                    Rolex
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Categories;