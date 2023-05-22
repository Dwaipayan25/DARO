import {useState,useEffect} from 'react';
import './App.css';
import abi from "./contracts/DAROSmartContract.json";
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero1';
import DataSection from './components/DataSection';
import Footer from './components/Footer';
// import Auctions from './components/Auctions';
// import CreateAuction from './components/CreateAuction';
// import ShowAuction from './components/ShowAuction';
// const {ethers} = require('ethers');
import { ethers } from "ethers";

function App() {

  const [state,setState] = useState({
    provider:null,
    signer:null,
    contract:null,
  })

  const [account,setAccount] = useState('None');
  const [id,setId]=useState(0);

  useEffect(()=>{
    const connectWallet=async()=>{
      const contractAddress = "0x938C90ce6062e6271fb549f3be2B3f83c7E76316";
      const contractABI=abi.abi;
      try{
        const {ethereum}=window;
        if(ethereum){
          const accounts=await ethereum.request({method:"eth_requestAccounts"});

          window.ethereum.on("chainChanged",()=>{
            window.location.reload();
          })

          window.ethereum.on("accountsChanged",()=>{
            window.location.reload();
            connectWallet();
          })
        
          const provider=new ethers.providers.Web3Provider(window.ethereum);
          const signer=provider.getSigner();
          const contract=new ethers.Contract(contractAddress,contractABI,signer);
          console.log(accounts[0]);
          setAccount(accounts[0]);
          setState({provider,signer,contract});
          console.log(state);
        }else{
          alert("please install metamask")
        }
      }
      catch{
        console.log("error");
      }
    };
    connectWallet();
  },[])
  console.log(state);



  return (
    
    <div className="App">
      <Navbar state={state} account={account}/>
      <Hero />
      <DataSection />
      <Footer />
      {/*<div className='blur' style={{backgroud:"blue"}}></div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CreateAuction state={state} />} />
          <Route path="/auctions" element={<Auctions state={state} setid={setIdfunc}/>} />
          <Route path="/show" element={<ShowAuction state={state} id={id}/>} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;