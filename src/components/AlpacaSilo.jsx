import React from "react";
import PropTypes from "prop-types";

const AlpacaSilo = ({ alpacaSilo }) => {
  return <p>Alpacas in the Silo: {Math.floor(alpacaSilo)}</p>;
};

AlpacaSilo.propTypes = {
  alpacaSilo: PropTypes.number.isRequired
};

export default AlpacaSilo;
