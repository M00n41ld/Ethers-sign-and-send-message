import PrizesList from "../PrizesList";
import { useEffect, useState } from "react";
import React from "react";
import { getPrizesFromLocalStorage } from "../storage/storage";
import styles from "../../styles/prizesForm.module.scss";

const PrizesForm = ({address, isConnected}) => {
  const [prizes, setPrizes] = useState([]);
  const [localIsConnected, setLocalIsConnected] = useState(false);

  useEffect(() => {
    setLocalIsConnected(isConnected);
    console.log(isConnected)
  }, [isConnected]);

  useEffect(() => {
    if (address) {
      const allPrizes = getPrizesFromLocalStorage(address);
      setPrizes(allPrizes);
    }
  }, [address]);

  return (
    <div>
      {localIsConnected ? (
        <div className={styles.prizes}>
          <h2>See the collection of your prizes:</h2>
          {prizes.length ? (
            <PrizesList prizes={prizes} />
          ) : (
            <h3>You have no prizes yet!</h3>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PrizesForm;
