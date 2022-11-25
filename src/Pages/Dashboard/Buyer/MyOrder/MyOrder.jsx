import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useSetTitle from '../../../../Hooks/useSetTitle';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyOrder = () => {
    useSetTitle('My Orders')
    const [deletedOrder, setDeletedOrder] = useState(null)
    const { data:orders = [], isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/product/orders`)
            const data = await res.json()
            return data
        }
    })
    
    const allOrders = orders.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    const closeModal = () => {
        setDeletedOrder(null)
    }
    const handleOrderDelete = orderId => {
        fetch(`${ process.env.REACT_APP_API_URL }/product/orders/${ orderId }`, {
            method: "DELETE",
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
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Image </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Name </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Price </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Payment </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allOrders?.map(order => (
                                        <tr key={order._id}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="flex">
                                                    <div className="flex-shrink-0 w-10 h-10">
                                                        <img className="w-full h-full rounded-full" src={ order.image } alt="" />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{ order.productName }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">Resale: ${ order.price }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {
                                                    order.price && !order.paid &&
                                                    <Link to={`/dashboard/payment/${ order._id }`}>
                                                        <button className='cursor-pointer bg-theme-primary py-1 px-3 text-xs text-white font-bold rounded-full'>Pay</button>
                                                    </Link>
                                                }
                                                {
                                                    order.price && order.paid &&
                                                    <span className='cursor-pointer bg-[#9bbd7f] py-1 px-3 text-xs text-white font-bold rounded-full'>Paid</span>
                                                }
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <label onClick={() => setDeletedOrder(order)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
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
                deletedOrder &&
                <ConfirmationModal 
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${ deletedOrder.productName }. It cannot be undone!`}
                    closeModal={closeModal}
                    successAction={handleOrderDelete}
                    successButtonName={`Delete`}
                    modalData={deletedOrder}
                />
            }
        </section>
    );
};

export default MyOrder;