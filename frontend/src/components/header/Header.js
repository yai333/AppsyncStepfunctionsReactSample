import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import HeaderStyle from "assets/styles/header";

const useStyles = makeStyles(theme => HeaderStyle(theme));

const Header = ({ filterMovies, movieLimit }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.headerContainer}>
      <Grid item sm={12} md={6}>
        <div className={classes.toggleContainer}>
          <ToggleButtonGroup
            value={movieLimit.toString()}
            exclusive
            onChange={filterMovies}
            aria-label="text alignment"
          >
            <ToggleButton value="1" aria-label="left aligned">
              Lowest Price
            </ToggleButton>
            <ToggleButton value="200" aria-label="right aligned">
              All Movies
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  filterMovies: PropTypes.func.isRequired,
  movieLimit: PropTypes.number.isRequired
};

export default Header;
