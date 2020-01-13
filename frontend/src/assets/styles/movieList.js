const MovieListStyle = theme => {
  return {
    gridList: {
      width: 500,
      height: "100%",
      transform: "translateZ(0)"
    },
    titleBar: {
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
    },
    icon: {
      color: "white"
    }
  };
};

export default MovieListStyle;
