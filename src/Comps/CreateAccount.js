import React, { Component } from "react";
import axios from "axios";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      email: "",
      phone: "",

      user_id: "",
      balance: "",
      card_number: "",
      expiry_date: "",

      message: ""
    };
    this.registerUser = this.registerUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openAccount = this.openAccount.bind(this);
    this.flushRedis = this.flushRedis.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  flushRedis() {
    let self = this;
    axios
      .get(`${self.props.host}/flush-redis`)
      .then(res => {
        self.setState({
          message: "Duomenys sunaikinti sėkmingai."
        });
      })
      .catch(err => {
        self.setState({
          message: "Nepavyko sunaikinti duomenų."
        });
      });
  }

  registerUser(e) {
    e.preventDefault();
    let self = this;
    axios
      .post(`${self.props.host}/register-user`, {
        name: self.state.name,
        surname: self.state.surname,
        email: self.state.email,
        phone: self.state.phone
      })
      .then(res => {
        self.setState({
          message: `Vartotojas sėkmingai užregistruotas. Naujo varototojo ID: ${res.data.user_id}`
        });
      })
      .catch(err => {
        self.setState({
          message: "Nepavyko užregistruoti naujo vartotojo."
        });
      });
  }

  openAccount(e) {
    e.preventDefault();
    let self = this;
    axios
      .post(`${self.props.host}/open-account`, {
        user_id: self.state.user_id,
        balance: self.state.balance,
        expiry_date: self.state.expiry_date,
        card_number: self.state.card_number
      })
      .then(res => {
        self.setState({
          message: `Sąskaita sėkmingai atidaryta. Naujos sąskaitos ID: ${res.data.account_id}`
        });
      })
      .catch(err => {
        self.setState({
          message: "Nepavyko sukurti naujos sąskaitos."
        });
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h2>Registruoti vartotoją:</h2>
        <form onSubmit={this.registerUser}>
          Vardas:
          <input
            required
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          Pavardė:
          <input
            required
            id="surname"
            value={this.state.surname}
            onChange={this.handleChange}
          />
          El. paštas:
          <input
            required
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          Tel. nr.:
          <input
            required
            id="phone"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <button type="submit">Registruoti</button>
        </form>
        <h2>Atidaryti sąskaitą:</h2>
        <form onSubmit={this.openAccount}>
          Vartotojo ID:
          <input
            required
            id="user_id"
            value={this.state.user_id}
            onChange={this.handleChange}
          />
          Sąskaitos balansas:
          <input
            type="number"
            required
            id="balance"
            value={this.state.balance}
            onChange={this.handleChange}
          />
          $ Kortelės numeris:
          <input
            required
            id="card_number"
            value={this.state.card_number}
            onChange={this.handleChange}
          />
          Galiojimo pabaiga:
          <input
            required
            id="expiry_date"
            value={this.state.expiry_date}
            onChange={this.handleChange}
          />
          <button type="submit">Atidaryti</button>
        </form>
        <p>
          <i>{this.state.message}</i>
        </p>
        <button onClick={this.flushRedis}>Sunaikinti duomenis</button>
      </div>
    );
  }
}

export default CreateAccount;
