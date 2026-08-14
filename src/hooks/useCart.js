import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useCart = () => {
  // L'état local qui stocke les produits du panier pour le composant actuel
  const [cart, setCart] = useState([]);

  // Fonction pour charger les données du localStorage vers l'état React
  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  };

  // Charger le panier au démarrage et écouter les changements des autres composants
  useEffect(() => {
    loadCart();

    // On écoute l'événement personnalisé pour mettre à jour le panier en temps réel
    window.addEventListener("cartUpdated", loadCart);

    // Nettoyage de l'écouteur d'événement
    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  // AJOUTER UN PRODUIT AU PANIER
  const addToCart = (product) => {
    if (!product?.id) return;

    // 1. Correction : On renomme la variable pour éviter les conflits avec le useState
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // 2. On vérifie si le produit est déjà présent
    const exist = currentCart.find((item) => item.id === product.id);
      
    if (exist) {
      toast("Product already in cart");
      return; // On arrête la fonction ici
    }

    // 3. On ajoute le produit et on sauvegarde
    currentCart.push(product);
    localStorage.setItem("cart", JSON.stringify(currentCart));

    toast.success("Added to cart");

    // 4. CORRECTION : "cartUpdatep" devient "cartUpdated" pour correspondre à l'écouteur
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // CORRECTION : AJOUT DE LA FONCTION MANQUANTE (Supprimer un produit)
  const removeFromCart = (productId) => {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // On filtre pour retirer le produit sélectionné
    currentCart = currentCart.filter((item) => item.id !== productId);
    
    // On sauvegarde la nouvelle liste
    localStorage.setItem("cart", JSON.stringify(currentCart));
    
    toast.error("Removed from cart");
    
    // On prévient le reste du site du changement
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // On retourne les données et les fonctions (Correction de removeFormCart -> removeFromCart)
  return { cart, addToCart, removeFromCart };
};