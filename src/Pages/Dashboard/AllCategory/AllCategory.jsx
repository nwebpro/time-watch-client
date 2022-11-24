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
        <section class="px-4 sm:px-8">
            <div class="py-8">
                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div class="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Category Name </th>
                                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allCategory.map(category => (
                                        <tr>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p class="text-gray-900 whitespace-no-wrap">{ category.name }</p>
                                            </td>
                                            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight cursor-pointer">
                                                    <span aria-hidden class="absolute inset-0 bg-red-300 opacity-50 rounded-full"></span>
                                                    <span class="relative">Delete</span>
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