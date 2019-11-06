import React, { Component } from "react";
import axios from "axios";

class ManageTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: "",
      receiver: "",
      ammount: "",

      add_ammount: "",
      account_id: "",

      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.processTransaction = this.processTransaction.bind(this);
    this.processBalanceIncrease = this.processBalanceIncrease.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  processTransaction(e) {
    e.preventDefault();
    let self = this;
    axios
      .post(`${self.props.host}/process-transaction`, {
        sender: self.state.sender,
        receiver: self.state.receiver,
        ammount: self.state.ammount
      })
      .then(res => {
        if (res.data.status == "ok")
          self.setState({
            message: `Transakcijos uzklausa priimta.`
          });
        else {
          self.setState({
            message: `Transakcija nepriimta.`
          });
        }
      })
      .catch(err => {
        self.setState({
          message: "Nepavyko pervesti pinigų."
        });
        console.log(err);
      });
  }

  processBalanceIncrease(e) {
    e.preventDefault();
    let self = this;
    axios
      .post(`${self.props.host}/increase-balance`, {
        add_ammount: self.state.add_ammount,
        account_id: self.state.account_id
      })
      .then(res => {
        self.setState({
          message: `Pinigai sėkmingai pridėti.`
        });
      })
      .catch(err => {
        self.setState({
          message: "Nepavyko pridėti pinigų."
        });
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Pinigų pervedimas iš vienos sąskaitos į kitą:</h2>
        <form onSubmit={this.processTransaction}>
          Siuntėjo ID:
          <input
            required
            id="sender"
            value={this.state.sender}
            onChange={this.handleChange}
          />
          Gavėjo ID:
          <input
            required
            id="receiver"
            value={this.state.receiver}
            onChange={this.handleChange}
          />
          Suma:
          <input
            required
            id="ammount"
            type="number"
            value={this.state.ammount}
            onChange={this.handleChange}
          />
          $<button type="submit">Siųsti</button>
        </form>
        <h2>Pridėti pinigų prie sąskaitos:</h2>
        <form onSubmit={this.processBalanceIncrease}>
          Sąskaitos ID:
          <input
            required
            id="account_id"
            value={this.state.account_id}
            onChange={this.handleChange}
          />
          Pinigų kiekis pridėjimui:
          <input
            required
            id="add_ammount"
            type="number"
            value={this.state.add_ammount}
            onChange={this.handleChange}
          />
          $<button type="submit">Pridėti</button>
        </form>
        <p>
          <i>{this.state.message}</i>
        </p>
      </div>
    );
  }
}

export default ManageTransaction;
