import React from 'react';

const CategoryProducts = ({ product, setProductData }) => {
    const { image, name, userName, location, originalPrice, resalePrice } = product
    return (
        <div className='bg-white'>
            <img src={ image } className='mx-auto w-auto' alt="" />
            <div className='bg-white p-5'>
                <h3 className='text-theme-text font-poppins font-semibold text-lg leading-4 mb-2'>{ name }</h3>
                <p className='text-sm text-theme-body mb-2'>Location: { location }</p>
                <div>
                    <p className='text-theme-primary text-lg leading-4 font-medium mb-2'>Resale Price: ${ resalePrice }</p>
                    <p className='text-theme-text line-through text-xs leading-4 font-medium mb-2'>Original Price: ${ originalPrice }</p>
                </div>
                <p>Uses: 1 Years</p>
                <div className='flex justify-between items-center'>
                    <div>
                        <h2>{ userName }</h2>
                    </div>
                    <label
                        htmlFor="booking-modal"
                        className="bg-theme-primary py-2 px-5 cursor-pointer rounded text-white"
                        onClick={() => setProductData(product)}
                    >
                        Book Now
                    </label>
                </div>
            </div>
        </div>
    );
};

export default CategoryProducts;