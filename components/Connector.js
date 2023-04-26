import { Web3Button } from "@web3modal/react";
import styles from "../styles/connector.module.scss";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

export function Connector() {
  const { isConnected } = useAccount();
  const [isLocalConnected, setIsLocalConnected] = useState(false);
  useEffect(() => {
    console.log(isConnected, "connector");
    return setIsLocalConnected(isConnected);
  }, [isConnected]);
  return (
    <div className={styles.container}>
      <h2>
        {isLocalConnected
          ? "Successfully connected!"
          : "First Connect your wallet"}
      </h2>
      <Web3Button />
    </div>
  );
}
