import React from "react";
import SignForm from "./SignForm";
import VerifyForm from "@/components/containers/VerifyForm";
import SignContext from "@/components/helpers/SignContext";
import { useState, useEffect } from "react";
import styles from "../../styles/homeContent.module.scss";

const HomeContent = ({signer, address, isConnected}) => {
  const [signInfo, setSignInfo] = useState({});
  const [localIsConnected, setLocalIsConnected] = useState(false);
  
  console.log(isConnected)
  useEffect(() => {
    setLocalIsConnected(isConnected); 
  }, [isConnected]);

  return (
    <div className={styles.forms}>
      {localIsConnected ? (
        <SignContext.Provider value={{ signInfo, setSignInfo }}>
          <SignForm signer={signer}/>
          <VerifyForm signer={signer}/>
        </SignContext.Provider>
      ) : (
        ""
      )}
    </div>
  );
};

export default HomeContent;
