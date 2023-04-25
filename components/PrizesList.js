import React, { useState, useEffect } from "react";
import styles from "../styles/prizesList.module.scss";
import checkType from "./helpers/checkType";

const PrizesList = ({ prizes }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ul className={styles.prizesList}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        prizes.map((prize, index) => (
          <li className={styles.prizesItem} key={index}>
            {checkType(prize)}
            <div className={styles.overlay}>
              <a href={prize}>
                <span>Click to see full</span>
              </a>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default PrizesList;
