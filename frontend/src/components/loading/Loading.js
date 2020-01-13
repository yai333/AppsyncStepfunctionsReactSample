import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const loading = require("assets/imgs/loading.gif");
const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2)
  },
  content: {
    display: "flex",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2)
  }
}));

const Loading = props => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <img src={loading} alt="loading" width={props.width} />
    </div>
  );
};

Loading.propTypes = {
  width: PropTypes.string.isRequired
};

export default Loading;
