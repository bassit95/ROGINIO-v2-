import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// On crée un "Hook personnalisé" (useWishlist) qui prend un "product" en paramètre.
// Ce hook va centraliser toute la logique des favoris pour un produit donné.
export const useWishlist = (product) => {
  
  // STATUT LOCAL : "liked" est un booléen (true/false).
  // Il permet de savoir SI le produit actuel est dans les favoris ou pas.
  const [liked, setLiked] = useState(false);

  // ---------------------------------------------------------------------------
  // ÉTAPE 1 : VÉRIFICATION AU CHARGEMENT DE LA PAGE
  // ---------------------------------------------------------------------------
  useEffect(() => {
    // Sécurité : Si le produit n'a pas d'identifiant (pas encore chargé), on arrête tout.
    if (!product?.id) return;

    // 1. On récupère la liste des favoris stockée dans le navigateur (localStorage).
    // Si le localStorage est vide, on crée un tableau vide [] par défaut.
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    // 2. On cherche si notre produit actuel (`product.id`) est déjà dans ce tableau.
    const exist = wishlist.find((item) => item.id === product.id);
    
    // 3. On met à jour notre statut "liked".
    // Le double point d'exclamation (!!) transforme l'élément trouvé en "true", ou en "false" s'il n'y a rien.
    setLiked(!!exist);    

  }, [product?.id]); // Ce bloc se rejoue automatiquement si l'ID du produit change.

  // ---------------------------------------------------------------------------
  // ÉTAPE 2 : L'ACTION (AJOUTER OU RETIRER DES FAVORIS)
  // ---------------------------------------------------------------------------
  const toggleWishlist = () => {
    // Sécurité : On ne fait rien si le produit n'est pas valide.
    if (!product?.id) return;

    // 1. On récupère la version la plus récente de la wishlist dans le localStorage.
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // 2. On vérifie si le produit y est déjà.
    const exist = wishlist.find((item) => item.id === product.id);

    // CAS A : LE PRODUIT EXISTE DÉJÀ -> ON REUT DE L'ENLEVER
    if (exist) {
      // On filtre le tableau : on garde TOUS les produits SAUF celui qu'on veut supprimer.
      wishlist = wishlist.filter((item) => item.id !== product.id);

      // On enregistre la nouvelle liste nettoyée dans le stockage du navigateur.
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      // On change le cœur en mode "vide/non liké" à l'écran.
      setLiked(false);
      
      // On affiche une petite notification rouge de succès/retrait.
      toast.error("Removed from wishlist");
    } 
    // CAS B : LE PRODUIT N'EXISTE PAS -> ON VEUT L'AJOUTER
    else {
      // On ajoute le produit entier à la fin de notre tableau.
      wishlist.push(product);

      // On enregistre le tableau mis à jour dans le stockage du navigateur.
      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      // On passe le cœur en mode "rempli/liké" à l'écran.
      setLiked(true);

      // On affiche une petite notification verte de succès.
      toast.success("Added to wishlist");
    }
    
    // ---------------------------------------------------------------------------
    // ÉTAPE 3 : LA SYNCHRONISATION (Événement Global)
    // ---------------------------------------------------------------------------
    // Cette ligne crie à l'ensemble du site : "Hé ! La wishlist a changé !".
    // Ça permet à d'autres composants (comme l'icône du panier ou du compteur dans la navbar) 
    // de se mettre à jour instantanément sans recharger la page.
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // Le hook renvoie ces deux éléments au composant HTML qui l'appelle :
  // - "liked" : pour savoir si le cœur doit être rouge ou vide.
  // - "toggleWishlist" : la fonction à brancher sur le bouton (onClick).
  return { liked, toggleWishlist };
};