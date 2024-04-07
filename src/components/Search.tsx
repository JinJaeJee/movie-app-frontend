import axios from "axios";
import { useState } from "react";

const Search = () => {
  const [searchParams, setSearchParams] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `API_ENDPOINT/search?query=${searchParams}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          placeholder="Search..."
        />
        <button className="text-white mx-2" type="submit">
          Search
        </button>
      </form>
      <div>{searchResults}</div>
    </div>
  );
};

export default Search;
