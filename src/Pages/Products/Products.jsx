import axios from 'axios'
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useSetTitle from '../../Hooks/useSetTitle';
import LoadingSpinner from '../../Pages/Shared/LoadingSpinner/LoadingSpinner'
import Product from './Product';
import ProductBookModal from './ProductBookModal';
import ReportProductModal from './ReportProductModal';

const Products = () => {
    useSetTitle('Products')
    const [productData, setProductData] = useState(null)
    const [reportProduct, setReportProduct] = useState([])
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        axios.get(`${ process.env.REACT_APP_API_URL }/all-products`, {
            headers: {
                authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`
            }
        })
            .then(res => {
                setAllProducts(res.data.data)
            })
    }, [])
    
    return (
        <section className='bg-theme-secondary px-4 md:px-0 py-20'>
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        allProducts.length === 0 ?
                        <div className='col-span-1 md:col-span-2 lg:col-span-3'>
                            <div className='flex justify-center'>
                                <LoadingSpinner />
                            </div>
                        </div>
                        :
                        allProducts?.map(product => (
                            <Product 
                                key={ product._id } 
                                product={ product } 
                                setProductData={setProductData}
                                setReportProduct={setReportProduct}
                            />
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
            {
                reportProduct &&
                <ReportProductModal 
                    reportProduct={reportProduct}
                    setReportProduct={setReportProduct}
                />
            }
        </section>
    );
};

export default Products;