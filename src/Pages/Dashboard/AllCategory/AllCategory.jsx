import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useSetTitle from '../../../Hooks/useSetTitle';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const AllCategory = () => {
    useSetTitle('All Category')
    const [deletedCategory, setDeletedCategory] = useState(null)
    const { data:category = [], isLoading, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/category`)
            const data = await res.json()
            return data
        }
    })
    
    const allCategory = category.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    const closeModal = () => {
        setDeletedCategory(null)
    }
    const handleCategoryDelete = categoryId => {
        fetch(`${ process.env.REACT_APP_API_URL }/category/${ categoryId }`, {
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
                <div className="sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full rounded-lg overflow-hidden">
                        <table className="w-full lg:w-[600px] mx-auto leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Category Name </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allCategory.map(category => (
                                        <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{ category.name }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                <label onClick={() => setDeletedCategory(category)} htmlFor="confirmationModal" className='cursor-pointer bg-red-600 py-1 px-3 text-xs text-white font-bold rounded-full'>Delete</label>
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
                deletedCategory &&
                <ConfirmationModal 
                    title={`Are you sure you want to delete?`}
                    message={`If you delete ${ deletedCategory.name }. It cannot be undone!`}
                    closeModal={closeModal}
                    successAction={handleCategoryDelete}
                    successButtonName={`Delete`}
                    modalData={deletedCategory}
                />
            }
        </section>
    );
};

export default AllCategory;