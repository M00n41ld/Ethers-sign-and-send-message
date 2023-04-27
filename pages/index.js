import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeContent from "../components/containers/HomeContent";
import { Connector } from "../components/Connector";
import { Meta } from "../components/Meta";
import { useAccount, useSigner } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: signer} = useSigner();

  return (
    <>
      <Meta />
      <Header />
      <Connector isConnected={isConnected}/>
      <HomeContent signer={signer} address={address} isConnected={isConnected}/>
      <Footer />
    </>
  );
}
