import {ethers} from "ethers";
import { savePrizeToLocalStorage } from "../storage/storage";
import abi from "@/public/smart-contract/abi.json";
import { walletConnection } from "@/components/wallet/walletConnection";

const CONTRACT_ADDRESS = "0xc96064B5E057043B2F6183Dd85fe58b4131b44D4";

export const sendToContract = async (form, setPrize, setNotify) => {

  const user = await walletConnection();
  const {provider, signer} = user;
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    try {
      const result = async () => {
        try {
          const sig = form.signature.trim();
          const message = form.message.trim();
          const response = await contract.verify(message, sig);
          setNotify('Something went wrong, try again')

          if (response === true) {
            const prizeResponse = await contract.getPrize(message, sig)
            console.log(prizeResponse);
            setPrize(prizeResponse);
            savePrizeToLocalStorage(prizeResponse, form.address.trim())
            setNotify('Message successfully sent!')
            return true;
          }
        } catch (error) {
          console.error(error);
          setNotify('Something went wrong, try again')
        }
      };

     return result();

    } catch (error) {
      console.error(error);
    }
}