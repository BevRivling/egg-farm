import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import PeruEggCounter from "./components/PeruEggCounter";
import EuEggCounter from "./components/EuEggCounter";
import Balance from "./components/Balance";
import DinoCount from "./components/DinoCount";
import BuyDinosaurButton from "./components/BuyDinosaur";
import ShipADozenEggs from "./components/ShipADozenEggs";
import ConvertEurosToSol from "./components/ConvertEurosToSol";
import eu from "./img/eu.png";
import peru from "./img/peru.png";
import DinoPen from "./components/DinoPen";
import AlpacaSilo from "./components/AlpacaSilo";

class App extends Component {
  state = {
    // Speed
    speed: 0.3,

    //Boules
    startLay: false,
    startSell: false,

    // Currency
    sol: 210,
    euros: 0,
    eurosToSol: 3.84,
    solToEuros: 0.26,

    //Peru
    peruEggCount: 0,
    shippingCost: 5,
    alpacaCost: 50,
    alpacaSilo: 100,

    //EU
    euEggCount: 0,
    eggCost: 2,

    // Dinosaur Shit
    dinoPen: [],
    dinoCount: 0,
    dinoCost: 200,
    dinoEggsPerYear: 10
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="item" id="peru">
            <img alt="peru" src={peru} />
            <Balance currency={this.state.sol} currSym={"S/."} />
            <PeruEggCounter peruEggCount={this.state.peruEggCount} />{" "}
            <DinoCount dinoCount={this.state.dinoCount} />
            <AlpacaSilo alpacaSilo={this.state.alpacaSilo} />
            <BuyDinosaurButton
              buyDinosaur={this.buyDinosaur}
              layEggs={this.layEggs}
            />
            <ShipADozenEggs shipEggs={this.shipEggs} />
            <DinoPen dinoPen={this.state.dinoPen} />
            {/* Bulk buy alpacas button */}
          </div>
          <div className="item" id="eu">
            <img alt="eu" src={eu} />
            <Balance currency={this.state.euros} currSym="€" />
            <EuEggCounter euEggCount={this.state.euEggCount} />
            <ConvertEurosToSol convertEurosToSol={this.convertEurosToSol} />
          </div>
        </div>
      </div>
    );
  }

  layEggs = () => {
    if (!this.state.startLay) {
      setInterval(() => {
        // const { peruEggCount, dinoCount } = this.state;
        this.setState(prevState => ({
          peruEggCount: prevState.peruEggCount + prevState.dinoCount,
          startLay: true
        }));
        this.handleDinosaurs();
      }, this.state.speed * 2000);
    }
  };

  buyDinosaur = () => {
    if (this.state.sol >= this.state.dinoCost) {
      const dinoName = prompt("What would you like to call your dinosaur?");
      this.setState(prevState => ({
        dinoCount: prevState.dinoCount + 1,
        sol: Math.floor(prevState.sol - prevState.dinoCost),

        dinoPen: [
          ...prevState.dinoPen,
          { name: dinoName, age: 0, eggCount: 0, hunger: [1, 1, 1, 1, 1] }
        ]
      }));
    } else {
      alert("YOU NEED MOAR SOL BRO");
    }
  };

  shipEggs = () => {
    if (
      this.state.sol >= this.state.shippingCost &&
      this.state.peruEggCount >= 12
    ) {
      this.setState({
        peruEggCount: this.state.peruEggCount - 12,
        // euros: Math.floor(this.state.euros + this.state.eggCost * 12),
        euEggCount: this.state.euEggCount + 12,
        sol: Math.floor(this.state.sol - 5)
      });
      if (!this.state.startSell) {
        this.setState({ startSell: true });
        this.startSellingEggs();
      }
    } else {
      if (this.state.sol < this.state.shippingCost)
        alert("YOU DON'T HAVE ENUFF SOL TO SHIP ME");
      if (this.state.peruEggCount < 12)
        alert("I NEED AT LEAST 11 OTHER M8S, AMIGO");
    }
  };

  convertEurosToSol = () => {
    const { sol, euros, eurosToSol } = this.state;
    this.setState({
      sol: Math.floor(sol + euros * eurosToSol),
      euros: 0
    });
  };
  startSellingEggs = () => {
    //const { euEggCount, euros, eggCost } = this.state;
    setInterval(() => {
      console.log(this.state.euEggCount);
      if (this.state.euEggCount > 0)
        this.setState((state, props) => {
          return {
            euEggCount: state.euEggCount - 1,
            euros: state.euros + state.eggCost
          };
        });
    }, this.state.speed * 1000);
  };

  handleDinosaurs = () => {
    this.setState(prevState => ({
      dinoPen: prevState.dinoPen.map(dinosaur => {
        console.log(dinosaur.eggCount);
        return {
          ...dinosaur,
          eggCount: dinosaur.eggCount + 1,
          age: Math.floor(dinosaur.eggCount / this.state.dinoEggsPerYear)
        };
      }),
      alpacaSilo: prevState.alpacaSilo - prevState.dinoCount / 3
    }));
  };
}

export default App;
