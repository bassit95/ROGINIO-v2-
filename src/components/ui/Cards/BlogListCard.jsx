import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogListCard = ({ blog }) => {
    const navigate = useNavigate();

    return (
        <div className="blog-card flex flex-col lg:flex-row gap-8 bg-white shadow-lg rounded-sm group p-5 lg:p-2 recent-item">
            <div className="lg:w-1/2 w-full overflow-hidden rounded-sm">
                <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300" 
                />
            </div>

            <div className="lg:w-1/2 w-full flex flex-col justify-center py-5">
                <span className="bg-primary text-white px-3 py-1 rounded-sm text-sm w-fit">
                    {blog.category}
                </span>

                <h2 className="text-2xl sm:text-2xl font-medium mt-5 mb-6">
                    {blog.title}
                </h2>

                <p className="line-clamp-2 mb-6 text-gray-600">
                    {blog.description}
                </p>

                <div className="w-8 h-px bg-black mb-6"></div>

                <ul className="flex text-gray-500 mb-6">
                    <li className="mr-2">
                        {blog.date} •
                    </li>
                    <li>
                        {blog.comments}
                    </li>
                </ul>

                <button 
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="bg-primary text-white px-6 py-2 w-fit hover:bg-black transition cursor-pointer"
                >
                    Read More
                </button>
            </div>
        </div>
    )
}

export default BlogListCard