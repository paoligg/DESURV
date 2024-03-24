import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Logo_Desurv from '/public/Logo_Desurv.png';
import Image from 'next/image';
import Logo_entreprise from '/public/logo_create_survey.png';
import answer_survey from '/public/logo_answer_survey.png';
import Link from 'next/link';

function Navbar() {
    return (
        <nav className="fixed top-0 z-10 flex h-32 w-full items-center justify-between px-8 text-white">
            <div className="flex items-center">
                <Link href="/">
                    <Image
                        src={Logo_Desurv}
                        height="300"
                        width="300"
                        alt="Desurv Logo"
                    />
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Image
                        src={answer_survey}
                        height="60"
                        width="60"
                        alt="Answer Survey"
                    />
                </Link>
                <Link href="/business">
                    <Image
                        src={Logo_entreprise}
                        height="60"
                        width="60"
                        alt="Create Survey"
                    />
                </Link>
                <ConnectButton />
            </div>
        </nav>
    );
}

export default Navbar;
