import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GallerySlide = ({ gallery }) => {

  const navigate = useNavigate();

  return (
    <>
      <div className="absolute -top-16 right-4 flex gap-4 z-10">
        <button className='gallery-prev w-12 h-12 border flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>
          <ArrowLeft size={20}/>
        </button>

        <button className='gallery-next w-12 h-12 border flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>
          <ArrowRight size={20}/>
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          prevEl: ".gallery-prev",
          nextEl: ".gallery-next"
        }}
        breakpoints={{
          1024: { slidesPerView: 2 }
        }}
      >
        {gallery && gallery.map((item, index) => (
          <SwiperSlide
            key={item.id || index}
            className={`${index % 2 === 0 ? "w-full lg:w-[40%]!" : "w-full lg:w-[60%]!"}`}
          >

            <div 
              className="gallery-item h-125 relative overflow-hidden group cursor-pointer"
              onClick={() => navigate(`/gallery/${item.id}`)}
            >
              <img 
                /* CORRECTION : On utilise item.image1 au lieu de item.image */
                src={item.image1 || item.image} 
                alt={item.title}
                className='section-image w-full h-full object-cover absolute top-0 left-0 group-hover:scale-110 transition duration-700'
              />

              <div className="absolute bottom-10 -left-full bg-light-yellow px-6 py-5 group-hover:left-0 transition-all duration-700 z-10">
                <h5 className="text-2xl font-semibold">{item.title}</h5>
                {/* CORRECTION : Support de Client (majuscule) et client (minuscule) */}
                <span className='text-paragraph font-light'>{item.Client || item.client || "Architecture"}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default GallerySlide;