import React from "react";
import PropTypes from "prop-types";

const Balance = ({ currency, currSym }) => (
  <p>
    Balance: {currSym} {currency}
  </p>
);

Balance.propTypes = {
  currency: PropTypes.number.isRequired
};

export default Balance;
