import {ethers} from "ethers";

export const walletConnection = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.provider.url = "https://rpc-mumbai.maticvigil.com";
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        return { provider, signer}

}