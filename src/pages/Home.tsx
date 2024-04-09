import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import Navbar from "../components/Navbar";

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
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Search />
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default Home;
