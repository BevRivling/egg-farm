import React from "react";
import PropTypes from "prop-types";

const BuyDinosaurButton = ({ layEggs, buyDinosaur }) => (
  <button
    onClick={() => {
      buyDinosaur();
      layEggs();
    }}
  >
    Buy Dinosaur
  </button>
);

// DinoCount.propTypes = {
//   dinoCount: PropTypes.number.isRequired
// };

export default BuyDinosaurButton;
