// ==========================================
// 1. IMPORTATIONS DES MODULES ET COMPOSANTS
// ==========================================
import PageBanner from "../components/ui/Cards/PageBanner";
import { useRef, useEffect, useState } from "react"; 
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import toast from "react-hot-toast";
import MainBtn from "../components/ui/Buttons/MainBtn";

import { X } from "lucide-react";

// Enregistrement du plugin ScrollTrigger pour les animations au défilement
gsap.registerPlugin(ScrollTrigger);

function Wishlist() {
    // ==========================================
    // 2. ÉTATS (STATES) & RÉFÉRENCES (REFS)
    // ==========================================
    // État pour stocker la liste des produits dans les favoris
    const [wishlist, setWishlist] = useState([]);
    // État pour stocker les IDs des produits cochés (sélectionnés)
    const [selected, setSelected] = useState([]);
    // Référence DOM pour cibler le conteneur principal de la page pour GSAP
    const wishlistRef = useRef(null); 

    // ==========================================
    // 3. FONCTIONS LOGIQUES / GESTION DU PANIER
    // ==========================================
    
    // Charge les données depuis le LocalStorage et synchronise la sélection
    const loadWishlist = () => {
        const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];

        setWishlist(wishlistData);

        // Pré-sélectionne automatiquement les articles déjà présents dans le panier
        const preSelected = wishlistData
            .filter((item) => cartData.some((cartItem) => cartItem.id === item.id))
            .map((item) => item.id);

        setSelected(preSelected);
    };
    
    // Effet pour initialiser la page et écouter les mises à jour globales
    useEffect(() => {
        loadWishlist();
        window.addEventListener("wishlistUpdated", loadWishlist);

        // Nettoyage de l'écouteur d'événement à la destruction du composant
        return () => {
            window.removeEventListener("wishlistUpdated", loadWishlist);
        };
    }, []);

    // Supprime un produit spécifique des favoris
    const removeProduct = (id) => {
        const updated = wishlist.filter((item) => item.id !== id);

        localStorage.setItem("wishlist", JSON.stringify(updated));
        setWishlist(updated);

        // Filtre l'état sélectionné pour retirer l'élément supprimé
        setSelected((prev) => prev.filter((item) => item !== id));

        toast.error("Removed from wishlist");
        window.dispatchEvent(new Event("wishlistUpdated"));
    };

    // Gère le cochage/décochage d'un produit (et le retire du panier s'il y était)
    const toggleSelect = (id) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (selected.includes(id)) {
            const updatedSelected = selected.filter((item) => item !== id);
            setSelected(updatedSelected);

            cart = cart.filter((item) => item.id !== id);
            localStorage.setItem("cart", JSON.stringify(cart));

            toast("Removed from cart");
            window.dispatchEvent(new Event("cartUpdated"));
        } else {
            setSelected([...selected, id]);
        }
    };

    // Ajoute un seul produit directement au panier
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const exist = cart.find((item) => item.id === product.id);

        if (exist) {
            toast("Product already in cart");
            return;
        }

        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("Added to cart");
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // Ajoute uniquement les produits cochés au panier
    const addSelectedToCart = () => {
        if (selected.length === 0) {
            toast.error("Please select at least one product");
            return;
        }

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const selectedProducts = wishlist.filter((item) => selected.includes(item.id));
        let addedCount = 0;

        selectedProducts.forEach((product) => {
            const exist = cart.find((item) => item.id === product.id);
            if (!exist) {
                cart.push(product);
                addedCount++;
            }
        });

        if (addedCount === 0) {
            toast("Selected products already in cart");
            return;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success(`${addedCount} products added to cart`);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // Ajoute l'intégralité de la liste des favoris au panier
    const addAllToCart = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        wishlist.forEach((product) => {
            const exist = cart.find((item) => item.id === product.id);
            if (!exist) {
                cart.push(product);
            }
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        toast.success("All items added to cart");
        window.dispatchEvent(new Event("cartUpdated"));
    };

    // ==========================================
    // 4. ANIMATIONS GSAP & SCROLLTRIGGER
    // ==========================================
    useEffect(() => {
        if (!wishlistRef.current) return;

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(wishlistRef);

            // ANIMATION : Liste vide (s'exécute si 0 produit)
            if (wishlist.length === 0) {
                gsap.from(q(".wishlist-empty"), {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: q(".wishlist-empty"),
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    }
                });
                return; 
            }

            // ANIMATIONS : Quand la liste contient des produits
            gsap.from(q(".wishlist-item"), {
                y: 60,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: wishlistRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            });

            gsap.from(q(".wishlist-actions"), {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: q(".wishlist-actions"),
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            });

            gsap.from(q(".wishlist-btn"), {
                y: 30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.2,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: q(".wishlist-actions"),
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            });

            gsap.from(q(".wishlist-head"), {
                y: -40,
                opacity: 0,
                duration: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: q(".wishlist-head"),
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            });

            gsap.from(q(".wishlist-th"), {
                x: -30,
                opacity: 0,
                duration: 0.4,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: q(".wishlist-head"),
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            });
            
        }, wishlistRef);

        return () => ctx.revert();
    }, [wishlist]);

    // ==========================================
    // 5. RENDU DU COMPOSANT (JSX)
    // ==========================================
    return (
        <>
            {/* Bannière supérieure de la page */}
            <PageBanner title="Wishlist" currentPage="Wishlist"/>
            
            {/* Conteneur global lié à la Ref GSAP */}
            <div ref={wishlistRef} className="container mx-auto py-[8%] px-4 wishlist-section">
                
                {wishlist.length === 0 ? (
                    /* Rendu de l'écran vide */
                    <p className="text-center text-lg bg-gray-50 shadow-md py-5 wishlist-empty">
                        No products in wishlist
                    </p>
                ) : (
                    <>
                        {/* --------------------------------------
                           AFFICHAGE GRAND ÉCRAN (TABLEAU DESKTOP)
                           -------------------------------------- */}
                        <div className="hidden lg:block overflow-x-auto w-full">
                            {/* table w-full et table-fixed forcent l'alignement strict sur 100% de largeur */}
                            <table className="w-full table-fixed border-collapse">
                                
                                {/* MODIFICATION ICI : 
                                  'w-full display:table' ou l'application des classes de largeur stricte 
                                  permet à l'en-tête (thead) de prendre toute la largeur disponible.
                                */}
                                <thead className="bg-black text-white wishlist-head w-full">
                                    <tr>
                                        {/* Attribution de largeurs en pourcentage pour étaler la ligne sur 100% */}
                                        <th className="p-4 wishlist-th w-[5%]"></th>
                                        <th className="p-4 text-left font-medium wishlist-th w-[55%]">Product</th>
                                        <th className="p-4 text-left font-medium wishlist-th w-[15%]">Price</th>
                                        <th className="p-4 text-left font-medium wishlist-th w-[10%]">Stock</th>
                                        <th className="p-4 wishlist-th w-[15%]"></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {wishlist.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-200 wishlist-item">
                                            <td className="text-center border-r border-gray-200 p-4">
                                                <input 
                                                    type="checkbox"
                                                    checked={selected.includes(item.id)}
                                                    onChange={() => toggleSelect(item.id)}
                                                    className="cursor-pointer"
                                                />
                                            </td>
                                            <td className="flex items-center px-10 gap-4 py-6 border-r border-gray-200">
                                                <button onClick={() => removeProduct(item.id)} className="cursor-pointer">
                                                    <X size={20}/>
                                                </button>
                                                <img src={item.image1} className="w-20 h-20 object-cover" alt="" />
                                                <p className="font-semibold">{item.title || item.id}</p>
                                            </td>
                                            <td className="text-center border-r bg-gray-200 p-4">
                                                ${item.price}
                                            </td>
                                            <td className="text-green-600 text-center border-r border-gray-200 p-4">
                                                In stock
                                            </td>
                                            <td className="text-right p-4">
                                                <MainBtn
                                                    type="button"
                                                    onClick={() => addToCart(item)}
                                                    className="bg-transparent! border! shadow-none! rounded-sm!"
                                                    text={"Add to cart"}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* --------------------------------------
                           AFFICHAGE MOBILE (LISTE DE CARTES GRIDS)
                           -------------------------------------- */}
                        <div className="lg:hidden space-y-6">
                            {wishlist.map((item) => (
                                <div key={item.id} className="border border-gray-200 p-4 rounded-lg wishlist-item">
                                    <div className="flex justify-between">
                                        <input 
                                            type="checkbox" 
                                            checked={selected.includes(item.id)}
                                            onChange={() => toggleSelect(item.id)}
                                        />
                                        <button onClick={() => removeProduct(item.id)}>
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 mt-4">
                                        <img src={item.image1} className="w-20 h-20 rounded-sm object-cover" alt="" />
                                        <p className="font-semibold">{item.title}</p>
                                    </div>

                                    <div className="flex justify-between mt-4">
                                        <span>Price</span>
                                        <span>${item.price}.00</span>
                                    </div>

                                    <div className="flex justify-between mt-2">
                                        <span>Status</span>
                                        <span className="text-green-600">In stock</span>
                                    </div>

                                    <div className="mt-4">
                                        <MainBtn 
                                            type="button"
                                            onClick={() => addToCart(item)}
                                            className="w-full! bg-transparent border! border-gray-200! shadow-none! rounded-sm!"
                                            text={"Add to Cart"}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --------------------------------------
                           BOUTONS D'ACTIONS DU BAS DE PAGE
                           -------------------------------------- */}
                        <div className="flex flex-col md:flex-row justify-end items-center mt-10 gap-4 wishlist-actions">
                            <MainBtn      
                                type="button"
                                onClick={addSelectedToCart} 
                                className="wishlist-btn md:w-60! bg-primary! text-white! shadow-none! rounded-sm!"
                                text={"Add Selected to Cart"}
                            />
                            <MainBtn      
                                type="button"
                                onClick={addAllToCart} 
                                className="wishlist-btn w-full md:w-50! bg-primary! text-white! shadow-none! rounded-sm!"
                                text={"Add All to Cart"}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Wishlist;