import { ethers } from "ethers";

const verify = async ({ message, address, signature, setNotify }) => {
  try {
    const signerAddress = ethers.utils.verifyMessage(message, signature);
    if (signerAddress !== address) {
      setNotify("Signature is invalid");
      return false;
    }
    setNotify("Signature is valid");
    return true;
  } catch (err) {
    console.log(err);
    setNotify("Something wrong with signature");
    return false;
  }
};

export default verify;
