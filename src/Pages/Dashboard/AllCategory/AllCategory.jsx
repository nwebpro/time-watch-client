import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useSetTitle from '../../../Hooks/useSetTitle';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const AllCategory = () => {
    useSetTitle('All Category')
    const { data:category = [], isLoading } = useQuery({
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

    return (
        <section className="px-4 sm:px-8">
            <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Category Name </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allCategory.map(category => (
                                        <tr>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{ category.name }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight cursor-pointer">
                                                    <span aria-hidden className="absolute inset-0 bg-red-300 opacity-50 rounded-full"></span>
                                                    <span className="relative">Delete</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllCategory;