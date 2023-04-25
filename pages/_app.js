import '@/styles/globals.scss'
import { Montserrat } from 'next/font/google'
import { Connector } from '@/components/Connector'
import React from 'react'
import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
  } from "@web3modal/ethereum";
  import { Web3Modal } from "@web3modal/react";
  import { configureChains, createClient, WagmiConfig } from "wagmi";
  import { polygonMumbai } from "wagmi/chains";
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";
  import HomeContent from "@/components/containers/HomeContent";
  
  const chains = [polygonMumbai];
  const projectId = "2fb4f192745ab54faae004004a0681e5";
  
  const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider,
  });
  const ethereumClient = new EthereumClient(wagmiClient, chains);
  console.log(ethereumClient)
  
const montserrat = Montserrat ({
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <main className={montserrat.className}>
      <div className='wrapper'>
      <WagmiConfig client={wagmiClient}>
      <Component {...pageProps} />
      </WagmiConfig>
      </div>
    </main>
  )
}
