import React from "react";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import styles from "../../styles/sendForm.module.scss";
import { sendToContract } from "../services/sendToContract";
import Popup from "../Popup";
import { handleTimeout } from "../helpers/timeOut";


const SendForm = ({ signer, verified, setVerified, setContext, contextObj }) => {
  const [prize, setPrize] = useState("");
  const [drawPrize, setDrawPrize] = useState(false);
  const [notify, setNotify] = useState(null);
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  const [messageStatus, setMessageStatus] = useState(
    "Send message to the smart contract"
  );
  const [disabled, setDisabled] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const isSent = await sendToContract(contextObj, setPrize, setNotify, signer);
      setIsNotifyVisible(true);
      handleTimeout(setNotify, setIsNotifyVisible);
      setDrawPrize(isSent);
      setContext({ address: "", message: "", signature: "" });
      setVerified(false);
      setDisabled(false);
    } catch {
      setDisabled(false);
    }
  };

  console.log(prize)

  return (
    <>
      <div className={styles.buttonContainer}>
        <SubmitButton
          onClick={handleSend}
          type={"button"}
          disabled={!verified || disabled}
          text={isNotifyVisible ? notify : messageStatus}
        />
      </div>
      <div
        className={`${styles.popupContainer} ${
          drawPrize ? styles.popupContainerVisible : ""
        }`}
      >
        {drawPrize ? (
          <div>
            <Popup media={prize} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SendForm;
