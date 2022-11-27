import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useSetTitle from '../../../../Hooks/useSetTitle';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify'
import UserVerified from '../../UserVerified/UserVerified';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';

const AllSellers = () => {
    useSetTitle('All Sellers')
    const [deletedUser, setDeletedUser] = useState(null)
    const { data:sellers = [], isLoading, refetch} = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/sellers`, {
                headers: {
                    authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`,
                }
            })
            const data = await res.json()
            return data
        }
    })
    
    const allSellersList = sellers.data

    const closeModal = () => {
        setDeletedUser(null)
    }

    const handleUserVerified = email => {
        fetch(`${ process.env.REACT_APP_API_URL }/users/status-update/${ email }`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`,
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

    const handleUserDelete = sellerId => {
        fetch(`${ process.env.REACT_APP_API_URL }/sellers/${ sellerId }`, {
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


    if(isLoading) {
        return <LoadingSpinner />
    }

    return (
        <section className="px-4 sm:px-8">
            <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal" data-aos='fade-up' data-aos-duration='1500'>
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Image </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Name </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Email </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Status</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allSellersList.map(seller => (
                                        <tr key={seller._id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img className="w-full h-full rounded-full" src={ seller.image } alt="" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className='flex items-center gap-[2px]'>
                                                    <p className="text-gray-900 whitespace-no-wrap capitalize">{ seller.name }</p>
                                                    <UserVerified seller={ seller } />
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{ seller.email }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {
                                                    seller.verify === true ?
                                                    <span className='bg-green-200 rounded-full py-1 px-2'>Verified</span>
                                                    :
                                                    <span className={`relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight cursor-pointer`} onClick={() => handleUserVerified(seller.email)}>
                                                        <span aria-hidden className={`absolute inset-0 bg-green-200 opacity-50 rounded-full`}></span>
                                                        <span className="relative">{seller.verify ? 'Verified' : 'Unverified'}</span>
                                                    </span>
                                                }
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                <label onClick={() => setDeletedUser(seller)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {
                deletedUser &&
                <ConfirmationModal 
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${ deletedUser.name }. It cannot be undone!`}
                    closeModal={closeModal}
                    successAction={handleUserDelete}
                    successButtonName={`Delete`}
                    modalData={deletedUser}
                />
            }
        </section>
    );
};

export default AllSellers;