import { ethers } from "ethers";

const Verify = async ({ message, address, signature }) => {
    try {
      console.log(signature);
      const signerAddress = ethers.utils.verifyMessage(
        message,
        signature.trim()
      );
      if (signerAddress !== address) {
        return false;
      }
      return true;
    } catch (err) {
      console.error(err);
    //   setError("Failed to verify signature");
      return false;
    }
  };

export default Verify;