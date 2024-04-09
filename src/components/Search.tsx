import axios from "axios";
import { useState } from "react";

interface SearchResult {}

const Search: React.FC<SearchResult> = () => {
  const [searchParams, setSearchParams] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
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
    <div className="container mx-auto px-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center mb-4"
      >
        <input
          type="text"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300 m-2 w-full sm:w-3/5"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 m-2"
        >
          Search
        </button>
      </form>
      <div className="mt-4">{searchResults}</div>
    </div>
  );
};

export default Search;
