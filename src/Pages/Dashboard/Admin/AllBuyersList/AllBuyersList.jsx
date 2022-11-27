import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useSetTitle from '../../../../Hooks/useSetTitle';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const AllBuyersList = () => {
    useSetTitle('All Buyers')
    const [deletedUser, setDeletedUser] = useState(null)
    const { data:buyers = [], isLoading, refetch } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/buyers`, {
                headers: {
                    authorization: `Bearer ${ localStorage.getItem('timeWatchAccessToken') }`,
                }
            })
            const data = await res.json()
            return data
        }
    })
    
    const allBuyers = buyers.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    const closeModal = () => {
        setDeletedUser(null)
    }

    const handleUserDelete = buyerId => {
        fetch(`${ process.env.REACT_APP_API_URL }/sellers/${ buyerId }`, {
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
                        <table className="min-w-full leading-normal" data-aos='fade-up' data-aos-duration='1500'>
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Image </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Name </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Email </th>
                                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Status</th> */}
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allBuyers.map(buyers => (
                                        <tr key={buyers._id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img className="w-full h-full rounded-full" src={ buyers.image } alt="" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap capitalize">{ buyers.name }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{ buyers.email }</p>
                                            </td>
                                            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                    <span className="relative">Unverified</span>
                                                </span>
                                            </td> */}
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                <label onClick={() => setDeletedUser(buyers)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
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

export default AllBuyersList;