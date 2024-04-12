import { useState } from "react";

import { FaRegStar, FaSignOutAlt, FaTrash } from "react-icons/fa";
import { useAuth } from "./AuthProvider";

interface Movie {
  _id: string;
  id: number;
  title: string;
  genre: string[];
  releaseYear: number;
  description: string;
  thumbnailUrl: string;
  rating: number;
  movieId: string;
}

interface NavbarProps {
  favoriteMovies: Movie[];
  removeFromFavorites: (movie: Movie) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  favoriteMovies,
  removeFromFavorites,
}) => {
  const { user, logout } = useAuth();

  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const handleLogout = () => {
    logout();
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
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 pr-1">
            <img
              src={user?.image}
              alt="Avatar"
              className="w-6 h-6 rounded-full"
            />
          </div>
          <a
            className="text-white text-base font-medium hover:underline pr-5"
            href="#"
          >
            {user?.fullname}
          </a>

          <button className="text-white text-base font-medium hover:underline pr-4">
            <FaRegStar className="w-5 h-5" onClick={toggleFavorites} />
          </button>
          <button
            className="text-white text-base font-medium hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex gap-2 items-center justify-center md:hidden text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition duration-150 ease-in-out">
        <div className="flex flex-col space-y-2">
          <FaRegStar className="w-6 h-6 cursor-pointer hover:text-yellow-500" />
          <FaSignOutAlt className="w-6 h-6 cursor-pointer hover:text-red-500" />
        </div>
      </div>
      {showFavorites && favoriteMovies.length > 0 && (
        <div className="absolute top-16 right-0 bg-gray-800 rounded-lg p-4 shadow-md">
          <h3 className="text-white font-bold mb-2">Favorite Movies</h3>
          {favoriteMovies.map((movie, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <img
                src={movie.thumbnailUrl}
                alt={movie.title}
                className="w-10 h-10 rounded-md"
              />
              <span className="text-white">{movie.title}</span>
              <FaTrash
                className="w-4 h-4 text-red-500 cursor-pointer"
                onClick={() => removeFromFavorites(movie)}
              />
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
