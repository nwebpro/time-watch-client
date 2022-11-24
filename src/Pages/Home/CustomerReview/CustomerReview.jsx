import React from 'react';
import { FaStar } from 'react-icons/fa'
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay, Pagination } from "swiper"
import './CustomerReview.css'

const CustomerReview = () => {
    return (
        <section className='px-4 md:px-0 py-20 bg-theme-secondary'>
            <div className='container mx-auto'>
                <h2 className="text-center font-poppins text-theme-text font-bold text-4xl leading-10 mb-[72px]">What thousands of happy customers are saying about us</h2>
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
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                    >
                        {
                            [...Array(3)].map((_, i) => (
                                
                                <SwiperSlide key={ i }>
                                    <div className='bg-white py-8 px-5 rounded-lg'>
                                        <div className='flex justify-between items-center mb-5'>
                                            <div className='flex gap-1 text-lg text-theme-primary'>
                                                {
                                                    [...Array(5)].map((_, i) => (
                                                        <FaStar key={ i } />
                                                    ))
                                                }
                                            </div>
                                            <p className='text-base text-theme-body italic'> —  This Week</p>
                                        </div>
                                        <p>The whole purchasing process was much smoother than I anticipated. The watch arrived in double-quick time. I will definitely be looking to do the same again after Christmas.</p>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
            </div>
        </section>
    );
};

export default CustomerReview;