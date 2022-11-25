import React, { useContext } from 'react';
import { toast } from 'react-toastify'
import Button from '../../Components/Button/Button';
import SmallSpinner from '../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const ProductBookModal = ({ productData, setProductData }) => {
    const { user, loading, setLoading } = useContext(AuthContext)
    const {  name: productName, resalePrice, image } = productData

    const handleBooking = e => {
        e.preventDefault();
        const form = e.target
        const name = form.name.value
        const email = form.email.value
        const phone = form.phone.value
        const location = form.location.value

        const productBooking = {
            name,
            email,
            productName,
            price: resalePrice,
            phone,
            location,
            image
        }
        fetch(`${ process.env.REACT_APP_API_URL }/product/bookings`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productBooking)
        })
        .then(res => res.json())
        .then(data => {
            setProductData(null)
            if(data.success){
                toast.success(data.message, { autoClose: 400 })
                setLoading(false)
            }else {
                toast.error(data.message)
            }
        })
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Name: { productName }</h3>
                    <h3 className="text-lg font-bold">Price: { resalePrice }</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-10'>
                        <div className='mb-2'>
                            <input type="text" name="name" defaultValue={user?.displayName} disabled placeholder='Your Name' className="py-[15px] px-[19px] bg-[#E8F0FE] text-base placeholder-[#3A425666] text-theme-3rd leading-5 border rounded-lg focus:outline-none w-full" required />
                        </div>
                        <div className='mb-2'>
                            <input type="email" name="email" defaultValue={user?.email} disabled placeholder='Email Address' className="py-[15px] px-[19px] bg-[#E8F0FE] text-base placeholder-[#3A425666] text-theme-3rd leading-5 border rounded-lg focus:outline-none w-full" required />
                        </div>
                        <div className='mb-2'>
                            <input type="text" name="phone" placeholder='Phone Number' className="py-[15px] px-[19px] bg-white text-base placeholder-[#3A425666] text-theme-3rd leading-5 border rounded-lg focus:outline-none w-full" required />
                        </div>
                        <div className='mb-2'>
                            <input type="text" name="location" placeholder='Location' className="py-[15px] px-[19px] bg-white text-base placeholder-[#3A425666] text-theme-3rd leading-5 border rounded-lg focus:outline-none w-full" required />
                        </div>
                        <div className='text-center'>
                            <Button classes={'w-full block py-2'} btnText={loading ? <SmallSpinner /> : 'Submit' } />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ProductBookModal;