import { useState } from "react";

interface SearchProps {
  handleSearch: (searchParams: string) => void;
}

const Search: React.FC<SearchProps> = ({ handleSearch }) => {
  const [searchParams, setSearchParams] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchParams);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchParams);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center mb-4"
      >
        <input
          type="text"
          value={searchParams}
          onChange={(e) => setSearchParams(e.target.value)}
          onKeyDown={handleKeyPress}
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
    </div>
  );
};

export default Search;
