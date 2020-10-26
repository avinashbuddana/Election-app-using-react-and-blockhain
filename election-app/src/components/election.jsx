import React, { Component } from "react";
import Web3 from "web3";
import { connectMetamask } from "../actions/metamaskAction";
import { connect } from "react-redux";
import { electionAbi, electionAddress,provider } from "../config";

let web3 = null;

class Election extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      contracts: {},
      account: this.props.accounts,
      electionContract: null,
      electionData: [],
      isAdd: false,
      candidateName: null,
      isAlreadyVoted: false,
    };
  }

  componentDidMount() {
    this.initWeb3();
  }

  initWeb3 = () => {
    let web3 = new Web3(
      new Web3.providers.HttpProvider(provider)
    );
    this.setState({ web3: web3 }, () => {
      this.props.connectToMetaMask(true);
    });
  };

  // change view to Add Candidate

  addCandidate = () => {
    this.setState({ isAdd: true });
  };

  componentWillReceiveProps = (nextProp) => {
    if (!this.state.account.length && nextProp.accounts.length) {
      this.setState(
        { account: nextProp.accounts, web3: nextProp.web3Object },
        () => this.getContractData()
      );
    } else if (
      this.state.account.length &&
      this.state.account[0] != nextProp.accounts[0]
    ) {
      this.setState(
        { account: nextProp.accounts, web3: nextProp.web3Object },
        () => this.getContractData()
      );
    }
  };

  // cate vote to user
  casteVote = async (id) => {
    this.state.electionContract.methods
      .vote(id)
      .send({ from: this.state.account[0] })
      .once("receipt", (receipt) => {
        this.getContractData();
      });
  };

  // add new candidate

  onFormSubmit = (e) => {
    e.preventDefault();
    this.state.electionContract.methods
      .addCandidate(this.state.candidateName)
      .send({ from: this.state.account[0] })
      .once("receipt", (receipt) => {
        this.setState({ isAdd: false });
        this.getContractData();
      });
  };

  getContractData = async () => {
    const web3Js = this.state.web3;
    // deploy the contract with abi genrated and address
    const ElectionContract = new web3Js.eth.Contract(
      electionAbi,
      electionAddress
    );

    this.setState({ electionContract: ElectionContract }, () =>
      this.checkAlreadyVoted()
    );
    const electionCadidates = [];
    // get candidate count
    const candidateCount = await ElectionContract.methods
      .candidatesCount()
      .call();

    if (candidateCount > 0) {
      for (let i = 1; i <= candidateCount; i++) {
        const fetchCadidates = await ElectionContract.methods
          .candidates(i)
          .call();
        let electionList = {
          id: fetchCadidates[0],
          name: fetchCadidates[1],
          count: fetchCadidates[2],
        };
        electionCadidates.push(electionList);
      }
    }

    this.setState({ electionData: electionCadidates });
  };

  checkAlreadyVoted = async () => {
    const isAlreadyVoted = await this.state.electionContract.methods
      .voters(this.state.account[0])
      .call();
    this.setState({ isAlreadyVoted: isAlreadyVoted });
  };

  render() {
    return !this.state.isAdd ? (
      // <div class="container">
      <div>
        <div class="d-flex flex-row-reverse mt-2 mr-3">
          <button class="btn btn-primary" onClick={() => this.addCandidate()}>
            Add Candidate
          </button>
        </div>

        <div class="col-lg-12">
          <h1 class="text-center">Election Results</h1>

          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Votes</th>
                <th scope="col">Caste Vote</th>
              </tr>
            </thead>
            {this.state.electionData.length ? (
              <tbody>
                {this.state.electionData.map((electionData) => (
                  <>
                    <tr>
                      <td>{electionData.id}</td>
                      <td>{electionData.name}</td>
                      <td>{electionData.count}</td>
                      <td>
                        {!this.state.isAlreadyVoted ? (
                         
                          <button
                          className="btn btn-light btn-sm"
                            onClick={() => this.casteVote(electionData.id)}
                          >
                            {" "}
                            vote{" "}
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            ) : (
              <tbody>No data available</tbody>
            )}
          </table>
          <hr />
          <p id="accountAddress" class="text-center">
            {this.state.account.length
              ? `Your wallet address is ${this.state.account[0]}`
              : "No address Found"}
          </p>
        </div>
      </div>
    ) : (
      <>
{/* add new candidate Ui */}
<div class="container">
    <div class="row">
        <div class="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
            <div class="row">
                <div class="col-lg-6 col-md-8 mx-auto">

                    <div class="card rounded shadow shadow-sm">
                        <div class="card-header">
                            <h3 class="mb-0">Add New Candidate</h3>
                        </div>
                        <div class="card-body">
                            <form class="form" role="form" autocomplete="off" id="formLogin"  onSubmit={this.onFormSubmit}>
                                <div class="form-group">
                                    <label for="uname1">Name Of Candidate</label>
                                    <input type="text" class="form-control form-control-lg rounded-0" name="uname1" id="uname1" required
                                    onChange={(event) => {
                                      this.setState({ candidateName: event.target.value });
                                    }}
                                    />
                                    <div class="invalid-feedback">Oops, you missed this one.</div>
                                </div>
                                
                                <button type="submit" class="btn btn-success btn-lg float-right" id="btnLogin"> Add Candidate</button>
                            </form>
                        </div>
                     
                    </div>
                 

                </div>


            </div>
        

        </div>
    
    </div>

</div>

      </>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(Election);
