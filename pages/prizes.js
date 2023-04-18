import Navigation from "@/components/Navigation";
import PrizesList from "@/components/PrizesList";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getPrizesFromLocalStorage } from "@/components/storage/useStorage";

const Prizes = () => {
  const [prizes, setPrizes] = useState([]);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.provider.url = "https://rpc-mumbai.maticvigil.com";
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        console.log(signerAddress);
        setAddress(signerAddress); 
      } catch (error) {
        console.log(error);
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
    <div className="prizes">
      <Navigation href={'/'} text={'Home'}/>
        <h1>See the collection of your prizes</h1>
        <PrizesList prizes={prizes}/>
    </div>
  );
};

export default Prizes;
