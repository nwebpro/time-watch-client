import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Product from '../../Products/Product';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const Advertisements = () => {
    const { data:result = [], isLoading} = useQuery({
        queryKey: ['result'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/makeAdvertise`)
            const data = await res.json()
            return data
        }
    })

    const advertisedList = result.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    return (
        <>
            {
                advertisedList?.length &&
                <section className='bg-theme-secondary px-4 md:px-0 py-20'>
                    <div className='container mx-auto'>
                        <h2 className="text-center font-poppins text-theme-text font-bold text-4xl leading-10 mb-[72px]">Advertisement Products</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {
                                advertisedList?.map(product => (
                                    <Product key={product._id} product={product} />
                                ))
                            }
                        </div>
                    </div>
                </section>
            }
        </>
    );
};

export default Advertisements;