import React from 'react';
import './Navbar.css';
import { accessListify } from 'ethers/lib/utils';

const Navbar = ({account}) => {
    const shortenAddress = (address) => {
        return `${address.substring(0, 5)}...${address.substring(
        address.length - 4,
        address.length
        )}`;
   }
   const acc=shortenAddress(account);
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Title</h1>
      </div>
      <div className="navbar-right">
        <button className="navbar-button">Profile</button>
        <button className="navbar-button">Publications</button>
        <button className="navbar-button">Connected Account: {acc}</button>
      </div>
    </nav>
  );
};

export default Navbar;
