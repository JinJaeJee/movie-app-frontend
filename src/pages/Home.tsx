import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import NavbarRightItem from "../components/NavbarRightItem";
import Search from "../components/Search";

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

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/movies/getAlls")
      .then((response) => response.json())
      .then((data: Movie[]) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div>
      <header className="px-10 py-20 z-1000 w-full flex justify-between items-center transition duration-500">
        <a
          className="cursor-pointer font-bold text-white tracking-wider"
          href="/"
        >
          Movie Application
        </a>
        <ul>
          <NavbarRightItem />
        </ul>
      </header>
      <Search />
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
