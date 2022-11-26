import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useSetTitle from '../../../../Hooks/useSetTitle';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const ReportedItems = () => {
    useSetTitle('Reported Items')
    const [deletedReportedProducts, setDeletedReportedProducts] = useState(null)
    const { data:reportedProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/reports`)
            const data = await res.json()
            return data
        }
    })
    
    const reportProducts = reportedProducts.data
    console.log(reportProducts);

    if(isLoading) {
        return <LoadingSpinner />
    }

    const closeModal = () => {
        setDeletedReportedProducts(null)
    }
    const handleReportedProductDelete = report => {
        
        fetch(`${ process.env.REACT_APP_API_URL }/reports/${ report }`, {
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
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                        {
                            reportProducts.length ?
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Image </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Name </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Email </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Message</th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    reportProducts?.map(report => (
                                            <tr key={report._id}>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img className="w-full h-full rounded-full" src={ report.image } alt="" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap"> { report.productName } </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap capitalize">{ report.userName }</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{ report.userEmail }</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{ report.message }</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-center">
                                                    <label onClick={() => setDeletedReportedProducts(report)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            :
                            <div className='w-full text-center h-[300px] lg:h-[500px] flex items-center justify-center text-4xl text-gray-300'>You currently have no orders.</div>
                        }
                    </div>
                </div>
            </div>
            {
                deletedReportedProducts &&
                <ConfirmationModal 
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${ deletedReportedProducts.name }. It cannot be undone!`}
                    closeModal={closeModal}
                    successAction={handleReportedProductDelete}
                    successButtonName={`Delete`}
                    modalData={deletedReportedProducts}
                />
            }
        </section>
    );
};

export default ReportedItems;