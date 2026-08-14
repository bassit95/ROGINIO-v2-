import React from 'react'
import { Link } from 'react-router-dom'

const ServiceCard = ({ id, title, image, category }) => {
    return (
        <>
            <Link to={`/service/${id}`} className="service-card block group">
                <div className="srv-image rounded-full overflow-hidden w-80 h-80 mx-auto mb-8">
                    <img src={image} alt={title} className="section-image group-hover:scale-110 transition duration-300" />
                </div>

                <div className="srv-content text-center">
                    <span className="text-lg pb-2 block text-gray-500 font-medium">
                        {category}
                    </span>

                    <h4 className="text-3xl font-medium pb-5">{title}</h4>

                    <p className="text-md text-paragraph">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laborum vel iste ipsum error!
                    </p>
                </div>
            </Link>
        </>
    )
}

export default ServiceCard