import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import getMoviesQuery from "graphql/getMovies";
import MovieGridList from "components/list/MovieList";
import Header from "components/header/Header";
import Loading from "components/loading/Loading";
import NoDataFound from "components/error/NoDataFound";
import MainStyle from "assets/styles/main";

const useStyles = makeStyles(theme => MainStyle(theme));

export default function Main() {
  const classes = useStyles();
  const [limit, setLimit] = useState(1);
  const { loading, error, data } = useQuery(getMoviesQuery, {
    variables: { limit: limit || 1, nextToken: "" }
  });

  if (loading) return <Loading width={"200"} />;
  if (error) return <NoDataFound />;

  const filterMovies = (option, newFilter) => {
    newFilter && setLimit(Number(newFilter));
  };

  const {
    getMovies: { items: movies }
  } = data;

  return (
    <div className={classes.root}>
      <Header filterMovies={filterMovies} movieLimit={limit} />
      <MovieGridList movies={movies} />
    </div>
  );
}
