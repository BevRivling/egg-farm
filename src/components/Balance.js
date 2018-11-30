import React from "react";
import PropTypes from "prop-types";

const Balance = ({ euros, sol }) => (
  <p>
    Balance: € {euros} - S/. {sol}
  </p>
);

Balance.propTypes = {
  euros: PropTypes.number.isRequired
};

export default Balance;
