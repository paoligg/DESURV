import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import myImage from '/public/Logo_Desurv.png';
import Image from 'next/image'
import Link from 'next/link';

function Navbar() {
  return (
    <nav className="text-white h-32 px-8 flex items-center justify-between gap-4 fixed top-0 w-full z-10">
                       
      <a href="/">
      <Image src={myImage} height="120" width="120" alt="Description" />
      </a>
            <ConnectButton />
  </nav>
  );
}

export default Navbar;
