import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import Button from '../../Components/Button/Button';
import SmallSpinner from '../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const ReportProductModal = ({ reportProduct, setReportProduct }) => {
    const { user, loading, setLoading } = useContext(AuthContext)
    const {  _id, name, image } = reportProduct

    const handleReportProduct = e => {
        e.preventDefault();
        const form = e.target
        const message = form.reportMessage.value
        const reportProductData = {
            message,
            productId: _id,
            productName: name,
            image,
            userName: user?.displayName,
            userEmail: user?.email
        }
        
        fetch(`${ process.env.REACT_APP_API_URL }/reports`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`
            },
            body: JSON.stringify(reportProductData)
        })
        .then(res => res.json())
        .then(data => {
            setReportProduct(null)
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
            <input type="checkbox" id="reportProduct-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="reportProduct-modal" className="bg-theme-primary text-white cursor-pointer rounded-full w-8 h-8 flex items-center justify-center text-xl absolute right-2 top-2">✕</label>
                    <form onSubmit={handleReportProduct} className='grid grid-cols-1 gap-3 mt-10'>
                        <p className='text-center text-base text-theme-body'>Write in detail why you want to report this product!</p>
                        <div className='mb-2'>
                            <textarea name="reportMessage" className="py-[15px] px-[19px] bg-white text-base placeholder-[#3A425666] text-theme-3rd leading-5 border rounded-lg focus:outline-none w-full" required  rows="5" placeholder='Write in detail why you want to report this product!'></textarea>
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

export default ReportProductModal;