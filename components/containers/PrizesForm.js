import PrizesList from "../PrizesList";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { getPrizesFromLocalStorage } from "@/components/storage/storage";
import styles from "../../styles/prizesForm.module.scss";

const PrizesForm = () => {
  const [prizes, setPrizes] = useState([]);
  const [localIsConnected, setLocalIsConnected] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setLocalIsConnected(isConnected);
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
