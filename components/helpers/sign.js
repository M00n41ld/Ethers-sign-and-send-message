import { ethers } from "ethers";
import { handleTimeout } from "./timeOut";

export const sign = async ({
  message,
  setNotify,
  setIsNotifyVisible,
  signer,
}) => {
  try {
    const address = await signer.getAddress();
    const hashedMessage = ethers.utils.hashMessage(message);
    const signature = await signer.signMessage(hashedMessage);
    return {
      message: hashedMessage,
      address,
      signature,
    };
  } catch (error) {
    setNotify("Error in signing");
    setIsNotifyVisible(true);
    handleTimeout(setNotify, setIsNotifyVisible);
  }
};
