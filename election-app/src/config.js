"use strict";

const electionAbi=require('./abi/election.json');

// const contractsAddress = contractsDetails.address;

var ContractData = function () {};

// your contrat abi 
ContractData.electionAbi =electionAbi;

// contract adderess deployed on blockchain
ContractData.electionAddress ='0x81aa20BA69230c148a3dd4B6B93bbA7596cC47Db';

// your provider url
ContractData.provider="http://localhost:8545";
  
module.exports = ContractData;
