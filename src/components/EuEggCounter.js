import React from "react";
import PropTypes from "prop-types";

const EuEggCounter = ({ euEggCount }) => <p>EU Eggs: {euEggCount}</p>;

EuEggCounter.propTypes = {
  euEggCount: PropTypes.number.isRequired
};

export default EuEggCounter;
