import { ethers } from "ethers";
import { walletConnection } from "../wallet/walletConnection";

export const signForm = async ({ message, setNotify }) => {
    try {
      if (!window.ethereum) {
        setNotify('Wallet not found')
      } else {
        try {
          const user = await walletConnection();
          const {provider, signer} = user;
          const address = await signer.getAddress();
          const hashedMessage = ethers.utils.hashMessage(message);
          const signature = await signer.signMessage(hashedMessage);
          return {
            message: hashedMessage,
            address,
            signature,
          };
        } catch (error) {
          setNotify('Error in connection')
        }
      }
    } catch {
      setNotify('Error: try again')
    }
  };