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
import BuyAlpacas from "./components/BuyAlpacas";

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
    alpacaCost: 5,
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
            <BuyAlpacas buyAlpacas={this.buyAlpacas} />
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
        const eggRound = this.state.dinoPen.reduce((acc, dinosaur) => {
          return acc + dinosaur.rateOfLay;
        }, 0);
        this.setState((prevState) => ({
          peruEggCount: prevState.peruEggCount + eggRound,
          startLay: true
        }));

        this.handleDinosaurs();
        // this.isGameOver();
      }, this.state.speed * 2000);
    }
  };

  buyDinosaur = () => {
    if (this.state.sol >= this.state.dinoCost) {
      const dinoName = prompt("What would you like to call your dinosaur?");
      this.setState((prevState) => ({
        dinoCount: prevState.dinoCount + 1,
        sol: Math.floor(prevState.sol - prevState.dinoCost),

        dinoPen: [
          ...prevState.dinoPen,
          {
            name: dinoName,
            age: 0,
            eggCount: 0,
            hunger: [1, 1, 1, 1, 1],
            rateOfLay: 5
          }
        ]
      }));
    } else {
      alert("YOU NEED MOAR SOL BRO");
    }
  };

  buyAlpacas = () => {
    if (this.state.sol >= this.state.alpacaCost * 100) {
      this.setState((prevState) => ({
        alpacaSilo: prevState.alpacaSilo + 100,
        sol: Math.floor(prevState.sol - prevState.alpacaCost * 100)
      }));
    } else {
      alert("NO SOL NO ALPACAS ESE");
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
    this.setState((prevState) => {
      const checkAlpacaSilo = prevState.alpacaSilo;
      return {
        dinoPen: prevState.dinoPen.map((dinosaur) => {
          if (dinosaur.hunger.length < 1) this.killDinosaur();
          return {
            ...dinosaur,
            eggCount: dinosaur.eggCount + dinosaur.rateOfLay,
            age: Math.floor(dinosaur.eggCount / this.state.dinoEggsPerYear),
            hunger:
              checkAlpacaSilo < 1 && Math.random() < 0.33
                ? dinosaur.hunger.slice(0, dinosaur.hunger.length - 1)
                : dinosaur.hunger,
            rateOfLay:
              Math.ceil(
                dinosaur.age < 15
                  ? dinosaur.age / 3
                  : dinosaur.age > 30
                  ? 5 - dinosaur.age / 3
                  : 5
              ) + 1
          };
        }),

        alpacaSilo:
          checkAlpacaSilo > 1
            ? prevState.alpacaSilo -
              prevState.dinoCount * Math.floor(Math.random() * 3)
            : 0 //CHANGED
      };
    });
  };
  killDinosaur = () => {
    this.setState((prevState) => {
      return {
        dinoPen: prevState.dinoPen.filter((dinosaur) => {
          return dinosaur.hunger.length > 0;
        })
      };
    });
  };

  // isGameOver = () => {
  //   const { dinoPen, sol } = this.state;
  //   if (dinoPen.length < 1 && sol < 200) {
  //     if (window.confirm("GAME OVER - Play again?")) {

  //       Location.reload();
  //     }
  //   }
  // };
}

export default App;
