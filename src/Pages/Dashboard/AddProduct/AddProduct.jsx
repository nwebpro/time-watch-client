import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../Components/Button/Button';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import useSetTitle from '../../../Hooks/useSetTitle';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const AddProduct = () => {
    useSetTitle('Add Product')
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm();
    const imageUploadApiKey = process.env.REACT_APP_IMGBB_API_KEY
    
    const { data:category = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/category`, {
                headers: {
                    authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`
                }
            })
            const data = await res.json()
            return data
        }
    })
    
    const allCategory = category.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    const handleAddProduct = data => {
        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${ imageUploadApiKey }`
        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success) {
                const addProduct = {
                    name: data.name,
                    location: data.location,
                    categoryId: data.catName,
                    image: imgData.data.url,
                    quality: data.quality,
                    resalePrice: parseFloat(data.resalePrice),
                    originalPrice: parseFloat(data.originalPrice),
                    yearOfUses: data.yearOfUses,
                    phone: data.phone,
                    description: data.description,
                    date: new Date(),
                    userName: user?.displayName,
                    userEmail: user?.email,
                    userImage: user?.photoURL
                }

                // Save doctor information to tha database
                fetch(`${ process.env.REACT_APP_API_URL }/products`, {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`,
                    },
                    body: JSON.stringify(addProduct)
                })
                .then(res => res.json())
                .then(data => {
                    toast.success(data.message, { autoClose: 400 })
                    navigate('/dashboard/my-product')
                })
            }
        })
    }

    return (
        <section className='max-w-3xl mx-auto bg-white px-8 py-10 rounded-lg'>
            <form onSubmit={ handleSubmit(handleAddProduct) }>
                <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Product Name</label>
                    <input type="text" {...register("name", { required: true })} placeholder="Product name" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    {errors.name && <p className='text-red-600 text-xs text-left' role="alert">{errors.name?.message}</p>}
                </div>
                <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Location</label>
                    <input type="text" {...register("location", {required: true})} placeholder="Location" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    {errors.location && <p className='text-red-600 text-xs text-left' role="alert">{errors.location?.message}</p>}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className="mb-6">
                        <label  className="block text-sm font-medium text-theme-text mb-1">Product Category</label>
                        <select className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" {...register("catName", {required: true})} >
                            {
                                allCategory.map(category => (
                                    <option key={category._id} value={ category._id }>{ category.name }</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-6" >
                        <label  className="block text-sm font-medium text-theme-text mb-1">Product Quality</label>
                        <select className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" {...register("quality", {required: true})}>
                            <option value='excellent'>Excellent</option>
                            <option value='good'>Good</option>
                            <option value='fair'>Fair</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                    <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Resale Price</label>
                        <input type="text" {...register("resalePrice", {required: true})} placeholder="Resale Price" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                        {errors.resalePrice && <p className='text-red-600 text-xs text-left' role="alert">{errors.resalePrice?.message}</p>}
                    </div>
                    <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Original Price</label>
                        <input type="text" {...register("originalPrice", {required: true})} placeholder="Orginal Price" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                        {errors.originalPrice && <p className='text-red-600 text-xs text-left' role="alert">{errors.originalPrice?.message}</p>}
                    </div>
                    <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Year of Uses</label>
                        <input type="text" {...register("yearOfUses", {required: true})} placeholder="Year of uses" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                        {errors.yearOfUses && <p className='text-red-600 text-xs text-left' role="alert">{errors.yearOfUses?.message}</p>}
                    </div>
                </div>
                <div className="mb-6">
                    <label  className="block text-sm font-medium text-theme-text mb-1">Phone</label>
                    <input type="text" {...register("phone", {required: true})} placeholder="Phone" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                    {errors.phone && <p className='text-red-600 text-xs text-left' role="alert">{errors.phone?.message}</p>}
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
                    <Button classes={'py-3 px-5'} btnText={'Add Product'} />
                </div>
            </form>
        </section>
    );
};

export default AddProduct;