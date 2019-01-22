import web3 from './web3';

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address
// const address = '0x84fa26a5F64EE6D9ca267b20292e263937E67704';
// //use the ABI from your contract
// const abi = [ { "constant": false, "inputs": [ { "name": "_CertificateUId", "type": "string" }, { "name": "_IpfsHash", "type": "string" } ], "name": "SendIpfsHash", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_CertificateUId", "type": "string" } ], "name": "GetIpfsHash", "outputs": [ { "name": "", "type": "string", "value": "" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "msg", "type": "string" }, { "indexed": false, "name": "_CertificateUId", "type": "string" }, { "indexed": false, "name": "_IpfsHash", "type": "string" } ], "name": "Reg", "type": "event" } ];


//For Testing
const address = '0x3880c2a4Fc843CdA315850E8716FB1ffCdCd8E3e';
const abi =[ { "constant": false, "inputs": [ { "name": "_CertificateUId", "type": "string" }, { "name": "_IpfsHash", "type": "string" } ], "name": "SendIpfsHash", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_CertificateUId", "type": "string" } ], "name": "GetIpfsHash", "outputs": [ { "name": "", "type": "string", "value": "QmYYURmHo8BeDCv7hvGCjJz5BfCj7rpJpZRymdN5UfyKMD" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "msg", "type": "string" }, { "indexed": false, "name": "_CertificateUId", "type": "string" }, { "indexed": false, "name": "_IpfsHash", "type": "string" } ], "name": "Reg", "type": "event" } ];

export default new web3.eth.Contract(abi, address);