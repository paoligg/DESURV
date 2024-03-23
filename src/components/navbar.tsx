import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Navbar() {
  return (
    <nav className="text-white h-32 px-4 flex items-center justify-start gap-4 fixed top-0 w-full z-10">
            <a href="/" className="text-2xl font-bold">SIARaclette</a>
            <ConnectButton />
  </nav>
  );
}

export default Navbar;
