import React from 'react';

const BuyAlpacas = ({buyAlpacas}) => {
    return (
        <button
        onClick={() => {
          buyAlpacas();
        }}
      >
        Buy 100 Alpacas
      </button>
    );
};

export default BuyAlpacas;