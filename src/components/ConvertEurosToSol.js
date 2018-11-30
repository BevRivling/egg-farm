import React from "react";
import PropTypes from "prop-types";

const ConvertEurosToSol = ({ convertEurosToSol }) => {
  return (
    <button onClick={() => convertEurosToSol()}>Convert Euros to Sol</button>
  );
};
// DinoCount.propTypes = {
//   dinoCount: PropTypes.number.isRequired
// };

export default ConvertEurosToSol;
