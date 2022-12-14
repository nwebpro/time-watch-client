import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { format, formatDistanceToNow } from 'date-fns'
import useSetTitle from '../../../Hooks/useSetTitle';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';

const MyProduct = () => {
    useSetTitle('My Products')
    const { user } = useContext(AuthContext)
    const [deletedProduct, setDeletedProduct] = useState(null)
    const { data:products = [], isLoading, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/products?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`
                }
            })
            const data = await res.json()
            return data
        }
    })
    
    const allProducts = products.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    const handleAdvertised = product => {
        fetch(`${ process.env.REACT_APP_API_URL }/makeAdvertise/${ product._id }`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                toast.success(data.message, { autoClose: 400 })
                refetch()
            }
        })
    }

    const closeModal = () => {
        setDeletedProduct(null)
    }
    const handleProductDelete = productId => {
        fetch(`${ process.env.REACT_APP_API_URL }/products/${ productId }`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                toast.success(data.message, { autoClose: 400 })
                refetch()
            }
        })
    }

    return (
        <section className="px-4 sm:px-8">
            <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                        {
                            allProducts.length ?
                            <table className="min-w-full leading-normal" data-aos='fade-up' data-aos-duration='1000'>
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Image </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Price </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Date </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Status</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Advertised</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allProducts.map(product => (
                                            <tr key={product._id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img className="w-full h-full rounded-full" src={ product.image } alt="" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap"> { product.name } </p>
                                                            <p className="text-gray-600 whitespace-no-wrap capitalize">{ product.categoryName }</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">Resale: ??? { product.resalePrice }</p>
                                                    <p className="text-gray-900 whitespace-no-wrap">Original: ??? { product.originalPrice }</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap tooltip" data-tip={format(new Date(product.date), 'PPPPp')}>{ formatDistanceToNow(new Date(product.date), { includeSeconds: true }) }</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-center">
                                                    {
                                                        product.status === 'sold' ?
                                                        <span className="capitalize bg-gray-300 py-1 px-3 text-xs text-theme-body font-bold rounded-full">{product.status}</span>
                                                        :
                                                        <span className="capitalize cursor-pointer bg-green-600 py-1 px-3 text-xs text-white font-bold rounded-full">Available</span>
                                                    }
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-center">
                                                    {
                                                        product.status ? '' : 
                                                        product.isAdvertise ? 
                                                        <span className="py-1 px-3 text-xs text-theme-primary font-bold rounded-full">Advertise On</span>
                                                        :
                                                        <span onClick={() => handleAdvertised(product)} className="cursor-pointer bg-theme-primary py-1 px-3 text-xs text-white font-bold rounded-full" >Advertise</span>
                                                    }
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-center">
                                                    <label onClick={() => setDeletedProduct(product)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            :
                            <div className='w-full text-center h-[300px] lg:h-[500px] flex items-center justify-center text-4xl text-gray-300'>Sorry, you haven't added a product yet</div>
                        }
                    </div>
                </div>
            </div>
            {
                deletedProduct &&
                <ConfirmationModal 
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${ deletedProduct.name }. It cannot be undone!`}
                    closeModal={closeModal}
                    successAction={handleProductDelete}
                    successButtonName={`Delete`}
                    modalData={deletedProduct}
                />
            }
        </section>
    );
};

export default MyProduct;