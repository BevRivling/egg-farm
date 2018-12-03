import React from "react";
import alpaca from "../img/alpaca.png";

const DinoPen = ({ dinoPen }) => {
  return (
    <ul>
      {dinoPen.map((dinosaur) => {
        return (
          <li key={dinosaur.name}>
            <span className="text">
              Name: {dinosaur.name} - Age: {dinosaur.age} - Eggs Laid:{" "}
              {dinosaur.eggCount}{" "}
            </span>
            <span className="alpaca-span">
              {dinosaur.hunger.map((hung, index) => (
                <img key={index} className="alpaca" src={alpaca} />
              ))}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default DinoPen;
