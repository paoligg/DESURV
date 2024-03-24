import { sepolia } from 'wagmi/chains';
import { defineChain } from 'viem';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
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

export const config = getDefaultConfig({
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
