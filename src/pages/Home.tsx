import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import axios from "axios";

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
  const [searchResults, setSearchResults] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3333/movies/getAlls"
        );
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (searchParams: string) => {
    try {
      const formattedSearchParams = searchParams.replace(/\s/g, "_");
      const response = await axios.get(
        `http://localhost:3333/movies/search?query=${formattedSearchParams}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Search handleSearch={handleSearch} />
        <MovieList movies={searchResults.length > 0 ? searchResults : movies} />
      </div>
    </div>
  );
};

export default Home;
