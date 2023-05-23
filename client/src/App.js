import {useState,useEffect} from 'react';
import './App.css';
import abi from "./contracts/DAROSmartContract.json";
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero1';
import DataSection from './components/DataSection';
import Footer from './components/Footer';
import NewPublication from './components/newPublication';
import FileSubmit from "./components/FileSubmit";
import PublicationPage from './components/PublicationPage';
import Profile from './components/Profile';
import { ethers } from "ethers";

function App() {

  const [state,setState] = useState({
    provider:null,
    signer:null,
    contract:null,
  })

  const [account,setAccount] = useState('None');
  const [id,setId]=useState(1);

  useEffect(()=>{
    const connectWallet=async()=>{
      // const contractAddress = "0xaCF9B93a41A4804fD40a2FA984303BC80355D121";
      const contractAddress = "0x7743b28F24157ab014e39eFA79C172C58679E01e";
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

  function setIdfunc(_id){
    setId(_id);
  }



  return (
    
    <div className="App">
      <Navbar state={state} account={account}/>
      {/* <Hero /> */}
      {/* <DataSection /> */}
      {/* <NewPublication state={state}/> */}
      {/* <FileSubmit /> */}
      {/* <PublicationPage state={state} setId={setIdfunc}/> */}
      <Profile state={state} account={account}/>
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