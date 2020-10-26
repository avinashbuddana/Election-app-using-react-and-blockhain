import React , { Component }  from "react";
import logo from "./logo.svg";
import "./App.css";
import Election from "./components/election";
import{checkWeb3} from './actions/metamaskAction';

class App extends Component {
  componentDidMount() {
    checkWeb3(false)
  }

  render() {
    return <Election></Election>;
  }
}

export default App;
