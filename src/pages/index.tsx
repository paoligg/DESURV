import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import CreateSurvey from '@/components/createsurvey';
import SurveyDisplay from '@/components/surveysDisplay';

export default function Home(){
  return (
      <main>
        <CreateSurvey />
        <SurveyDisplay />
      </main>
  );
};
