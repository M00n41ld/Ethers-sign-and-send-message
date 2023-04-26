import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomeContent from "@/components/containers/HomeContent";
import { Connector } from "@/components/Connector";
import { Meta } from "@/components/Meta";

export default function Home() {
  return (
    <>
      <Meta />
      <Header />
      <Connector />
      <HomeContent />
      <Footer />
    </>
  );
}
