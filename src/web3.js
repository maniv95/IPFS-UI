// //overrides metamask v0.2 for our 1.0 version.  
//1.0 lets us use async and await instead of promises

import Web3 from 'web3';
//overrides metamask v0.2 for our v 1.0
// const web3 = new Web3(window.web3.currentProvider);
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

export default web3;