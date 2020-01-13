import React from "react";
import TestRenderer from "react-test-renderer";
import wait from "waait";
import MovieList from "./MovieList";

it("Render Movie list component without movies data given", async () => {
  const component = TestRenderer.create(<MovieList movies={[]} />);
  await wait();
  const tree = component.toJSON();
  expect(JSON.stringify(tree.children)).toContain("No movies data found");
});

it("Render Movie list component with movies data given", async () => {
  const movies = [
    {
      id: "cw0121765",
      source: "cinemaworld",
      details: {
        title: "Star Wars: Episode II - Attack of the Clones",
        year: "2002",
        poster:
          "https://images-na.ssl-images-amazon.com/images/M/MV5BNDRkYzA4OGYtOTBjYy00YzFiLThhYmYtMWUzMDBmMmZkM2M3XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg",
        rated: "PG",
        released: "16 May 2002",
        runtime: "142 min",
        director: "George Lucas",
        plot:
          "Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé, while Obi-Wan investigates an assassination attempt on the Senator and discovers a secret clone army crafted for the Jedi.",
        language: "English",
        country: "USA",
        votes: "469,134",
        price: 12.5
      }
    }
  ];
  const component = TestRenderer.create(<MovieList movies={movies} />);
  await wait();
  const tree = component.toJSON();
  expect(JSON.stringify(tree.children)).toContain(
    "Star Wars: Episode II - Attack of the Clones"
  );
  expect(JSON.stringify(tree.children)).toContain("12.5");
});
