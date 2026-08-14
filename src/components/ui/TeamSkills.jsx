import React from 'react'

/**
 * Composant TeamSkills
 * Affiche une liste de compétences sous forme de barres de progression.
 * * @param {Object} props - Les propriétés passées au composant.
 * @param {Array<Object>} props.skills - Un tableau contenant les compétences (ex: [{"React": "80%", "CSS": "90%"}])
 */
function TeamSkills({ skills }) {

    // Object.entries() transforme l'objet de compétences (ex: {"React": "80%"}) 
    // en un tableau de couples [clé, valeur] (ex: [["React", "80%"]]) pour pouvoir le parcourir avec .map().
    // On cible ici le premier objet du tableau `skills` (skills[0]).
    const skillEntries = Object.entries(skills[0]);

  return (
    <>
      {/* --- Titre de la section --- */}
      <h3 className='text-2xl sm:text-3xl lg:text-4xl font-medium pb-6'>
         Skills
      </h3>
    
      {/* --- Conteneur de la liste des compétences (espacement vertical entre chaque barre) --- */}
      <div className="space-y-6">
        {/* On parcourt chaque compétence récupérée. 
            Le tableau [name, value] correspond à [nom_de_la_competence, pourcentage] */}
        {skillEntries.map(([name, value], index) => (
          <div key={index}>
            
            {/* --- En-tête de la compétence (Nom à gauche, Valeur/Pourcentage à droite) --- */}
            <div className="flex justify-between mb-2">
                {/* Nom de la compétence (ex: "React") */}
                <span className="font-semibold">
                  {name}
                </span>
                {/* Valeur ou pourcentage (ex: "80%") */}
                <span>
                  {value}
                </span>
            </div>

            {/* --- Barre de progression globale (fond gris clair) --- */}
            <div className="w-full h-2 bg-gray-200">
               {/* --- Jauge active colorée --- 
                   La largeur (width) est définie dynamiquement en ligne avec la valeur (ex: style={{ width: "80%" }}) */}
               <div 
                 className="h-2 bg-[#9c7a5b]"
                 style={{ width: value }}
               >
               </div>
            </div>
             
          </div>
        ))}
      </div>
    </>
  )
}

export default TeamSkills