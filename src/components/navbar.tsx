import React from 'react';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Navbar() {
  const { address: account } = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white h-32 px-4 flex items-center justify-start gap-4 fixed top-0 w-full z-10">
            <a href="/" className="text-2xl font-bold">SIARaclette</a>
            <ConnectButton />
  </nav>

  );
}

export default Navbar;