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
import { Meta } from "@/components/Meta";

export default function Home() {
  return (
    <>
      {/* <Meta />
      <Header /> */}
      <Connector />
      <HomeContent />
      <Footer />
    </>
  );
}
