import React, { Component } from "react";
import CreateAccount from "./Comps/CreateAccount";
import ManageTransaction from "./Comps/ManageTransaction";
import DisplayUsers from "./Comps/DisplayUsers";
import DisplayTransactions from "./Comps/DisplayTransactions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0, //0 - Create Account//1 - Manage Transaction//2 - Display Users//3 - Transaction history
      host: "http://localhost:3001"
    };
    this.renderInterface = this.renderInterface.bind(this);
    this.manageClick = this.manageClick.bind(this);
  }

  manageClick(e) {
    this.setState({ view: +e.target.name });
  }

  renderInterface() {
    switch (this.state.view) {
      case 0:
        return <CreateAccount host={this.state.host} />;
      case 1:
        return <ManageTransaction host={this.state.host} />;
      case 2:
        return <DisplayUsers host={this.state.host} />;
      case 3:
        return <DisplayTransactions host={this.state.host} />;
      default:
        return <div>You are not where you are supposed to be.</div>;
    }
  }

  render() {
    return (
      <div>
        <button name="0" onClick={this.manageClick}>
          Registruoti vartotoją
        </button>
        <button name="1" onClick={this.manageClick}>
          Vykdyti transakciją
        </button>
        <button name="2" onClick={this.manageClick}>
          Rodyti registruotus vartotojus
        </button>
        <button name="3" onClick={this.manageClick}>
          Rodyti transakcijų istoriją
        </button>
        {this.renderInterface()}
      </div>
    );
  }
}

export default App;
