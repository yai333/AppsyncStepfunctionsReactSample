import React from "react";
import TestRenderer from "react-test-renderer";
import wait from "waait";
import { MockedProvider } from "@apollo/react-testing";
import Main from "./Main";
import getMoviesQuery from "graphql/getMovies";

it("Render Main component with grapqhl data returned", async () => {
  const Mocks = [
    {
      request: {
        query: getMoviesQuery,
        variables: {
          limit: 1,
          nextToken: ""
        }
      },
      result: () => {
        return {
          data: {
            getMovies: {
              __typename: "Movies",
              nextToken: "",
              totalCount: null,
              items: [
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
              ]
            }
          }
        };
      }
    }
  ];
  const component = TestRenderer.create(
    <MockedProvider mocks={Mocks} addTypename={false}>
      <Main />
    </MockedProvider>
  );
  await wait();
  const tree = component.toJSON();
  expect(tree.children.length).toBe(2);
});

it("Render Main component without grapqhl data", async () => {
  const Mocks = [
    {
      request: {
        query: getMoviesQuery,
        variables: {
          limit: 1,
          nextToken: ""
        }
      },
      result: () => {
        return null;
      }
    }
  ];
  const component = TestRenderer.create(
    <MockedProvider mocks={Mocks} addTypename={false}>
      <Main />
    </MockedProvider>
  );
  await wait();
  const tree = component.toJSON();
  expect(tree.children[0].props.src).toEqual("uhoh.png");
});
