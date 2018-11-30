import React from "react";
import PropTypes from "prop-types";

const EggCounter = ({ eggCount }) => <p>Eggs: {eggCount}</p>;

EggCounter.propTypes = {
  eggCount: PropTypes.number.isRequired
};

export default EggCounter;
