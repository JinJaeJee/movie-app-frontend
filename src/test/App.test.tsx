import { describe, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

import Home from "../pages/Home";
import axios from "axios";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

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
    ];

    mockedAxios.get.mockResolvedValue({ data: movies });

    const { getByText, queryByText } = render(<Home />);

    await waitFor(() => {
      expect(queryByText("Movie 1")).toBeInTheDocument();
    });

    fireEvent.click(getByText("Movie 1"));
    expect(screen.getByText("Description 1")).toBeInTheDocument();
  });

  it("Sorts movie by release year", async () => {
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

    mockedAxios.get.mockResolvedValueOnce({ data: movies });

    const { getByLabelText, getByText, getAllByText } = render(<Home />);

    await waitFor(() => {
      // Check if Movie 1 and Movie 2 are in the document
      expect(getByText("Movie 1")).toBeInTheDocument();
      expect(getByText("Movie 2")).toBeInTheDocument();
    });
    const sortByYearDropdown = getByLabelText(
      "Sort by Year:"
    ) as HTMLSelectElement;

    fireEvent.change(sortByYearDropdown, { target: { value: "ascending" } });
    await waitFor(() => {
      // Check if Movie 1 comes before Movie 2 (ascending order)
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
});
