import React from "react";

interface SortMoviesProps {
  onSort: (sortOption: string) => void;
}

const SortMovies: React.FC<SortMoviesProps> = ({ onSort }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    onSort(selectedOption);
  };

  return (
    <div className="flex flex-wrap items-center justify-end space-x-4 pb-5">
      <label className="text-white mr-2" htmlFor="sort-by-year">
        Sort by Year:
      </label>
      <select
        id="sort-by-year"
        onChange={handleSortChange}
        className="border border-gray-300 rounded-md p-1 w-full sm:w-auto"
      >
        <option value="ascending">Oldest</option>
        <option value="descending">Newest</option>
      </select>
      <label className="text-white mr-2" htmlFor="sort-by-rating">
        Sort by Rating:
      </label>
      <select
        id="sort-by-rating"
        onChange={handleSortChange}
        className="border border-gray-300 rounded-md p-1 w-full sm:w-auto"
      >
        <option value="high-to-low">High to Low</option>
        <option value="low-to-high">Low to High</option>
      </select>
    </div>
  );
};

export default SortMovies;
