import React from 'react';
import hero from '../../../assets/image/hero.jpg'
import { Link } from 'react-router-dom'
import Button from '../../../Components/Button/Button';

const Advertisement = () => {
    return (
        <div>
            <img src={ hero } alt="" />
            <div className='bg-white p-5'>
                <h3 className='text-theme-text font-poppins font-semibold text-lg leading-4 mb-2'>Skin Care Treatment</h3>
                <p className='text-sm text-theme-body mb-2'>Mohammadpur</p>
                <div className='flex'>
                    <p className='text-theme-primary text-lg leading-4 font-medium mb-2'>$250</p>
                    <p className='text-theme-text line-through text-xs leading-4 font-medium mb-2'>$350</p>
                </div>
                <p>Uses: 1 Years</p>
                <div className='flex justify-between items-center'>
                    <div>
                        <h2>Ab Naeem</h2>
                    </div>
                    <Link to='/'>
                        <Button btnText={'Book Now'} classes={'py-1 px-3'} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Advertisement;