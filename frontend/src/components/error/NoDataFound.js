import React from "react";

const uhoh = require("assets/imgs/uhoh.png");

const NoDataFound = props => {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <img src={uhoh} alt="data not found" />
    </div>
  );
};

export default NoDataFound;
