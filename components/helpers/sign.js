import { ethers } from "ethers";

export const signForm = async ({ message }) => {
    try {
      if (!window.ethereum) {
        console.log("eth extension not found");
      } else {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          provider.provider.url = "https://rpc-mumbai.maticvigil.com";

          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          console.log(signer)
          const address = await signer.getAddress();

          const hashedMessage = ethers.utils.hashMessage(message);
          const signature = await signer.signMessage(hashedMessage);
          return {
            message: hashedMessage,
            address,
            signature,
          };
        } catch (error) {
          console.log(error);
        }
      }
    } catch {
      console.log("err");
    }
  };