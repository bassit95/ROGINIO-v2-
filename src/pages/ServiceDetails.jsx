import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import services from "../assets/Data/Services.json";
import MainBtn from '../components/ui/buttons/MainBtn';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useParams, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

import galleryImage1 from "/images/Gallery/gallery-image-04.jpg";
import galleryImage2 from "/images/Gallery/gallery-image-05.jpg";
import galleryImage3 from "/images/Gallery/gallery-image-06.jpg";
import PageBanner from '../components/ui/Cards/PageBanner';

const ServiceDetails = () => {
    const serviceDetailsRef = useRef();
    const { id } = useParams();

    const service = services.find((item) => item.id === Number(id));

    if (!service) return <p className='text-center mt-10'>Service not found!</p>;

    return (
        <>
            <PageBanner title="Services Details" currentPage="Services Details" productName={service.title} />

            <div ref={serviceDetailsRef} className="container mx-auto px-4 py-[8%]">
                <div className="section-container gap-10 lg:gap-14 items-start!">
                    {/* Colonne de gauche (70%) */}
                    <div className="w-full lg:w-[70%] content">
                        <img 
                            src={service.image} 
                            alt={service.title} 
                            className="main-image w-full h-full object-cover rounded" 
                        />

                        <h3 className="main-title text-3xl lg:text-4xl font-semibold pt-8 pb-5">{service.title}</h3>

                        <p className="text-paragraph pb-8 pera">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. A laudantium unde quae officiis, 
                            dignissimos sit quis me adipisci voluptas consectetur explicabo blanditiis illo, quidem 
                            delectus.
                        </p>

                        {/* Galerie d'images */}
                        <div className="gallery centered-row justify-between flex-col lg:flex-row gap-3 w-full h-auto lg:h-90">
                            <div className="image group overflow-hidden rounded-sm h-full w-full gallery-img">
                                <img 
                                    src={galleryImage1} 
                                    alt="gallery-image" 
                                    className="section-image group-hover:scale-110 transition-all duration-300" 
                                />
                            </div>
                            <div className="image group overflow-hidden rounded-sm h-full w-full gallery-img">
                                <img 
                                    src={galleryImage2} 
                                    alt="gallery-image" 
                                    className="section-image group-hover:scale-110 transition-all duration-300" 
                                />
                            </div>
                        </div>

                        <div className="text-paragraph pera py-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea neque nihil aspernatur! 
                            Voluptates ad laboriosam in, iure dolore facilis dolor doloremque fugiat iusto. 
                            Ducimus nulla commodi non placeat nemo possimus illum, veritatis iusto consequuntur atque! 
                            Accusamus aliquam praesentium officia.
                        </div>

                        <div className="text-paragraph pera pb-8">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. A rem perspiciatis praesentium 
                            distinctio, enim, similique aspernatur consectetur voluptatum facilis autem dolores, 
                            necessitatibus repudiandae! Labore repudiandae repellat fuga hic iure et deleniti, 
                            molestiae velit facere modi voluptas ad eos impedit provident quasi sed voluptatibus? 
                            Perspiciatis laudantium harum consequatur obcaecati aliquam optio!
                        </div>

                        <div className="h-auto lg:h-150">
                            <img src={galleryImage3} alt="gallery-image" className="section-image bottom-image" />
                        </div>

                        <div className="text-paragraph pera py-8">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quasi vero blanditiis 
                            assumenda vel, qui, voluptate repellat odio quibusdam ad dolorum? Modi at atque a impedit 
                            sed. Harum veniam est laudantium fugiat deleniti ab quod perferendis sit atque, culpa 
                            voluptas dicta adipisci neque officia omnis hic quae, aliquid quos voluptates qui 
                            exercitationem accusantium! Dignissimos debitis obcaecati odio mollitia autem rem!
                        </div>
                    </div>

                    {/* Colonne de droite / Formulaire & Contact Info (30%) */}
                    <div className="w-full lg:w-[30%] bg-white shadow p-5 lg:p-8 rounded-sm lg:sticky h-full top-0 right-0">
                        <h4 className="form-title">Get In Touch</h4>

                        <form className="space-y-8 mt-10 contact-form">
                            <div className="input-wrapper pb-2 relative">
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    className="input-box w-full outline-none" 
                                    required 
                                />
                            </div>

                            <div className="input-wrapper pb-2 relative">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    className="input-box w-full outline-none" 
                                    required 
                                />
                            </div>

                            <div className="input-wrapper pb-2 relative">
                                <input 
                                    type="text" 
                                    placeholder="Message" 
                                    className="input-box w-full outline-none" 
                                    required 
                                />
                            </div>

                            <MainBtn 
                                type="submit" 
                                text={"Get In Touch"} 
                                className="submit-btn bg-black! text-white! shadow-none! rounded-sm! mt-6!" 
                            />
                        </form>

                        {/* Section Contact Info */}
                        <div className="contact-form">
                            <h3 className="text-2xl font-medium pt-8 pb-8 form-title">Contact Info</h3>

                            <ul className="space-y-6 max-w-md">
                                <li className="flex items-start gap-4 group contact-item">
                                    <div className="p-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500 text-white transition-transform duration-300 group-hover:scale-110">
                                        <MapPin size={20} />
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        <span className="font-semibold block">
                                            United Kingdom –
                                        </span>
                                        221B Baker Street, Office 302<br />
                                        London, UK NW1 6XE
                                    </p>
                                </li>

                                <li className="flex items-start gap-4 group contact-item">
                                    <div className="p-3 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 text-white transition-transform duration-300 group-hover:scale-110">
                                        <Mail size={20} />
                                    </div>
                                    <p className="text-gray-700">
                                        info@email.com
                                    </p>
                                </li>

                                <li className="flex items-start gap-4 group contact-item">
                                    <div className="p-3 rounded-full bg-linear-to-r from-orange-500 to-red-500 text-white transition-transform duration-300 group-hover:scale-110">
                                        <Phone size={20} />
                                    </div>
                                    <p className="text-gray-700">
                                        +91 12345 67890
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            
        </>
    );
};

export default ServiceDetails;