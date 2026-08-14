import { MoveRight } from "lucide-react"
import { Link } from "react-router-dom"

const WorkCard = ({ id, title, image, number }) => {
  return (
    <>
      <Link to={`/work/${id}`} className="service-card block overflow-hidden group relative">
        <div className="service-image w-full overflow-hidden rounded-sm">
          <img src={image} alt={title} className="section-image group-hover:scale-110 transition-all duration-300" />
        </div>

        <div className="service-info flex justify-between items-center">
          <div className="flex items-center gap-2 text-2xl font-medium py-5 -translate-x-10 group-hover:translate-x-0 transition-all duration-300">
            <span>{number}</span>
            <h3>{title}</h3>
          </div>
          <MoveRight />
        </div>
      </Link>
    </>
  )
}

export default WorkCard