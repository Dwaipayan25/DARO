import React, { useState, useEffect } from 'react';
import Card from './Card';
import MessageCard from './MessageCard';
import './Profile.css';
import { ethers } from "ethers";

export const shortenAddress = (address) => {
    return `${address.substring(0, 5)}...${address.substring(
    address.length - 4,
    address.length
    )}`;
  }
  const dummyMessages = [
    "Welcome to your profile!",
    "You have successfully logged in.",
    "New publication created.",
    "Contribution received.",
    "Funds distributed successfully.",
    "Profile settings updated.",
  ];
  const Dummypublications = [
    {
      title: 'Publication 1',
      description: 'This is the description of Publication 1.',
      ownerAddress: '0x1aBcDeFgHiJkLmNoPqRsTuVwXyZ',
    },
    {
      title: 'Publication 2',
      description: 'This is the description of Publication 2.',
      ownerAddress: '0x2bCdEfGhIjKlMnOpQrStUvWxYz',
    },
    {
      title: 'Publication 3',
      description: 'This is the description of Publication 3.',
      ownerAddress: '0x3cDeFgHiJkLmNoPqRsTuVwXyZaB',
    },
    {
      title: 'Publication 4',
      description: 'This is the description of Publication 4.',
      ownerAddress: '0x4dEfGhIjKlMnOpQrStUvWxYzAbCd',
    },
  ];

const Profile = ({state,account}) => {
  const [contributorId, setContributorId] = useState('');
  const [contributorAddress, setContributorAddress] = useState('');
  const [publications,setPublications]=useState([]);
  const [messages,setMessages]=useState([]);

  const handleContributorIdChange = (e) => {
    setContributorId(e.target.value);
  };

  const handleContributorAddressChange = (e) => {
    setContributorAddress(e.target.value);
  };

  const handleAddContributor = () => {
    // addContributor(parseInt(contributorId), contributorAddress);
    setContributorId('');
    setContributorAddress('');
  };

  const distributeFunds=()=>{

  }
  const {contract}= state;

  const changeToInt=(_x)=>{
      const x= ethers.utils.formatEther(_x)*(10**18);
      return x;
  }
  async function getPublicationsByAddress(address) {
    const publications = await contract.getPublicationsByAddress(account);
      console.log(publications);
    const messages = await contract.getMessage(account);
    console.log(messages);
  };

  const addContributor=async (e)=>{
    e.preventDefault();
    const { contract } = state;
    const iid=contributorId;
    const cad=contributorAddress;
    console.log(iid,cad);
    const tx=await contract.allowContributor(iid,cad);
    await tx.wait();
    alert("Contributor Added");
    setContributorId('');
    setContributorAddress('');
  }

  useEffect(()=>{
    const showPublications=async(e)=>{
          console.log("hello")
          const { contract } = state; 
          const publications = await contract.getPublicationsByAddress(account);
          console.log(publications);
          setPublications(publications);
          const messages = await contract.getMessage(account);
        console.log(messages);
        setMessages(messages);
      }
      contract && showPublications();
  },[contract])

  return (
    <div className="profile">
      <h1 className="account-number">{account}</h1>
      <div className="profile-info">
        <div className="publication-info">
          {/* <p>Number of Publications: {publications.length}</p> */}
          <p>Number of Publications: {publications.length}</p>
        </div>
        <div className="publication-list">
      {publications.map((publication, index) => (
          <Card
            key={index}
            title={publication.title}
            description={publication.description}
            ownerAddress={shortenAddress(publication.researcher)}
          />
        ))}
      </div>
        
      </div>
      <div className="contributor-section">
        <h2>Add Contributor:</h2>
        <div className="contributor-inputs">
          <input
            type="number"
            placeholder="Project ID"
            value={contributorId}
            onChange={handleContributorIdChange}
          />
          <input
            type="text"
            placeholder="Contributor Address"
            value={contributorAddress}
            onChange={handleContributorAddressChange}
          />
          <button onClick={addContributor}>Add</button>
        </div>
      </div>
      <div className="distribute-funds">
        <h2>Distribute Funds:</h2>
        <button onClick={distributeFunds}>Distribute</button>
      </div>
      <div className="messages">
          <h2>Messages:</h2>
          <ul>
          {messages.map((message, index) => (
          <MessageCard
            key={index}
            accountNumber={message.userAddress}
            projectId={changeToInt(message.id)}
            description={message.data}
            timestamp={changeToInt(message.timestamp)}
          />
        ))}
          </ul>
        </div>
        <button onClick={()=>getPublicationsByAddress(account)}>Test</button>
    </div>
  );
};

export default Profile;
