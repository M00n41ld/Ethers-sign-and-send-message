import {ethers} from "ethers";
import { useState } from "react";
import { savePrizeToLocalStorage } from "../storage/useStorage";
import contractAbi from "@/public/smart-contract/abi.json";
const CONTRACT_ADDRESS = "0xc96064B5E057043B2F6183Dd85fe58b4131b44D4";
const abi = contractAbi;
console.log(process.env.CONTRACT_ADDRESS)

export const sendToContract = async (form, setPrize, prize) => {
  // const [prize, setPrize] = useState('')

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.provider.url = "https://rpc-mumbai.maticvigil.com";
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    // setContractInstance(contract);
    try {
      const result = async () => {
        try {

          const sig = form.signature.trim();
          const response = await contract.verify(form.message, sig);
          // console.log(response);
          console.log("verified");

          if (response === true) {
            const prizeResponse = await contract.getPrize(form.message, sig)
            console.log(prizeResponse);
            setPrize(prizeResponse);
            // console.log(prize)
            savePrizeToLocalStorage(prize)
            return true;
          }
        } catch (error) {
          console.error(error);
        }
      };
     return result();
    } catch (error) {
      console.error(error);
    }
}