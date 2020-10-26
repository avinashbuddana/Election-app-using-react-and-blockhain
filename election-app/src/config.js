"use strict";

const electionAbi=require('./abi/election.json');

// const contractsAddress = contractsDetails.address;

var ContractData = function () {};

// your contrat abi 
ContractData.electionAbi =electionAbi;

// contract adderess deployed on blockchain
ContractData.electionAddress ='0x0227858b459260490DFb17370213DcA119deE1b1';

// your provider url
ContractData.provider="http://localhost:8545";
  
module.exports = ContractData;
