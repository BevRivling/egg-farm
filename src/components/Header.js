import React from "react";
import eu from "../img/eu.png";
import peru from "../img/peru.png";

const Header = props => (
  <span>
    <img alt="peru" src={peru} />
    <img alt="eu" src={eu} />
    <h1>Bevan and David's Egg Factory</h1>
  </span>
);

export default Header;
