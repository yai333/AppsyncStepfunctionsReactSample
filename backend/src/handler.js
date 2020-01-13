"use strict";
const AWS = require("aws-sdk");
AWS.config.region = "ap-southeast-2";
const stepfunctions = new AWS.StepFunctions({ apiVersion: "2016-11-23" });
const rp = require("request-promise");
const request = require("request");
const BASE_URL = "http://webjetapitest.azurewebsites.net/api";
const isTest = process.env.JEST_WORKER_ID;
const documentClient = new AWS.DynamoDB.DocumentClient({
  ...(isTest && {
    endpoint: "0.0.0.0:8000",
    sslEnabled: false,
    region: "local-env"
  })
});

module.exports.crawlMovies = async (event, context, callback) => {
  try {
    const movieTypes = {
      sources: [{ name: "filmworld" }, { name: "cinemaworld" }]
    };
    const params = {
      stateMachineArn: process.env.STATEMACHINE_ARN,
      input: JSON.stringify(movieTypes)
    };
    await stepfunctions.startExecution(params).promise();
  } catch (e) {
    console.log(e);
  } finally {
    callback(null);
  }
};

module.exports.getMovies = async (event, context, callback) => {
  try {
    const {
      accessToken,
      source: { name: source_name }
    } = event;
    const movies = await getMoviesFromAPI(source_name, accessToken);

    if (movies.length > 0) {
      callback(null, { movies });
    }
  } catch (e) {
    console.log(e);
    callback(e);
  } finally {
    callback(null);
  }
};

module.exports.syncMovieItem = async (event, context, callback) => {
  try {
    const {
      movieTable,
      accessToken,
      source: { source: source_name, id }
    } = event;
    let movie = await getMovieFromAPI(source_name, id, accessToken);
    movie.source = source_name;
    movie = lowercasekeys(movie);
    movie.id = id;
    if (movie.price) {
      movie.price = Number(movie.price);
    }
    const response = await putMovieToDB(movie, movieTable);
    callback(null, response);
  } catch (e) {
    console.log(e);
    callback(e);
  }
};

module.exports.documentClient = documentClient;

const getMoviesFromAPI = async (source, accessToken) => {
  const HEADERS = {
    "x-access-token": "application/json",
    "x-access-token": accessToken
  };

  const options = {
    url: `${BASE_URL}/${source}/movies`,
    headers: HEADERS
  };

  const response = await rp(options);

  if (response && typeof response === "string") {
    const responseObj = JSON.parse(response);
    if (responseObj.Movies) {
      return responseObj.Movies.map(movie => {
        return {
          source,
          id: movie.ID
        };
      });
    }
  }
  return [];
};

const getMovieFromAPI = async (source, id, accessToken) => {
  const HEADERS = {
    "x-access-token": "application/json",
    "x-access-token": accessToken
  };

  const options = {
    url: `${BASE_URL}/${source}/movie/${id}`,
    headers: HEADERS
  };

  const response = await rp(options);

  if (response && typeof response === "string") {
    const responseObj = JSON.parse(response);
    if (responseObj.Title) return responseObj;
  }
  return [];
};

const putMovieToDB = (movie, movieTable) => {
  const params = {
    TableName: movieTable,
    Item: { ...movie }
  };
  return documentClient.put(params).promise();
};

const lowercasekeys = origObj => {
  return Object.keys(origObj).reduce(function(newObj, key) {
    let val = origObj[key];
    let newVal = typeof val === "object" ? objectKeysToLowerCase(val) : val;
    newObj[key.toLowerCase()] = newVal;
    return newObj;
  }, {});
};
