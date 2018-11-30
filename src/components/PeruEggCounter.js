import React from "react";
import PropTypes from "prop-types";

const PeruEggCounter = ({ peruEggCount }) => <p>Peru Eggs: {peruEggCount}</p>;

PeruEggCounter.propTypes = {
  peruEggCount: PropTypes.number.isRequired
};

export default PeruEggCounter;
