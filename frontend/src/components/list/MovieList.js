import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import notfound from "assets/imgs/notfound.png";
import MovieListStyle from "assets/styles/movieList";
import PriceTagStyle from "assets/styles/priceTag";

const useStyles = makeStyles(theme => MovieListStyle(theme));

const MovieGridList = ({ movies }) => {
  const classes = useStyles();
  if (movies && movies.length === 0) return <div>No movies data found</div>;
  return (
    <GridList cellHeight={200} spacing={1} className={classes.gridList}>
      {movies.map(({ details: { poster, title, price } }, index) => {
        return (
          <GridListTile
            key={index}
            cols={index > 0 ? 1 : 2}
            rows={index > 0 ? 1 : 2}
          >
            <img
              src={poster}
              alt={title}
              onError={e => {
                if (e.target.src !== notfound) {
                  e.target.src = notfound;
                }
              }}
            />
            <GridListTileBar
              title={title}
              titlePosition="top"
              subtitle={PriceTag(price, !index)}
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        );
      })}
    </GridList>
  );
};

const PriceTag = (price, isLowest) => (
  <div style={PriceTagStyle(isLowest)}>
    <div style={{ paddingTop: 14, fontWeight: 600 }}>${price}</div>
  </div>
);

MovieGridList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      source: PropTypes.string.isRequired,
      details: PropTypes.shape({
        poster: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
      }).isRequired
    })
  ).isRequired
};

export default MovieGridList;
