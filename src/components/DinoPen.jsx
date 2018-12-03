import React from "react";
import alpaca from "../img/alpaca.png";

const DinoPen = ({ dinoPen }) => {
  return (
    <ul>
      {dinoPen.map(dinosaur => {
        return (
          <li key={dinosaur.name}>
            Name: {dinosaur.name} - Age: {dinosaur.age} - Eggs Laid:{" "}
            {dinosaur.eggCount} -{" "}
            <span>
              {dinosaur.hunger.map(hung => (
                <img className="alpaca" src={alpaca} />
              ))}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default DinoPen;
