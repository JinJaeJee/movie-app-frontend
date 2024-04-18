import { describe, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";
import Home from "../pages/Home";
import axios from "axios";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const movies = [
  {
    _id: "1",
    id: 1,
    title: "Movie 1",
    genre: ["Action", "Adventure"],
    releaseYear: 2020,
    description: "Description 1",
    thumbnailUrl: "thumbnail1.jpg",
    rating: 4.5,
    movieId: "movie1",
  },
  {
    _id: "2",
    id: 2,
    title: "Movie 2",
    genre: ["Comedy"],
    releaseYear: 2018,
    description: "Description 2",
    thumbnailUrl: "thumbnail2.jpg",
    rating: 3.8,
    movieId: "movie2",
  },
  {
    _id: "3",
    id: 3,
    title: "Movie 3",
    genre: ["Action", "Adventure"],
    releaseYear: 2020,
    description: "Description 3",
    thumbnailUrl: "thumbnail3.jpg",
    rating: 5.5,
    movieId: "movie3",
  },
  {
    _id: "4",
    id: 4,
    title: "Movie 4",
    genre: ["Comedy"],
    releaseYear: 2018,
    description: "Description 4",
    thumbnailUrl: "thumbnail4.jpg",
    rating: 6.8,
    movieId: "movie4",
  },
];

describe("App", () => {
  it("rennder Movie Application", () => {
    render(<App />);
    expect(screen.getByText(/Movie Application/)).toBeInTheDocument();
  });

  it("rennder Sort by Year:", () => {
    render(<App />);
    expect(screen.getByText(/Sort by Year:/)).toBeInTheDocument();
  });
});

describe("Home Component", () => {
  it("Renders MovieList and opens MovieModal on clicking a movie", async () => {
    mockedAxios.get.mockResolvedValue({ data: movies });

    const { getByText, queryByText } = render(<Home />);

    await waitFor(() => {
      expect(queryByText("Movie 1")).toBeInTheDocument();
    });

    fireEvent.click(getByText("Movie 1"));
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  it("Sorts movie by release year", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: movies });

    const { getByLabelText, getByText, getAllByText } = render(<Home />);

    await waitFor(() => {
      expect(getByText("Movie 1")).toBeInTheDocument();
      expect(getByText("Movie 2")).toBeInTheDocument();
    });
    const sortByYearDropdown = getByLabelText(
      "Sort by Year:"
    ) as HTMLSelectElement;

    fireEvent.change(sortByYearDropdown, { target: { value: "ascending" } });
    await waitFor(() => {
      const movieTitles = getAllByText(/Movie \d/);
      const movie1Index = movieTitles.findIndex(
        (element) => element.textContent === "Movie 1"
      );
      const movie2Index = movieTitles.findIndex(
        (element) => element.textContent === "Movie 2"
      );
      expect(movie2Index).toBeLessThan(movie1Index);
    });
  });

  it("adds movie to favorites when star icon click", async () => {
    mockedAxios.get.mockResolvedValue({ data: movies });
    const { getByText, getByTestId } = render(<Home />);

    await waitFor(() => {
      expect(getByText("Movie 1")).toBeInTheDocument();
    });
    const checkListFavstarIcon = getByTestId("star-icon-check-fav");
    const testIconName = `star-icon-add-fav-${movies[1]._id}`;
    const addFavToList = getByTestId(testIconName);

    fireEvent.click(addFavToList);
    fireEvent.click(checkListFavstarIcon);

    await waitFor(() => {
      expect(getByTestId("favorite-movies-container")).toHaveTextContent(
        "Movie 1"
      );
    });
  });
});

describe("test fav delete", () => {
  it("Remove a movie from the favorites list check no longer displayed", async () => {
    mockedAxios.get.mockResolvedValue({ data: movies });
    const { getByText, getByTestId } = render(<Home />);
    await waitFor(() => {
      expect(getByText("Movie 1")).toBeInTheDocument();
    });

    const checkListFavstarIcon = getByTestId("star-icon-check-fav");
    const testIconName = `star-icon-add-fav-1`;
    const addFavToList1 = getByTestId(testIconName);
    fireEvent.click(addFavToList1);
    fireEvent.click(checkListFavstarIcon);
    await waitFor(() => {
      expect(getByTestId("favorite-movies-container")).toHaveTextContent(
        "Movie 1"
      );
    });
    const trashBinIcon = getByTestId(`trash-icon-remove-fav-1`);
    fireEvent.click(checkListFavstarIcon);
    fireEvent.click(trashBinIcon);
  });
});
