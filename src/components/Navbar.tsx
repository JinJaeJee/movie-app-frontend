import { useState } from "react";
import { NAV_RIGHTS } from "../constants/data/navbar";
import { FaRegStar, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isUserLogin, setIsUserLogin] = useState(false);

  const handleLogout = () => {
    setIsUserLogin(!isUserLogin);
  };

  return (
    <header className="bg-zinc-900 px-4 py-2 flex justify-between items-center sticky top-0 z-50 transition duration-500 text-white pt-5">
      <a
        className="cursor-pointer font-bold text-white tracking-wider text-xl md:text-2xl"
        href="/"
      >
        Movie Application
      </a>
      <nav className="hidden md:flex md:items-center md:gap-4">
        {isUserLogin ? (
          <ul className="space-y-2 flex flex-col">
            {NAV_RIGHTS.map((link, index) => (
              <li key={index} className="py-1">
                <a
                  className="text-white text-base font-medium hover:underline"
                  href={link.url}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 pr-1">
              <img
                src="https://i.pravatar.cc/40?u=fakeuser"
                alt="Avatar"
                className="w-6 h-6 rounded-full"
              />
            </div>
            <a
              className="text-white text-base font-medium hover:underline pr-10"
              href="#"
            >
              Fullname
            </a>

            <button className="text-white text-base font-medium hover:underline pr-4">
              <FaRegStar className="w-5 h-5" />
            </button>
            <button
              className="text-white text-base font-medium hover:underline"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
      <div className="flex gap-2 items-center justify-center md:hidden text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-150 ease-in-out">
        {isUserLogin ? (
          <div>
            <FaSignInAlt className="w-6 h-6 cursor-pointer hover:text-red-500" />
          </div>
        ) : (
          <div className="flex flex-col space-y-2">
            <FaRegStar className="w-6 h-6 cursor-pointer hover:text-yellow-500" />
            <FaSignOutAlt className="w-6 h-6 cursor-pointer hover:text-red-500" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
