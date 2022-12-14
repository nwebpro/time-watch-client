import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import { Autoplay } from "swiper"

const Categories = () => {
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
        <section className='px-4 md:px-0 py-20'>
            <div className='container mx-auto'>
                <h2 className="text-center font-poppins text-theme-text font-bold text-[26px] md:text-4xl leading-10 mb-[72px]">Our Popular Brands</h2>
                {
                    allCategory?.length >= 7 ?
                    <Swiper
                        breakpoints={{
                            576: {
                            slidesPerView: 2,
                            },
                            768: {
                            slidesPerView: 3,
                            },
                            992: {
                            slidesPerView: 6,
                            },
                        }}
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        autoplay={{
                            delay: 10000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {
                            allCategory?.map(category => (
                                <SwiperSlide key={ category._id } className='text-center bg-theme-secondary rounded py-5 hover:bg-theme-primary hover:text-white transition duration-200 cursor-pointer'>
                                    <Link to={`/category/${ category._id }`} className='font-bold text-xl leading-8'>
                                        { category.name }
                                    </Link>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                    :
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-center'>
                        {
                            allCategory?.map(category => (
                                <div key={ category._id } className='text-center bg-theme-secondary rounded py-5 hover:bg-theme-primary hover:text-white transition duration-200 cursor-pointer'>
                                    <Link to={`/category/${ category._id }`} className='font-bold text-xl leading-8'>
                                        { category.name }
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default Categories;