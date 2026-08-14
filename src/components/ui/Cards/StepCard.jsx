
function StepCard({number,title,description}) {
  return (
    <>
      <div className="step-card text-center relative px-6 py-10 group">
        <h2 className="text-[80px] font-bold text-[#b79b6c] leading-none mb-4">
           {number}
        </h2>
        <h3 className='text-xl font-semibold mb-3' >
            {title}
        </h3>
        <p className='text-gray-600 text-sm leading-relaxed '>{description }</p>
      </div>
    </>
  )
}

export default StepCard