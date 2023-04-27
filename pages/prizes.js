import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrizesForm from "@/components/containers/PrizesForm";
import { Meta } from "@/components/Meta";
import { Connector } from "@/components/Connector";
import { useAccount } from "wagmi";

const Prizes = () => {
  const { address, isConnected } = useAccount();
  return (
    <>
      <Meta />
      <Header />
      <Connector isConnected={isConnected}/>
      <PrizesForm address={address} isConnected={isConnected}/>
      <Footer />
    </>
  );
};

export default Prizes;
