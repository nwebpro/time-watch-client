import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import Advertisement from './Advertisement';
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import { Autoplay } from "swiper"

const Advertisements = () => {
    const { data:result = [], isLoading} = useQuery({
        queryKey: ['result'],
        queryFn: async () => {
            const res = await fetch(`${ process.env.REACT_APP_API_URL }/makeAdvertise`)
            const data = await res.json()
            return data
        }
    })

    const advertisedList = result.data

    if(isLoading) {
        return <LoadingSpinner />
    }

    return (
        <>
            {
                advertisedList?.length &&
                <section className='bg-theme-secondary px-4 md:px-0 py-20'>
                    <div className='container mx-auto'>
                        <h2 className="text-center font-poppins text-theme-text font-bold text-4xl leading-10 mb-[72px]">Advertisement Products</h2>
                        {
                            advertisedList?.length === 4 ?
                            <Swiper
                                breakpoints={{
                                    576: {
                                    slidesPerView: 1,
                                    },
                                    768: {
                                    slidesPerView: 2,
                                    },
                                    992: {
                                    slidesPerView: 3,
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
                                    advertisedList?.map(product => (
                                        <SwiperSlide key={product._id} className='bg-white min-h-[420px] rounded-md'>
                                            <Advertisement
                                                product={product}
                                            />
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            :
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {
                                    advertisedList?.map(product => (
                                        <Advertisement
                                            key={product._id}
                                            product={product}
                                        />
                                    ))
                                }
                            </div>
                        }
                    </div>
                </section>
            }
        </>
    );
};

export default Advertisements;