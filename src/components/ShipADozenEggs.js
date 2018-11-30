import React from "react";
import PropTypes from "prop-types";

const ShipADozenEggs = ({ shipEggs }) => (
  <button
    onClick={() => {
      shipEggs();
    }}
  >
    Ship a dozen eggs
  </button>
);

// DinoCount.propTypes = {
//   dinoCount: PropTypes.number.isRequired
// };

export default ShipADozenEggs;
