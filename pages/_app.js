import "@/styles/globals.scss";
import { Montserrat } from "next/font/google";
import React from "react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { useState, useEffect } from "react";

const chains = [polygonMumbai];
const projectId = "2fb4f192745ab54faae004004a0681e5";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

const montserrat = Montserrat({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <main className={montserrat.className}>
            <div className="wrapper">
              <Component {...pageProps} />
            </div>
          </main>
        </WagmiConfig>
      ) : null}
      <Web3Modal
        themeVariables={{
          "--w3m-font-family": "Montserrat, sans-serif",
          "--w3m-accent-color": "#ee6352",
          "--w3m-button-border-radius": "6px",
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
