import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import EggCounter from "./components/EggCounter";
import Balance from "./components/Balance";
import DinoCount from "./components/DinoCount";
import BuyDinosaurButton from "./components/BuyDinosaur";
import ShipADozenEggs from "./components/ShipADozenEggs";
import ConvertEurosToSol from "./components/ConvertEurosToSol";

class App extends Component {
  state = {
    startLay: false,

    // Currency
    sol: 110,
    euros: 0,
    eurosToSol: 0.26,

    // Eggs
    eggCount: 0,
    eggCost: 2,
    shippingCost: 5,

    // Dinosaur Shit
    dinoCount: 0,
    dinoCost: 100
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Balance sol={this.state.sol} euros={this.state.euros} />
        <EggCounter eggCount={this.state.eggCount} />
        <DinoCount dinoCount={this.state.dinoCount} />
        <BuyDinosaurButton
          buyDinosaur={this.buyDinosaur}
          layEggs={this.layEggs}
        />
        <ShipADozenEggs shipEggs={this.shipEggs} />
        <ConvertEurosToSol convertEurosToSol={this.convertEurosToSol} />
      </div>
    );
  }

  layEggs = () => {
    if (!this.state.startLay) {
      setInterval(() => {
        const { eggCount, dinoCount } = this.state;
        this.setState({
          eggCount: eggCount + dinoCount,
          startLay: true
        });
      }, 2000);
    }
  };

  buyDinosaur = () => {
    if (this.state.sol >= this.state.dinoCost) {
      this.setState({
        dinoCount: this.state.dinoCount + 1,
        sol: this.state.sol - this.state.dinoCost
      });
    } else {
      alert("YOU NEED MOAR SOL BRO");
    }
  };

  shipEggs = () => {
    if (
      this.state.sol >= this.state.shippingCost &&
      this.state.eggCount >= 12
    ) {
      this.setState({
        eggCount: this.state.eggCount - 12,
        euros: this.state.euros + this.state.eggCost * 12,
        sol: this.state.sol - 5
      });
    } else {
      if (this.state.sol < this.state.shippingCost)
        alert("YOU DON'T HAVE ENUFF SOL TO SHIP ME");
      if (this.state.eggCount < 12)
        alert("I NEED AT LEAST 11 OTHER M8S, AMIGO");
    }
  };

  convertEurosToSol = () => {
    const { sol, euros, eurosToSol } = this.state;
    this.setState({
      sol: sol + euros * eurosToSol,
      euros: 0
    });
  };
}

export default App;
