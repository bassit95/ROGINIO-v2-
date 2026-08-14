import { Link } from "react-router-dom";
import { Facebook, Twitter, Dribbble, Instagram } from "lucide-react";

function SocialIcons() {
  const socials = [
    { icon: <Facebook />, link: "https://www.facebook.com/", gradient: "from-blue-600 to-blue-400" },
    { icon: <Twitter />, link: "https://www.x.com/", gradient: "from-sky-400 to-sky-600" },
    { icon: <Dribbble />, link: "https://www.dribbble.com/", gradient: "from-pink-500 to-pink-400" }, // Correction du lien Dribbble
    { icon: <Instagram />, link: "https://www.instagram.com/", gradient: "from-yellow-400 via-pink-500 to-purple-600" }
  ];

  return (
    <ul className="flex space-x-5 relative"> {/* Correction de la faute de frappe "realtive" */}
      {socials.map((item, idx) => (
        <li key={idx} className="w-12 h-12 rounded-sm overflow-hidden">
          <Link
            to={item.link}
            className={`flex justify-center items-center w-full h-full text-white transform transition duration-500 bg-linear-to-r ${item.gradient} hover:rotate-y-180 hover:scale-110`}
          >
            {item.icon}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SocialIcons;