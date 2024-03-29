import React, { Component } from "react";
import axios from "axios";

class DisplayUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,

      message: ""
    };
    this.displayUsers = this.displayUsers.bind(this);
  }

  componentDidMount() {
    let self = this;
    axios
      .get(`${self.props.host}/display-users`)
      .then(res => {
        self.setState({
          data: res.data.users,
          loading: false
        });
      })
      .catch(err => {
        self.setState({ message: "Nepavyko gauti vartotojų duomenų!" });
        console.log(err);
      });
  }

  displayUsers() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Kraunama...</h1>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.data.map((user, index) => {
            return (
              <div
                style={{
                  border: "solid 1px black",
                  margin: "10px",
                  padding: "10px "
                }}
                key={index}
              >
                <p> Varototojo ID: {user.id}</p>
                <p> Vardas: {user.name}</p>
                <p> Pavarde: {user.surname}</p>
                <p> El. paštas: {user.email}</p>
                <p> Tel. Nr.: {user.phone}</p>
                {typeof user.account_id != "undefined" && (
                  <div style={{ border: "solid 1px red", padding: "10px" }}>
                    <p> Banko sąskaitos ID: {user.account_id}</p>
                    <p> Sąskaitos likutis: {user.balance} pinigų</p>
                    <p> Kortelės numeris: {user.card_number}</p>
                    <p> Galiojimo pabaiga: {user.expiry_date}</p>
                  </div>
                )}
              </div>
            );
          })}
          <p>
            <i>{this.state.message}</i>
          </p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1> Registruoti vartotojai:</h1>
        {this.displayUsers()}
      </div>
    );
  }
}

export default DisplayUsers;
