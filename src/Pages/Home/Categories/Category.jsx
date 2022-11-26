import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from '../../Products/Product';
import ProductBookModal from '../../Products/ProductBookModal';

const Category = () => {
    const [productData, setProductData] = useState(null)
    const categoriesData = useLoaderData()
    return (
        <section className='bg-theme-secondary px-4 md:px-0 py-20'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        categoriesData?.data?.map(product => (
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

export default Category;