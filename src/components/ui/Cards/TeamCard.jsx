import { Link } from "react-router-dom";


function TeamCard({image,name,category,id}) {
  return (
   <>
    <div className="border border-gray-300/50 p-5 rounded-sm group team-card">
     
     <Link to={`/team/${id}`}>
       <div className="team-image w-full rounded-sm overflow-hidden">
         <img 
          src={image}
          alt={name} 
          className='secction-image grayscale-100 group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110'
          />
       </div>
     </Link>
    
     <Link 
     to={`/team/${id}`}
     className ="team-content mt-4 text-center block"
     >
     <h3 className='text-xl font-semibold'>{name}</h3>
     <p className='text-gray-500'>{category}</p>
     </Link>
    </div>
   
   
   
   </>
  )
}

export default TeamCard