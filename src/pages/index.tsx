import { NextPage } from 'next';
import Head from 'next/head';
import EncryptStringComponent from '@/components/encrypt_message';
import DecryptStringComponent from '@/components/decrypt_message';
import CreateSurvey from '@/components/createsurvey';
import SurveyDisplay from '@/components/surveysDisplay';

const Home: NextPage = () => {
  return (
    <div className='grid grid-rows-[auto_1fr_auto] gap-4'>
      <Head>
        <title>My App</title>
        <meta name="description" content="An awesome app" />
      </Head>

      {/* Optional: Any content you want at the top */}
      <div>
        {/* Your top content here */}
      </div>

      {/* This section now takes the remaining space but doesn't push the bottom content entirely to the bottom */}
      <div className='flex-grow'>
        {/* Adjust this space or content as needed */}
      </div>

      {/* Bottom content (your carousel, etc.) with adjusted spacing */}
      <div className='flex flex-col gap-4'>
        <div>
          <span className='text-2xl'>Create Survey</span>
        </div>
        <SurveyDisplay /> 
        <CreateSurvey />
  
      </div>
    </div>
  );
};

export default Home;
