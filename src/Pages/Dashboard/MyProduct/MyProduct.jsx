import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { format } from 'date-fns'
import useSetTitle from '../../../Hooks/useSetTitle';

const MyProduct = () => {
    useSetTitle('My Products')
    const { data:products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/products`)
            const data = await res.json()
            return data
        }
    })
    
    const allProducts = products.data

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
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Image </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Price </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"> Date </th>
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
                                                <p className="text-gray-900 whitespace-no-wrap">Resale: ${ product.resalePrice }</p>
                                                <p className="text-gray-900 whitespace-no-wrap">Original: ${ product.originalPrice }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{ format(new Date(product.date), 'PP') }</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm cursor-pointer">
                                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                    <span className="relative">Advertised</span>
                                                </span>
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

export default MyProduct;