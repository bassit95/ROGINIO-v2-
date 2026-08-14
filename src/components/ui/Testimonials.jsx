import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import { Star } from "lucide-react"

import "swiper/css"
import "swiper/css/pagination"

import data from "../../assets/data"

const Testimonials = () => {
    const testimonials = data.testimonials;

    return (
        <>
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                loop={true}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1300: { slidesPerView: 3 },
                }}
            >
                {testimonials.map((item) => (
                    <SwiperSlide key={item.id || item.name}>
                        <div className="bg-white p-10 rounded-sm h-full">
                            <div className="flex gap-1 text-yellow-500 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-gray-800 mb-8">{item.text}</p>
                            <h4 className="text-lg font-semibold">{item.name}</h4>
                            <h4 className="text-lg font-semibold">{item.role}</h4>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default Testimonials