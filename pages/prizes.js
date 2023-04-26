import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";
import {
  w3mConnectors,
  w3mProvider,
  EthereumClient,
} from "@web3modal/ethereum";
import PrizesForm from "@/components/containers/PrizesForm";
import { Meta } from "@/components/Meta";
import { Connector } from "@/components/Connector";
import { Web3Button } from "@web3modal/react";

const Prizes = () => {
  return (
    <>
      <Meta />
      <Header />
      <Connector />
      <PrizesForm />
      <Footer />
    </>
  );
};

export default Prizes;
