import React from "react";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import styles from "../../styles/sendForm.module.scss";
import { sendToContract } from "../services/sendToContract";
import Popup from "../Popup";
import { handleTimeout } from "../helpers/timeOut";

const SendForm = ({
  verified,
  setVerified,
  setContext,
  contextObj,
}) => {
  const [prize, setPrize] = useState("");
  const [drawPrize, setDrawPrize] = useState(false);
  const [notify, setNotify] = useState(null);
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  const [messageStatus, setMessageStatus] = useState('Send message to the smart contract')
  const handleSend = async (e) => {
    e.preventDefault();
    const isSent = await sendToContract(contextObj, setPrize, setNotify);
    setIsNotifyVisible(true);
    handleTimeout(setNotify, setIsNotifyVisible);
    setDrawPrize(isSent);
    setContext({ address: "", message: "", signature: "" });
    setVerified(false);
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <SubmitButton
          onClick={handleSend}
          type={"button"}
          disabled={!verified}
          text={isNotifyVisible? notify: messageStatus}
        />
        {/* <Message isVisible={isNotifyVisible} text={notify}/> */}
      </div>
      {drawPrize ? (
        <div>
          <Popup media={prize} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SendForm;
