import React from 'react';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Navbar() {
  const { address: account } = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white h-32 px-4 flex items-center justify-between fixed top-0 w-full z-10">
        <div className="flex items-center">
            <a href="/" className="text-2xl font-bold">Wagmi</a>
            <button className="ml-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
            </button>
            <ConnectButton />
        </div>
    
   
      
    
    
  </nav>

  );
}

export default Navbar;
