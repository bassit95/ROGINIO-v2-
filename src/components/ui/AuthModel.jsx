import React, { useEffect, useState } from 'react';
import { X, Lock, User, Mail, AlertCircle, Eye, EyeOff,ArrowBigRight  } from "lucide-react";

const INITIAL_STATE = {
  username: "",
  email: "",
  password: "",
};

const AuthModel = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [erreurs, setErreurs] = useState({});

  // Gestion de l'animation de fermeture (Compte à rebours 300ms)
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Capture et mise à jour dynamique des champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (erreurs[name]) {
      setErreurs((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation du formulaire (Correction du bug de longueur de mot de passe)
  const valider = () => {
    const e = {};
    if (!formData.username.trim()) e.username = "Le nom d'utilisateur est obligatoire";
    
    // L'email n'est requis que si on est sur la vue "Inscription" ( !isLogin )
    if (!isLogin) {
      if (!formData.email.trim()) e.email = "L'adresse email est obligatoire";
      else if (!formData.email.includes("@")) e.email = "Format d'email invalide";
    }
    
    if (!formData.password) e.password = "Le mot de passe est obligatoire";
    else if (formData.password.length < 6) e.password = "6 caractères minimum"; 

    return e;
  };

  // Soumission
  const handleSubmit = (e) => {
    e.preventDefault();
    const erreursValidation = valider();
    setErreurs(erreursValidation);

    if (Object.keys(erreursValidation).length === 0) {
      console.log("Formulaire valide !", formData);
      setFormData(INITIAL_STATE);
      setShowPassword(false);
      onClose();
    }
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      
      {/* 1. Arrière-plan noir flouté et cliquable */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      {/* 2. Fenêtre de la Modale Blanche Animée */}
      <div className={`relative w-full max-w-md bg-white  border-b-amber-600 shadow-2xl overflow-hidden transition-transform duration-500 ease-out transform p-8 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}`}>
        
        {/* Bouton Fermer (X) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer z-20"
        >
          <X size={20} />
        </button>

        {/* Contenu principal */}
        <div className="relative z-10">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {isLogin ? "Welcome Back" : "Join Us"}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              {isLogin ? "Login to access your dashboard" : "Create an account to get started"}
            </p>
          </header>

           {/* Formulaire connecté au handleSubmit */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Champ Username */}
              <div>
                <InputGroup 
                  icon={<User size={18} />} 
                  placeholder="Username" 
                  type="text" 
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  hasError={!!erreurs.username}
                />
                {erreurs.username && (
                  <p className="text-red-400 text-xs mt-1.5 ml-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {erreurs.username}
                  </p>
                )}
              </div>
              
              {/* Champ Email conditionnel */}
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isLogin ? "max-h-0 opacity-0 pointer-events-none" : "max-h-24 opacity-100 mt-4"}`}>
                <InputGroup 
                  icon={<Mail size={18} />} 
                  placeholder="Email Address" 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  hasError={!!erreurs.email}
                />
                {erreurs.email && !isLogin && (
                  <p className="text-red-400 text-xs mt-1.5 ml-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {erreurs.email}
                  </p>
                )}
              </div>
              
              {/* Champ Password avec l'icône interactive à droite */}
              <div>
                <InputGroup 
                  icon={<Lock size={18} />} 
                  placeholder="Password" 
                  type={showPassword ? "text" : "password"} // Alterne dynamiquement entre text et password
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  hasError={!!erreurs.password}
                  rightElement={
                    <button
                      type="button" // Important pour éviter de soumettre le formulaire par erreur au clic
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-white transition-colors cursor-pointer focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
                {erreurs.password && (
                  <p className="text-red-400 text-xs mt-1.5 ml-2 flex items-center gap-1">
                    <AlertCircle size={12} /> {erreurs.password}
                  </p>
                )}
              </div>
              
           {/* Bouton de soumission */}
<button 
  type="submit" 
  className="group relative w-full h-12 mt-6 text-black font-bold overflow-hidden transition-all active:scale-[0.98] bg-white cursor-pointer border border-black"
>
  {/* Le dégradé au survol */}
  <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  
  {/* Le texte et l'icône */}
  <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors h-full w-full">
    {isLogin ? "Sign In" : "Create Account"}
    <ArrowBigRight size={18} className="transition-transform group-hover:translate-x-1" />
  </span>
</button>
            </form>

             <div className="flex items-center my-6 gap-4">
              <div className="h-px flex-1 bg-black/20"></div>
              <span className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">OR</span>
              <div className="h-px flex-1 bg-black/20"></div>
            </div>

                {/* Footer de bascule */}
            <footer className="mt-4 text-center text-sm">
              <span className="text-gray-600">
                {isLogin ? "New here?" : "Already have an account?"}
              </span>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setFormData(INITIAL_STATE);
                  setErreurs({});
                  setShowPassword(false);
                }}
                className="ml-2 text-gray-400 font-bold hover:text-purple-400 transition-colors cursor-pointer"
              >
                {isLogin ? "Create Account" : "Log In"}
              </button>
            </footer>
        </div>
      </div>
    </div>
  );
};

// Composant InputGroup mis à jour pour accepter et afficher "rightElement"
const InputGroup = ({ icon, hasError, rightElement, ...props }) => (
  <div
    className={`flex items-center gap-3 px-4 py-3.5 bg-[#0a0a0a] rounded-none border transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] group
      ${hasError 
        ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/20" 
        : "border-white/5 focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/10"
      }`}
  >
    <div className={`transition-colors ${hasError ? "text-red-400" : "text-gray-500 group-focus-within:text-white"}`}>
      {icon}
    </div>
    
    <input
      {...props}
      className="bg-transparent border-none outline-none w-full text-white placeholder-gray-600 text-sm flex-1"
    />

    {/* Si un élément à droite est fourni (comme notre bouton d'œil), on l'affiche ici */}
    {rightElement && (
      <div className="flex items-center justify-center">
        {rightElement}
      </div>
    )}
  </div>
);
export default AuthModel;