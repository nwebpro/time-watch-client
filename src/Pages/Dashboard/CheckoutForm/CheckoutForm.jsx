import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../../Components/Button/Button';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';

const CheckoutForm = ({ orderData }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    
    const { _id, name, email, price } = orderData.data

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`${ process.env.REACT_APP_API_URL }/create-payment-intent`, {
            method: "POST",
            headers: { 
                "content-type": "application/json"
            },
            body: JSON.stringify({ price }),
        })
        .then(res => res.json())
        .then(data => setClientSecret(data.clientSecret))
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log(error)
            setCardError(error.message)
        } else {
            setCardError('')
        }
        setLoading(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment( clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    }
                }
            }
        )
        if (confirmError) {
            setCardError(error.message)
            return
        }

        // Store payment info in database
        const payment = {
            price,
            transactionId: paymentIntent.id,
            email,
            orderId: _id
        }

        if(paymentIntent.status === "succeeded"){
            fetch(`${ process.env.REACT_APP_API_URL }/payments`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    toast.success(`Congrats! your payment completed`, { autoClose: 500 })
                    navigate('/dashboard/my-orders')
                }
            })
        }
        setLoading(false)


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    className='border py-4 px-5 rounded'
                    options={{
                        style: {
                            base: {
                            fontSize: '16px',
                            color: '#3A4256',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                            },
                            invalid: {
                            color: '#9e2146',
                            },
                        },
                    }}
                />
                <div className='mt-5'>
                    <Button btnText={loading ? <SmallSpinner /> : 'Pay' } type="submit" classes={'w-full md:text-lg py-2'} disabled={!stripe || !clientSecret} />
                </div>
            </form>
            <p className="text-center text-red-600 mt-5">{ cardError }</p>
        </>
    );
};

export default CheckoutForm;