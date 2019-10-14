import React, { Component } from "react";
import axios from "axios";

class DisplayTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,

      message: ""
    };
    this.displayTransactions = this.displayTransactions.bind(this);
  }

  componentDidMount() {
    let self = this;
    axios
      .get(`${self.props.host}/display-transactions`)
      .then(res => {
        self.setState({ data: res.data.transactions, loading: false });
      })
      .catch(err => {
        self.setState({ message: "Nepavyko gauti transakcijų istorijos!" });
        console.log(err);
      });
  }

  displayTransactions() {
    if (this.state.loading) {
      return (
        <div>
          <h1>Kraunama...</h1>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.data.map((trans, index) => {
            return (
              <div style={{ border: "solid 1px black" }} key={index}>
                <p> Siuntėjo ID: {trans.sender_id}</p>
                <p> Gavėjo ID: {trans.receiver_id}</p>
                <p> Pinigų kiekis: {trans.ammount}</p>
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
        <h1> Transakcijų istorija:</h1>
        {this.displayTransactions()}
      </div>
    );
  }
}

export default DisplayTransactions;
