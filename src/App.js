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
    startDinos: false,

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
    dinoNames: [
      "Jesus",
      "Lorenzo",
      "Roberto",
      "Mario ",
      "Alonso",
      "Ramon",
      "Rolando",
      "Andrés",
      "Valentino",
      "Stefano",
      "Samuel",
      "Sandra",
      "Irene",
      "Lucia",
      "Agustina",
      "Juana",
      "Vivian",
      "Zoe",
      "Susana",
      "Gabriela",
      "Susana",
      "Efraim",
      "Óscar",
      "Mauricio",
      "Ernesto",
      "Tomás",
      "Bautista",
      "Jonathan",
      "Juan Andrés",
      "Rodrigo ",
      "Mariano",
      "Luca",
      "Samantha de la Cruz",
      "Catarina",
      "Paola",
      "María",
      "Inmaculada",
      "Susana",
      "Gloria",
      "Monserrat",
      "Diana ",
      "Laura Sánchez",
      "Alonzo Gutiérrez",
      "Jesus Moya",
      "Andrés",
      "Arturo",
      "Héctor",
      "Jesús",
      "Julian Carballar",
      "Thiago",
      "Iván Velázquez",
      "Matthew Gallo",
      "Serena",
      "Emma",
      "Sara",
      "Adoración",
      "Allison",
      "Angela",
      "Alana",
      "Ana ",
      "Sofia",
      "Marisa",
      "Isabela",
      "Jonathan",
      "Erick",
      "Iker",
      "Jonathan",
      "Luz ",
      "Jose ",
      "Marcos",
      "Gabriel",
      "Felipe"
    ],
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
        this.setState(prevState => ({
          peruEggCount: prevState.peruEggCount + eggRound,
          startLay: true
        }));

        // this.isGameOver();
      }, this.state.speed * 2000);
    }
  };

  buyDinosaur = () => {
    this.handleDinosaurs();
    if (this.state.sol >= this.state.dinoCost) {
      const dinoName =
        prompt("What would you like to call your dinosaur?") ||
        this.state.dinoNames[
          Math.floor(Math.random() * this.state.dinoNames.length)
        ];
      this.setState(prevState => ({
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
      this.setState(prevState => ({
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
    if (!this.state.startDinos) {
      setInterval(() => {
        this.setState(prevState => {
          const checkAlpacaSilo = prevState.alpacaSilo;
          return {
            startDinos: true,
            dinoPen: prevState.dinoPen.map(dinosaur => {
              if (dinosaur.hunger.length < 1) this.killDinosaur();
              return {
                ...dinosaur,
                eggCount: dinosaur.eggCount + dinosaur.rateOfLay,
                age: dinosaur.age + 0.1,
                hunger:
                  checkAlpacaSilo < 1 && Math.random() < 0.33
                    ? dinosaur.hunger.slice(0, dinosaur.hunger.length - 1)
                    : dinosaur.hunger,
                rateOfLay: this.calcRate(dinosaur.age)
              };
            }),

            alpacaSilo:
              checkAlpacaSilo > 1
                ? prevState.alpacaSilo -
                  prevState.dinoCount * Math.floor(Math.random() * 3)
                : 0 //CHANGED
          };
        });
      }, this.state.speed * 2000);
    }
  };
  killDinosaur = () => {
    this.setState(prevState => {
      return {
        dinoPen: prevState.dinoPen.filter(dinosaur => {
          return dinosaur.hunger.length > 0;
        })
      };
    });
  };

  calcRate = age => {
    if (age < 15) {
      return Math.ceil(Math.random() * (age / 3));
    } else if (age > 30 && age < 46) {
      return 5 - Math.ceil((Math.random() * (age - 30)) / 3);
    } else if (age > 45) {
      return Math.ceil(Math.random() * 1);
    } else {
      return Math.ceil(Math.random() * 5);
    }
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
