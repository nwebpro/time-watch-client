import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Button from '../../Components/Button/Button'
import SmallSpinner from '../../Components/Spinner/SmallSpinner'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { toast } from 'react-toastify';
import useSetTitle from '../../Hooks/useSetTitle';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';


const Register = () => {
    useSetTitle('Register')
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUserInfo, loading, setLoading } = useContext(AuthContext)
    const [registerError, setRegisterError] = useState('')
    const navigate = useNavigate()
    const imageUploadApiKey = process.env.REACT_APP_IMGBB_API_KEY

    const handleUserRegister = data => {
        setRegisterError('')
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
            if(imgData.success){
                createUser(data.email, data.password)
                .then(result => {
                    handleUpdateUser(data.name, imgData.data.url)
                    saveUserInfo(data.name, data.email, data.role, imgData.data.url)
                    toast.success('User Create Successfully!', { autoClose: 400 })
                    navigate('/')
                })
                .catch(error => {
                    setRegisterError(error.message)
                })
            }
        })

        
    }

    // User update information 
    const handleUpdateUser = (name, photoURL) => {
        updateUserInfo({ displayName: name, photoURL: photoURL })
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                toast.error(error.message, { autoClose: 500 })
            })
    }
    
    // Save user info in database
    const saveUserInfo = (name, email, role, image) => {
        const user = {
            name,
            email,
            role,
            image
        }
        fetch(`${ process.env.REACT_APP_API_URL }/users`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {})
    }

    

    return (
        <>
            <section className="py-20 bg-theme-secondary">
                <div className="container mx-auto px-[21px]">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white shadow-box-shadow py-16 px-10 text-center sm:px-12 md:px-[60px]">
                                <div className="mb-10 text-center md:mb-16">
                                    <h2 className='text-4xl font-bold'>Sign Up</h2>
                                </div>
                                <form onSubmit={handleSubmit(handleUserRegister)}>
                                    <div className="mb-6">
                                        <input type="text" {...register("name", { required: true, minLength: { value: 4, message: 'Name must be 4 character or longer' } })} placeholder="Name" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                                        {errors.name && <p className='text-red-600 text-xs text-left' role="alert">{errors.name?.message}</p>}
                                    </div>
                                    <div className="mb-6">
                                        <input type="email" {...register("email", {required: true})} placeholder="Email" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                                        {errors.email && <p className='text-red-600 text-xs text-left' role="alert">{errors.email?.message}</p>}
                                    </div>
                                    <div className="mb-6">
                                        <select className="select select-bordered w-full" {...register("role", {required: true})} >
                                            <option value='buyer'>Buyer</option>
                                            <option value='seller'>Seller</option>
                                        </select>
                                    </div>
                                    <div className="mb-6">
                                        <input type="file" {...register("image", {required: true})} placeholder="image" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                                    </div>
                                    <div className="mb-6">
                                        <input type="password" {...register("password", { 
                                                required: true,  
                                                minLength: { value: 6, message: 'Password must be 6 character or longer!' },
                                                pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must be strong!' }
                                            })} placeholder="Password" className="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-theme-2nd focus-visible:shadow-none" />
                                        {errors.password && <p className='text-red-600 text-xs text-left' role="alert">{errors.password?.message}</p>}
                                    </div>
                                    <div className="mb-10">
                                        <Button classes={'w-full block py-3'} btnText={loading ? <SmallSpinner /> : 'Sign Up' } />
                                    </div>
                                    {registerError && <p className='text-red-600 text-sm text-center mb-5' role="alert">{ registerError }</p>}
                                </form>
                                <p className="text-base text-[#adadad] mb-5"> Already have an account? <Link to="/login" className="text-theme-primary hover:underline"> Login </Link>
                                </p>
                                <div className="text-center border-b border-[#CFCFCF] leading-[0px] mb-5">
                                    <span className="leading-[0px] p-2 font-semibold tracking-wide text-theme-3rd text-base uppercase bg-white">Or</span>
                                </div>
                                <SocialLogin />
                                <div>
                                    <span className="absolute top-1 right-1">
                                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="1.39737" cy="38.6026" r="1.39737" transform="rotate(-90 1.39737 38.6026)" fill="#0FCFEC" />
                                            <circle cx="1.39737" cy="1.99122" r="1.39737" transform="rotate(-90 1.39737 1.99122)" fill="#0FCFEC" />
                                            <circle cx="13.6943" cy="38.6026" r="1.39737" transform="rotate(-90 13.6943 38.6026)" fill="#0FCFEC" />
                                            <circle cx="13.6943" cy="1.99122" r="1.39737" transform="rotate(-90 13.6943 1.99122)" fill="#0FCFEC" />
                                            <circle cx="25.9911" cy="38.6026" r="1.39737" transform="rotate(-90 25.9911 38.6026)" fill="#0FCFEC" />
                                            <circle cx="25.9911" cy="1.99122" r="1.39737" transform="rotate(-90 25.9911 1.99122)" fill="#0FCFEC" />
                                            <circle cx="38.288" cy="38.6026" r="1.39737" transform="rotate(-90 38.288 38.6026)" fill="#0FCFEC" />
                                            <circle cx="38.288" cy="1.99122" r="1.39737" transform="rotate(-90 38.288 1.99122)" fill="#0FCFEC" />
                                            <circle cx="1.39737" cy="26.3057" r="1.39737" transform="rotate(-90 1.39737 26.3057)" fill="#0FCFEC" />
                                            <circle cx="13.6943" cy="26.3057" r="1.39737" transform="rotate(-90 13.6943 26.3057)" fill="#0FCFEC" />
                                            <circle cx="25.9911" cy="26.3057" r="1.39737" transform="rotate(-90 25.9911 26.3057)" fill="#0FCFEC" />
                                            <circle cx="38.288" cy="26.3057" r="1.39737" transform="rotate(-90 38.288 26.3057)" fill="#0FCFEC" />
                                            <circle cx="1.39737" cy="14.0086" r="1.39737" transform="rotate(-90 1.39737 14.0086)" fill="#0FCFEC" />
                                            <circle cx="13.6943" cy="14.0086" r="1.39737" transform="rotate(-90 13.6943 14.0086)" fill="#0FCFEC" />
                                            <circle cx="25.9911" cy="14.0086" r="1.39737" transform="rotate(-90 25.9911 14.0086)" fill="#0FCFEC" />
                                            <circle cx="38.288" cy="14.0086" r="1.39737" transform="rotate(-90 38.288 14.0086)" fill="#0FCFEC" />
                                        </svg>
                                    </span>
                                    <span className="absolute left-1 bottom-1">
                                        <svg width="29" height="40" viewBox="0 0 29 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="2.288" cy="25.9912" r="1.39737" transform="rotate(-90 2.288 25.9912)" fill="#19D3AE" />
                                            <circle cx="14.5849" cy="25.9911" r="1.39737" transform="rotate(-90 14.5849 25.9911)" fill="#19D3AE" />
                                            <circle cx="26.7216" cy="25.9911" r="1.39737" transform="rotate(-90 26.7216 25.9911)" fill="#19D3AE" />
                                            <circle cx="2.288" cy="13.6944" r="1.39737" transform="rotate(-90 2.288 13.6944)" fill="#19D3AE" />
                                            <circle cx="14.5849" cy="13.6943" r="1.39737" transform="rotate(-90 14.5849 13.6943)" fill="#19D3AE" />
                                            <circle cx="26.7216" cy="13.6943" r="1.39737" transform="rotate(-90 26.7216 13.6943)" fill="#19D3AE" />
                                            <circle cx="2.288" cy="38.0087" r="1.39737" transform="rotate(-90 2.288 38.0087)" fill="#19D3AE" />
                                            <circle cx="2.288" cy="1.39739" r="1.39737" transform="rotate(-90 2.288 1.39739)" fill="#19D3AE" />
                                            <circle cx="14.5849" cy="38.0089" r="1.39737" transform="rotate(-90 14.5849 38.0089)" fill="#19D3AE" />
                                            <circle cx="26.7216" cy="38.0089" r="1.39737" transform="rotate(-90 26.7216 38.0089)" fill="#19D3AE" />
                                            <circle cx="14.5849" cy="1.39761" r="1.39737" transform="rotate(-90 14.5849 1.39761)" fill="#19D3AE" />
                                            <circle cx="26.7216" cy="1.39761" r="1.39737" transform="rotate(-90 26.7216 1.39761)" fill="#19D3AE" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;