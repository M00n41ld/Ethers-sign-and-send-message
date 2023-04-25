import React from "react";
import SignForm from "@/components/containers/SignForm";
import VerifyForm from "@/components/containers/VerifyForm";
import SignContext from "@/components/helpers/SignContext";
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import styles from "../../styles/homeContent.module.scss";
const HomeContent = () => {
  const [signInfo, setSignInfo] = useState({});
  const [localIsConnected, setLocalIsConnected] = useState(false);
  const { address, isConnected } = useAccount();
  
  useEffect(() => {
    setLocalIsConnected(isConnected); 
  }, [isConnected]);

  return (
    <div className={styles.forms}>
      {localIsConnected ? (
        <SignContext.Provider value={{ signInfo, setSignInfo }}>
          <SignForm />
          <VerifyForm />
        </SignContext.Provider>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeContent;
