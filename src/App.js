import {Table, Grid, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import ipfs from './ipfs';
import storehash from './storehash';
const QRCode = require('qrcode.react');
// const fileDownload = require('react-file-download');
class App extends Component {
 constructor (props){
  super(props)
  this.state = {
      ipfsHash:null,
      buffer:'',
      ethAddress:'',
      blockNumber:'',
      transactionHash:'',
      gasUsed:'',
      details:'',
      CertificateUId: '',
      GetCertId:'',
      getBcDet:''
    };
      this.onClick      = this.onClick.bind(this);
      this.onClick1     = this.onClick1.bind(this);
      this.onClick2     = this.onClick2.bind(this);
      this.onClick3     = this.onClick3.bind(this);
      this.onClick4     = this.onClick4.bind(this);
      this.updateState  = this.updateState.bind(this);
      this.updateState1 = this.updateState1.bind(this);
    };
    updateState(e) {
      this.setState({CertificateUId: e.target.value});
    }
    updateState1(f) {
      this.setState({GetCertId: f.target.value});
    }

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };

    convertToBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer});
    };

    onSubmit = async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const ethAddress = await storehash.options.address;
      this.setState({ethAddress});
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        this.setState({ ipfsHash:ipfsHash[0].hash });
        web3.eth.personal.unlockAccount("0xf71525880bebef9c4f7952cf0ef6bdf76e110a62","moj2018");
        console.log("Blockchain Account Unlocked !");
        storehash.methods.SendIpfsHash(this.state.CertificateUId,this.state.ipfsHash).send({
          from: '0xf71525880bebef9c4f7952cf0ef6bdf76e110a62',
          gas: 1500000,
          gasPrice: '30000000000000'
        },(error, transactionHash) => {
          this.setState({transactionHash});
        });   
      })
    };
    
    onClick = async () => {
    try{
        this.setState({blockNumber:"waiting.."});
        this.setState({gasUsed:"waiting..."});
        await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
          this.setState({
            txReceipt,
            blockNumber:txReceipt.blockNumber,
            gasUsed: txReceipt.gasUsed
          },async ()=>{
            web3.eth.getBlock(this.state.blockNumber,(err,details)=>{
            this.setState({details})
           })
          })
        });
      } 
    catch(error){
        alert(error);
      } 
  }

    onClick1 =  async () => {
      try{
        this.setState({getBcDet:"Getting..."});
        let det = await storehash.methods.GetIpfsHash(this.state.GetCertId).call();
        this.setState({getBcDet:det});
      }
      catch(error){
        console.log(error);
      }
    }

    onClick2 = async () => {
      try{
        ipfs.pin.add(this.state.ipfsHash, function (err) {
          if (err){
            alert("No Hash To Pin")
          }
          else{
            alert("Pinned Success!")
          }
        })
      }
      catch(error){
        alert(error);
      }
    }

    onClick3 = async () => {
      try{
        ipfs.pin.rm(this.state.ipfsHash,function(err){
          if(err){
            alert("No Hash To UnPin")
          }
          else{
            alert("Un Pinned")
         }
        })
      }
      catch(error){
        alert(error);
      }
    }

    onClick4 = async () => {
      try{
        ipfs.pin.ls(function (err,pinset) {
          if (err) {
            alert("Error Fetching....");
          }
          else{
            alert(JSON.stringify(pinset));  
          }
        })
      }
      catch(error){
        console.log(error);
      }
    }

    // onClick5 = async () => {
    //   try{
    //     var img = this.state.ipfsHash + ".jpg";
    //     // var pdf = this.state.ipfsHash + ".pdf";
    //     // var json = "this.state.ipfsHash +".json";
    //     ipfs.files.cat(this.state.ipfsHash, function (err, res) {
    //       fileDownload(res,img,function(err){
    //         if (err){
    //           alert("Error Downloading...");
    //         }
    //         else{
    //           alert("File Downloaded");
    //         }
    //       })
    //     }) 
    //   }
    //   catch(error){
    //     alert(error);
    //   }
    // }
                  // <tr>
                  //    <td>Download File From IPFS</td>
                  //    <td><Button onClick={this.onClick5}>Download </Button></td>
                  // </tr>

    render() {
      let newD = "";
      if (this.state.details.timestamp !== undefined){
        let newDate = new Date();
        newDate.setTime(this.state.details.timestamp*1000);
        let dateString = newDate.toString();
        newD = dateString;
      } 
      return (
        <div className="App">
          <header className="App-header">
            <h2> Demo On Using IPFS + Ethereum </h2>
          </header>
          
          <hr />
        <Grid>
              <h4>Unique Certificate ID</h4>
                 <div>
                   <input type = "text" value = {this.state.CertificateUId} onChange = {this.updateState} placeholder=" Enter CertificateUId "/>
                 </div>
              <h4> Choose File</h4>
                  <Form onSubmit={this.onSubmit}>
                  <input type = "file" onChange = {this.captureFile}/><br/><br/>
                  <Button bsStyle="primary" type="submit"> Send </Button>
                  </Form>
            <hr/>
            <Button onClick = {this.onClick}> Get Details  </Button>
            <br/>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Values</th>
                  </tr>
                </thead>
               
                <tbody>
                  <tr>
                    <td>IPFS Hash</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>

                  <tr>
                    <td>Tx Hash # </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>

                  <tr>
                    <td>Block Number # </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>

                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>    

                  <tr>
                    <td> Timestamp </td>
                    <td> {newD} </td>      
                  </tr>  
                  <tr>
                     <td> View Uploaded File From IPFS </td>
                     <td><button><a href={'http://localhost:8081/ipfs/'+ this.state.ipfsHash}>Click Here</a></button></td>
                  </tr>
                  <tr>
                    <td>To Pin Hash To IPFS </td>
                    <td><Button onClick = {this.onClick2}>Pin</Button></td>
                 </tr>
                 <tr>
                    <td>To Unpin Hash From IPFS</td>
                    <td><Button onClick = {this.onClick3}>Unpin</Button></td>
                  </tr>
                  <tr>
                    <td>To List Pinned Hashes</td>
                    <td><Button onClick = {this.onClick4}>List</Button></td>
                  </tr>
                  <tr>
                     <td> Scan QR To Show The Uploaded File In IPFS</td>
                     <td><QRCode value={'https://gateway.ipfs.io/ipfs/'+ this.state.ipfsHash}/></td>
                  </tr>
                </tbody>
            </Table>
        </Grid>
        <Grid>
        <h4>Get By CertificateUId </h4>
          <div>
            <input type = "text" value = {this.state.GetCertId} onChange = {this.updateState1} placeholder="Enter CertificateUId"/>
         </div>
         <br/>
         <Button onClick = {this.onClick1}> Get Details From Blockchain  </Button>
            <Table bordered responsive>
              <tbody>
                <tr>
                <td> Get IPFS Hash Stored In Blockchain </td>
                <td>{this.state.getBcDet}</td>
              </tr>
            </tbody>
          </Table>
        </Grid>
      </div>
    );
  } //render
}
export default App;