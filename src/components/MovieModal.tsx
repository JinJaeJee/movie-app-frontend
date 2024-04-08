import React from "react";
import { FaTimes } from "react-icons/fa";

interface Movie {
  _id: string;
  id: number;
  title: string;
  genre: string[];
  releaseYear: number;
  description: string;
  thumbnailUrl: string;
  rating: number;
}

interface MovieModalProps {
  movie: Movie;
  closeModal: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, closeModal }) => {
  const handleClickInsideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-900 bg-opacity-75 backdrop-blur-2xl"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden max-w-2xl w-full px-4 py-5"
        onClick={handleClickInsideModal}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{movie.title}</h2>
          <button
            type="button"
            onClick={closeModal}
            className="focus:outline-none"
          >
            <FaTimes size={24} className="text-gray-800 hover:text-red-500" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center">
            <img
              src={movie.thumbnailUrl}
              alt={movie.title}
              className="w-full rounded-lg object-cover"
            />
          </div>
          <div>
            <p className="text-base leading-relaxed text-gray-700 mb-4">
              {movie.description}
            </p>
            <div className="flex flex-wrap items-center mb-2">
              <span className="text-sm font-medium text-gray-500 mr-2">
                Genre:
              </span>
              <span className="text-sm text-gray-700">
                {movie.genre.join(", ")}
              </span>
            </div>
            <div className="flex flex-wrap items-center mb-2">
              <span className="text-sm font-medium text-gray-500 mr-2">
                Release Year:
              </span>
              <span className="text-sm text-gray-700">{movie.releaseYear}</span>
            </div>
            <div className="flex flex-wrap items-center mb-2">
              <span className="text-sm font-medium text-gray-500 mr-2">
                Rating:
              </span>
              <span className="text-sm text-gray-700">{movie.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
