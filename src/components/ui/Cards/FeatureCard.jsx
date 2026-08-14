

function FeatureCard({image, Icon, title ,description }) {
  return (
    <>
      <div>
        <div className="feature-card flex justify-center items-end pb-8 relative 
        h-90 group overflow-hidden rounded-md">
         <img src={image} alt={title}  className='absolute inset-0 w-full h-full object-cover 
         transition-transform duration-500 group-hover:scale-110'
         />

         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500" >
        </div>

        <div className="text-white relative z-1 px-5 text-center transform translate-y-12 group-hover:translate-y-0 transition-all duration-500">
            <Icon size={60}  className="mx-auto mb-4"/>
            <h5 className='mb-3 text-2xl font-semibold'>{title}</h5>
            <p className="text-sm opacity-0 group-hover:opacity-100
            transition-opacity duration-500 delay-200 leading-wider">
            {description}
            </p>
        </div>
        </div>
      </div>
    </>
  )
}

export default FeatureCard