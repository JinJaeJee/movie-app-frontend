import { FaStar } from "react-icons/fa";
import MovieModal from "./MovieModal";
import { useEffect, useState } from "react";
import SortMovies from "./SortMovie";
import Pagination from "./Pagination";

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

interface MovieListProps {
  movies: Movie[];
  addToFavorites: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, addToFavorites }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortedMovies, setSortedMovies] = useState<Movie[]>(movies);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    setSortedMovies(movies);
  }, [movies]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstItem, indexOfLastItem);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleSort = (sortOption: string) => {
    let sorted;
    if (sortOption === "ascending") {
      sorted = [...movies].sort((a, b) => a.releaseYear - b.releaseYear);
    } else if (sortOption === "descending") {
      sorted = [...movies].sort((a, b) => b.releaseYear - a.releaseYear);
    } else if (sortOption === "high-to-low") {
      sorted = [...movies].sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "low-to-high") {
      sorted = [...movies].sort((a, b) => a.rating - b.rating);
    }
    setSortedMovies(sorted || []);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleClickInsideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="container mx-auto px-4 pb-10">
      <h1 className="text-3xl font-bold my-8 text-white">Movie List</h1>
      <SortMovies onSort={handleSort} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="relative flex flex-col curser-pointer"
            onClick={() => openModal(movie)}
            role="button"
            tabIndex={0}
          >
            <div className="h-[45rem] overflow-hidden rounded-md relative mb-2 group">
              <img
                src={movie.thumbnailUrl}
                alt={movie.title}
                className="object-cover object-center w-full h-full rounded-md"
              />
              <div onClick={handleClickInsideModal}>
                <FaStar
                  className="absolute top-2 right-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  size={30}
                  onClick={(e) => {
                    addToFavorites(movie);
                    e.stopPropagation();
                  }}
                  data-testid={`star-icon-add-fav-${movie._id}`}
                />
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <p className="text-gray-700 mb-2">
                Genre: {movie.genre.join(", ")}
              </p>
              <p className="text-gray-700 mb-2">
                Release Year: {movie.releaseYear}
              </p>
              <p className="text-gray-700 mb-2">Rating: {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} closeModal={closeModal} />
      )}
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(sortedMovies.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MovieList;
