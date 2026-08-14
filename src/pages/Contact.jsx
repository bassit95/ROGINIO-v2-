import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PageBanner from '../components/ui/Cards/PageBanner';
import MainBtn from '../components/ui/buttons/MainBtn';
import { Mail, MapPin, Phone, User, Info, Pencil } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const contactRef = useRef();

    useEffect(() => {
        if (!contactRef.current) return;

        let ctx = gsap.context(() => {
            // 1. Animation des éléments de gauche (texte et infos de contact)
            gsap.from(".contact-left .contact-item, .contact-left ul li", {
                opacity: 0,
                x: -50,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-left",
                    start: "top 80%",
                }
            });

            // 2. Animation du formulaire à droite
            gsap.from(".contact-right", {
                opacity: 0,
                x: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".contact-right",
                    start: "top 80%",
                }
            });

            // 3. Animation de la carte Google Maps en bas
            gsap.from(".map-container", {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".map-container",
                    start: "top 85%",
                }
            });
        }, contactRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={contactRef}>
            <PageBanner 
                title="Contact Us" 
                currentPage="Contact Us" 
            />

            <div className="container mx-auto px-4 py-[8%] section-container gap-10 lg:gap-14">
                {/* Partie gauche : Informations de contact */}
                <div className="lg:w-1/2 contact-left">
                    <span className="title-span contact-item">Contact Us</span>
                    
                    <h2 className="heading-1 mb-5 contact-item">
                        <span className="text-coffee">Have question?</span> <br />
                        Get in touch!
                    </h2>

                    <p className="pera-text contact-item mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis repellendus commodi porro
                        nisi magni suscipit facere atque modi voluptatibus molestias.
                    </p>

                    <ul className="space-y-5">
                        <li className="flex items-center gap-4 group contact-list">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-r from-yellow-400 to-yellow-200 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
                                <MapPin className="text-white w-5 h-5" />
                            </div>
                            <p className="text-gray-700">Abidjan, Cocody Abatta (Carrefour Sirène)</p>
                        </li>

                        <li className="flex items-center gap-4 group contact-list">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-r from-green-400 to-yellow-200 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
                                <Phone className="text-white w-5 h-5" />
                            </div>
                            <p className="text-gray-700">+225 07 00 00 00 00</p>
                        </li>

                        <li className="flex items-center gap-4 group contact-list">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-linear-to-r from-blue-400 to-yellow-200 transition duration-300 group-hover:scale-110 group-hover:rotate-6">
                                <Mail className="text-white w-5 h-5" />
                            </div>
                            <p className="text-gray-700">contact@votre-entreprise.ci</p>
                        </li>
                    </ul>
                </div>

                {/* Partie droite : Formulaire de contact */}
                <div className="w-full lg:w-1/2 contact-right">
                    <form className="w-full space-y-10 contact-form">
                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Input Name */}
                            <div className="flex items-center border-b border-gray-400 pb-3 gap-3">
                                <User className="w-5 h-5 text-gray-700" />
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    className="bg-transparent w-full outline-none" 
                                    required 
                                />
                            </div>

                            {/* Input Phone */}
                            <div className="flex items-center border-b border-gray-400 pb-3 gap-3">
                                <Phone className="w-5 h-5 text-gray-700" />
                                <input 
                                    type="tel" 
                                    placeholder="Phone" 
                                    className="bg-transparent w-full outline-none" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Input Email */}
                            <div className="flex items-center border-b border-gray-400 pb-3 gap-3">
                                <Mail className="w-5 h-5 text-gray-700" />
                                <input 
                                    type="email" 
                                    placeholder="Email Address" 
                                    className="bg-transparent w-full outline-none" 
                                    required 
                                />
                            </div>

                            {/* Input Subject / Info */}
                            <div className="flex items-center border-b border-gray-400 pb-3 gap-3">
                                <Info className="w-5 h-5 text-gray-700" />
                                <input 
                                    type="text" 
                                    placeholder="Subject" 
                                    className="bg-transparent w-full outline-none" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="flex items-center border-b border-gray-400 pb-3 gap-3">
                            <Pencil className="w-5 h-5 text-gray-700" />
                            <textarea
                                rows="3"
                                placeholder="How can we help you ? feel to get in Touch" 
                                className="bg-transparent w-full outline-none" 
                                required 
                            >
                            </textarea>
                        </div>

                        {/* Bouton de soumission et case à cocher */}
                        <div className="flex flex-wrap items-center justify-between border-b border-gray-400 pb-3 gap-3">
                            <MainBtn type="submit" text="Get in Touch" className="bg-black! text-white!" />

                            <label className="flex items-center gap-2 text-sm text-gray-700">
                                <input type="checkbox" className="w-4 h-4" />
                                agree to the <span className="underline">Privacy Policy</span>
                            </label>
                        </div>
                    </form>
                </div>
            </div>

            {/* Carte Google Maps - Cocody Abatta */}
            <div className="w-full h-100 sm:h-150 lg:h-180 map-container">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31776.47770857754!2d-3.9351096!3d5.3486111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAbatta%2C%20Cocody%2C%20Abidjan!5e0!3m2!1sfr!2sci!4v1680000000000!5m2!1sfr!2sci" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div> 
        </div>
    );
};

export default Contact;