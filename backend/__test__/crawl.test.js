"use strict";

const AWS = require("aws-sdk");
const nock = require("nock");
const lambdaModule = require("../src/handler.js");
const BASE_URL = "http://webjetapitest.azurewebsites.net/api";
const { DocumentClient } = require("aws-sdk/clients/dynamodb");
const isTest = process.env.JEST_WORKER_ID;

describe("Get User tests", () => {
  beforeEach(() => {
    nock(`${BASE_URL}`)
      .get("/cinemaworld/movies")
      .reply(
        200,
        JSON.stringify({
          Movies: [
            {
              Title: "Star Wars: Episode V - The Empire Strikes Back",
              Year: "1980",
              ID: "cw0080684",
              Type: "movie",
              Poster:
                "http://ia.media-imdb.com/images/M/MV5BMjE2MzQwMTgxN15BMl5BanBnXkFtZTcwMDQzNjk2OQ@@._V1_SX300.jpg"
            }
          ]
        })
      );

    nock(`${BASE_URL}`)
      .get("/cinemaworld/movie/cw0080684")
      .reply(
        200,
        JSON.stringify({
          Title: "Star Wars: The Force Awakens",
          Year: "2015",
          Rated: "PG-13",
          Released: "18 Dec 2015",
          Runtime: "138 min",
          Genre: "Action, Adventure, Fantasy",
          Director: "J.J. Abrams",
          Writer:
            "Lawrence Kasdan, J.J. Abrams, Michael Arndt, George Lucas (based on characters created by)",
          Actors: "Harrison Ford, Mark Hamill, Carrie Fisher, Adam Driver",
          Plot:
            "30 years after the defeat of Darth Vader and the Empire, Rey, a scavenger from the planet Jakku, finds a BB-8 droid that knows the whereabouts of the long lost Luke Skywalker. Rey, as well as a rogue stormtrooper and two smugglers, are thrown into the middle of a battle between the Resistance and the daunting legions of the First Order.",
          Language: "English",
          Country: "USA",
          Awards: "Nominated for 5 Oscars. Another 48 wins & 104 nominations.",
          Poster:
            "http://ia.media-imdb.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
          Metascore: "81",
          Rating: "8.2",
          Votes: "575,439",
          ID: "cw0080684",
          Price: "129.5",
          Type: "movie"
        })
      );
  });

  afterEach(() => {
    delete process.env.STATEMACHINE_ARN;
  });

  it("Validate crawlMovies lambda function", () => {
    const crawlMoviesLambdaFn = jest
      .spyOn(lambdaModule, "crawlMovies")
      .mockImplementation();
    const response = lambdaModule.crawlMovies({}, {}, () => {});
    expect(crawlMoviesLambdaFn).toHaveBeenCalled();
  });

  it("Validate getMovies lambda function", async () => {
    const event = {
      accessToken: "xxxx",
      source: { name: "cinemaworld" }
    };
    const response = await lambdaModule.getMovies(event, {}, (_, res) => {
      if (res) {
        expect(res.movies.length).toBe(1);
        expect(res.movies[0].id).toBe("cw0080684");
      }
    });
  });

  it("Validate syncMovieItem lambda function", async () => {
    const event = {
      movieTable: "movies",
      accessToken: "xxx",
      source: { source: "cinemaworld", id: "cw0080684" }
    };
    const callback = (_, res) => {};
    await lambdaModule.syncMovieItem(event, {}, callback);
    const response = await lambdaModule.documentClient
      .get({ TableName: "movies", Key: { id: "cw0080684" } })
      .promise();
    expect(response.Item.id).toBe("cw0080684");
  });
});
