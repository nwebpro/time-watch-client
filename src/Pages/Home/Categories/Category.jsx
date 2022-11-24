import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Category = () => {
    const categoriesData = useLoaderData()
    console.log(categoriesData);
    return (
        <div>
            
        </div>
    );
};

export default Category;