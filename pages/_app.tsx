import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { avalancheFuji, sepolia} from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "../context/userContext";
import Layout from "../components/Layout";
import { defineChain } from "viem";

export const minato = /*#__PURE__*/ defineChain({
  id: 1946,
  name: 'Minato',
  nativeCurrency: {
    decimals: 18,
    name: 'Sepolia Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://rpc.minato.soneium.org'] },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://explorer-testnet.soneium.org',
      apiUrl: 'https://explorer-testnet.soneium.org/api',
    },
  },
  contracts: {
    multicall3: {
      address: '0x6E59Bf419a87FE1EA3AB97029c44568F6689aD5e',
      blockCreated: 1369034,
    },
  },
  testnet: true,
  iconUrl: 'https://picsum.photos/200' //TODO replace with the correct icon URL
})

const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: process.env.NEXT_PUBLIC_PROYECT_ID ?? "",
  chains: [
    avalancheFuji,
    minato,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [avalancheFuji]
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
          <ChakraProvider theme={theme}>
          <UserProvider>
            <Layout>
              <Component {...pageProps} />
              <Toaster />
            </Layout>
          </UserProvider>
          </ChakraProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
