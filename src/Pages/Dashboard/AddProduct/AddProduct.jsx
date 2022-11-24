import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Components/Button/Button';
import SmallSpinner from '../../../Components/Spinner/SmallSpinner';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import useSetTitle from '../../../Hooks/useSetTitle';

const AddProduct = () => {
    useSetTitle('Add Product')
    const { user, loading, setLoading } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const handleAddProduct = data => {
        console.log(data)
    }
    return (
        <section className='max-w-3xl mx-auto bg-white px-8 py-10 rounded-lg'>
            <form onSubmit={ handleSubmit(handleAddProduct) }>
                <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Product Name</label>
                    <input type="text" {...register("name", { required: true, minLength: { value: 4, message: 'Name must be 4 character or longer' } })} placeholder="Product name" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    {errors.name && <p className='text-red-600 text-xs text-left' role="alert">{errors.name?.message}</p>}
                </div>
                <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Location</label>
                    <input type="text" {...register("location", {required: true})} placeholder="Location" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    {errors.email && <p className='text-red-600 text-xs text-left' role="alert">{errors.email?.message}</p>}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className="mb-6" {...register("catName", {required: true})}>
                        <label  className="block text-sm font-medium text-theme-text mb-1">Product Category</label>
                        <select className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" >
                            <option defaultValue='rolex'>Rolex</option>
                            <option defaultValue='omega'>Omega</option>
                            <option defaultValue='tudor'>Tudor</option>
                        </select>
                    </div>
                    <div className="mb-6" {...register("quality", {required: true})}>
                        <label  className="block text-sm font-medium text-theme-text mb-1">Product Quality</label>
                        <select className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" >
                            <option defaultValue='excellent'>Excellent</option>
                            <option defaultValue='good'>Good</option>
                            <option defaultValue='fair'>Fair</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                    <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Resale Price</label>
                        <input type="text" {...register("resalePrice", {required: true})} placeholder="Resale Price" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                        {errors.email && <p className='text-red-600 text-xs text-left' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Original Price</label>
                        <input type="text" {...register("originalPrice", {required: true})} placeholder="Orginal Price" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                        {errors.email && <p className='text-red-600 text-xs text-left' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Year of Uses</label>
                        <input type="text" {...register("yearOfUses", {required: true})} placeholder="Year of uses" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                        {errors.email && <p className='text-red-600 text-xs text-left' role="alert">{errors.email?.message}</p>}
                    </div>
                </div>
                <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Phone</label>
                    <input type="text" {...register("phone", {required: true})} placeholder="Phone" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    {errors.email && <p className='text-red-600 text-xs text-left' role="alert">{errors.email?.message}</p>}
                </div>
                <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Product Image</label>
                    <input type="file" {...register("image", {required: true})} placeholder="image" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                </div>
                <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Product Description</label>
                    <textarea {...register("description", {required: true})} rows="8" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" placeholder="Product Description"></textarea>
                </div>
                <div className='flex justify-end'>
                    <Button classes={'py-3 px-5'} btnText={loading ? <SmallSpinner /> : 'Add Product' } />
                </div>
            </form>
        </section>
    );
};

export default AddProduct;