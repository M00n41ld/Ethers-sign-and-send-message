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
import { Connector } from "@/components/Connector";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
// const chains = [polygonMumbai];
// const projectId = "2fb4f192745ab54faae004004a0681e5";

// const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
// const wagmiClient = createClient({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, version: 1, chains }),
//   provider,
// });
// const ethereumClient = new EthereumClient(wagmiClient, chains);
// console.log(ethereumClient)

export default function Home() {
  return (
    <>
        <Connector/>
        <HomeContent />
        <Footer />
    </>
  );
}
