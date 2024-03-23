import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import EncryptStringComponent from '@/components/encrypt_message';
import DecryptStringComponent from '@/components/decrypt_message';
import CreateSurvey from '@/components/createsurvey';
import SurveyDisplay from '@/components/surveysDisplay';

const Home: NextPage = () => {
  const [inputMessage, setInputMessage] = useState<string>('');
  const [encryptedMessage, setEncryptedMessage] = useState<string>('');

  return (
    <div>
      <Head>
        <title>Encryption Test</title>
      </Head>
      <main>
        <h1>
          Encryption/Decryption Test
        </h1>
        <input className='text-black'
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter message to encrypt"
        />
        <EncryptStringComponent plaintext={inputMessage}/> 

        <input className='text-black'
          type="text"
          value={encryptedMessage}
          onChange={(e) => setEncryptedMessage(e.target.value)}
          placeholder="Enter encrypted message to decrypt"
        />
        <DecryptStringComponent encryptedText={encryptedMessage}/>
        <CreateSurvey />
        <SurveyDisplay />
      </main>

      <CreateSurvey />
    </div>
  );
};


export default Home;
