import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo_Desurv from '/public/Logo_Desurv.png';
import Image from 'next/image'
import Logo_entreprise from '/public/logo_create_survey.png';
import answer_survey from '/public/logo_answer_survey.png';

function Navbar() {
  return (
    <nav className="text-white h-32 px-8 flex items-center justify-between gap-4 fixed top-0 w-full z-10">
                       
      <a href="/">
      <Image src={Logo_Desurv} height="300" width="300" alt="Description" />
      </a>
      <a href="/">
      <Image src={answer_survey} height="60" width="60" alt="Description" />
      </a>
      <a href="/createSurvey">
      <Image src={Logo_entreprise} height="60" width="60" alt="Description" />
      </a>
            <ConnectButton />
  </nav>
  );
}

export default Navbar;
