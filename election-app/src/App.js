import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { connect } from "react-redux";
import Election from "./components/election";
import { checkWeb3, connectMetamask } from "./actions/metamaskAction";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    checkWeb3(false);
    // auto refresh if account changed
    let self = this;
    window.ethereum.on("accountsChanged", async function () {
      console.log("account changed called");
      self.props.connectToMetaMask(false);
    });
  }

  render() {
    return <Election></Election>;
  }
}

const mapStateToProps = (state) => {
  return {
    isMetaMaskInstalled: state.metaMaskInstalled,
    isUserLogin: state.isUserLogin,
    accounts: state.accounts,
    web3Object: state.web3Object,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    connectToMetaMask: (status) => dispatch(connectMetamask(status)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
