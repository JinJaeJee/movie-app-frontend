import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../components/AuthProvider";

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
  const { user } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  console.log(user?.userID);

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

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3333/favorite-movies/${user?.userID}`
        );

        console.log(response.data);

        setFavoriteMovies(response.data);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };

    if (user?.userID) {
      fetchFavoriteMovies();
    }
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

  const addToFavorites = () => {};

  const removeFromFavorites = (movie: Movie) => {
    const userFavoritesKey = `user_${user?.userID}_favorites`;
    const updatedFavorites = favoriteMovies.filter(
      (m: Movie) => m._id !== movie._id
    );
    localStorage.setItem(userFavoritesKey, JSON.stringify(updatedFavorites));
    setFavoriteMovies(updatedFavorites);
  };

  return (
    <div className="min-h-screen">
      <Navbar
        favoriteMovies={favoriteMovies}
        removeFromFavorites={removeFromFavorites}
      />
      <div className="container mx-auto px-4 py-8">
        <Search handleSearch={handleSearch} />
        <MovieList
          movies={searchResults.length > 0 ? searchResults : movies}
          addToFavorites={addToFavorites}
        />
      </div>
    </div>
  );
};

export default Home;
