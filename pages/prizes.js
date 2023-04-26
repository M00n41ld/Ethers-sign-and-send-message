import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrizesForm from "@/components/containers/PrizesForm";
import { Meta } from "@/components/Meta";
import { Connector } from "@/components/Connector";

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
