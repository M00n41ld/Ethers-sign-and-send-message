import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { Web3Modal } from '@web3modal/react'
import { w3mConnectors, w3mProvider, EthereumClient } from '@web3modal/ethereum'
import PrizesForm from "@/components/containers/PrizesForm";
import { Meta } from "@/components/Meta";
import { Connector } from "@/components/Connector";
import { Web3Button } from "@web3modal/react";
const chains = [polygonMumbai]
const projectId = '2fb4f192745ab54faae004004a0681e5'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

const Prizes = () => {
  return (
    <>
        <Web3Button/>
      {/* <Meta />
      <WagmiConfig client={wagmiClient}>
        {/* <Header /> */}
        {/* <Connector/>
        <PrizesForm/>
        <Footer />
        <Web3Modal
        themeVariables={{
          "--w3m-font-family": "Montserrat, sans-serif",
          "--w3m-accent-color": "#ee6352",
          "--w3m-button-border-radius": "6px",
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
      /> */}
      {/* </WagmiConfig>  */}
    
    </>
  );
};

export default Prizes;
