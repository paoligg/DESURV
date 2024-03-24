import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { defineChain } from 'viem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    sepolia,
    zora,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const etherlink = defineChain({
    id: 128123,
    name: 'Etherlink Testnet',
    nativeCurrency: { name: 'Tez', symbol: 'XTZ', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://node.ghostnet.etherlink.com/'] },
    },
    blockExplorers: {
        default: {
            name: 'Etherlink Testnet explorer',
            url: 'https://testnet-explorer.etherlink.com/',
        },
    },
});

const config = getDefaultConfig({
    appName: 'RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
    chains: [
        etherlink,
        ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
            ? [sepolia]
            : []),
    ],
    ssr: true,
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={client}>
                <RainbowKitProvider>
                    <Navbar />
                    <div className="mt-32 p-4">
                        <Component {...pageProps} />
                    </div>
                    <Footer />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default MyApp;
