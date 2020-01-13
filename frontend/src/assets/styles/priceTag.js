const PriceTagStyle = isLowest => {
  return {
    height: 40,
    width: 40,
    borderRadius: 20,
    background: isLowest ? "#ff6600" : "#444",
    fontColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    float: "right",
    textAlign: "center",
    margin: "auto",
    position: "absolute",
    right: 20,
    top: 40
  };
};

export default PriceTagStyle;
