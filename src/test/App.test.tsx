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
});
