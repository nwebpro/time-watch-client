import React from 'react';
import hero from '../../../assets/image/hero.jpg'
import Button from '../../../Components/Button/Button'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section className='container mx-auto pt-10 pb-20 px-4 md:px-0'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
                <div>
                    <h3 className='text-4xl font-bold leading-10 mb-5'>Find your dream watch on the leading marketplace for luxury watches.</h3>
                    <p className='text-base text-theme-body leading-7 mb-5'>Globally streamline fully researched total linkage for wireless materials. Quickly myocardinate market positioning ideas after maintainable models. Distinctively exploit.</p>
                    <Link to='/products'>
                        <Button btnText={'Buy Now'} classes={'py-2 px-5'} />
                    </Link>
                </div>
                <div>
                    <img src={ hero } alt="" />
                </div>
            </div>
        </section>
    );
};

export default Hero;