import PrizesList from "@/components/PrizesList";
import { useState, useEffect } from "react";
import { getPrizesFromLocalStorage } from "@/components/storage/storage";
import Header from "@/components/Header";
import Head from "next/head";
import Footer from "@/components/Footer";
import { walletConnection } from "@/components/wallet/walletConnection";
import Message from "@/components/Message";
import { handleTimeout } from "@/components/helpers/timeOut";

const Prizes = () => {
  const [prizes, setPrizes] = useState([]);
  const [address, setAddress] = useState(null);
  const [notify, setNotify] = useState(null);
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!window.ethereum) {
          setNotify('Wallet not found')
          setIsNotifyVisible(true);
          handleTimeout(setNotify, setIsNotifyVisible);
        } else {
          try {
            const user = await walletConnection();
            const {provider, signer} = user;
            const signerAddress = await signer.getAddress();
            setAddress(signerAddress); 
          } catch {
            setNotify('User denied access')
            setIsNotifyVisible(true)
            handleTimeout(setNotify, setIsNotifyVisible);
          }
        }
      } catch (error) {
        console.log(error);
        setNotify('Error in connection, try again')
        setIsNotifyVisible(true);
        handleTimeout(setNotify, setIsNotifyVisible);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (address) { 
      setPrizes(getPrizesFromLocalStorage(address));
    }
  }, [address]);

  return (
    <>
    <div>
    <Head>
    <title>Sign and send using blockchain</title>
    <meta name="description" content="Eth sign and send messages" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  
    <Header/>
    <div className="prizes">
        <h2>See the collection of your prizes:</h2>
        <PrizesList prizes={prizes}/>
    </div>
    {isNotifyVisible ? (
    <div className="prizes-error"><Message isVisible={isNotifyVisible} text={notify}/></div>
     ) : null}
    </div>
        <Footer/>
        </>
  );
};

export default Prizes;
