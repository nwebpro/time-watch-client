import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useState } from 'react';
import useSetTitle from '../../Hooks/useSetTitle';
import LoadingSpinner from '../../Pages/Shared/LoadingSpinner/LoadingSpinner'
import Product from './Product';
import ProductBookModal from './ProductBookModal';

const Products = () => {
    useSetTitle('Products')
    const [productData, setProductData] = useState(null)
    const { data:products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/products`)
            const data = await res.json()
            return data
        }
    })
    const allProducts = products.data

    if(isLoading) {
        return <LoadingSpinner />
    }
    
    return (
        <section className='bg-theme-secondary px-4 md:px-0 py-20'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        allProducts?.map(product => (
                            <Product key={ product._id } product={ product } setProductData={setProductData} />
                        ))
                    }
                </div>
            </div>
            {
                productData &&
                <ProductBookModal 
                    productData={productData}
                    setProductData={setProductData}
                />
            }
        </section>
    );
};

export default Products;