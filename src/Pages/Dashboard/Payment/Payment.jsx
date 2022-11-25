import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

const Payment = () => {
    const orderData = useLoaderData()
    const { price, productName } = orderData.data
    return (
        <section className='flex items-center h-96'>
            <div className='w-full md:w-[500px] mx-auto bg-white py-10 px-8 rounded-lg'>
                <h2 className='text-center mb-3 font-bold text-2xl'>Payment for { productName }</h2>
                <p className='text-center text-base text-theme-3rd'>Please pay <span className='font-bold'>${price}</span> for your order</p>
                <div className='mt-[30px]'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm orderData={ orderData } />
                    </Elements>
                </div>
            </div>
        </section>
    );
};

export default Payment;