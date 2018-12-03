import React from "react";
import PropTypes from "prop-types";

const DinoCount = ({ dinoCount }) => <p>Dinosaurs: {dinoCount}</p>;

DinoCount.propTypes = {
  dinoCount: PropTypes.number.isRequired
};

export default DinoCount;
