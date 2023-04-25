import { useState, useContext, useEffect } from "react";
import Input from "../Input";
import SubmitButton from "../SubmitButton";
import verify from "../helpers/Verify";
import SignContext from "../helpers/SignContext";
import styles from '../../styles/verifyForm.module.scss'
import Message from "../Message";
import { handleTimeout } from "../helpers/timeOut";
import SendForm from "./SendForm";

const VerifyForm = () => {
  const contextObj = useContext(SignContext).signInfo;
  const setContext = useContext(SignContext).setSignInfo;
  const [verified, setVerified] = useState("");
  const [notify, setNotify] = useState(null);
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [initialContextObj, setInitialContextObj] = useState(contextObj);

  useEffect(() => {
    if (
      contextObj.message !== initialContextObj.message ||
      contextObj.address !== initialContextObj.address ||
      contextObj.signature !== initialContextObj.signature
    ) {
     setVerified(false);
    }
  }, [contextObj]);

  useEffect(() => {
    if (verified === true) {
      setInitialContextObj(contextObj);
    }
  }, [verified]);

  const handleMessage = (event) => {
    setContext((currentState) => ({
      ...currentState,
      [event.target.id]: event.target.value,
    }))
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setNotify(null);
    setDisabled(true)
    try {
      const verifyUser = await verify({
        message: contextObj.message,
        address: contextObj.address,
        signature: contextObj.signature,
        setNotify
      }
      );
      setDisabled(false)
      setVerified(verifyUser);
      setIsNotifyVisible(true);
      handleTimeout(setNotify, setIsNotifyVisible);
    } catch (error) {
      console.error(error);
      setDisabled(false)
      setNotify("Failed to verify signature");
      setIsNotifyVisible(true);
      handleTimeout(setNotify, setIsNotifyVisible);
    }
  };

  return (
    <div>
    <div className={styles.verifyForm}>
      <h2>Verify Form:</h2>
      <form onSubmit={handleVerify}>
        <Input
          onChange={handleMessage}
          type={"text"}
          id={"message"}
          value={contextObj.message}
          placeholder={"Type the message you want to verify"}
          required={true}
          readOnly={false}
          text={contextObj.message}
        />
        <Input
          onChange={handleMessage}
          type={"text"}
          id={"address"}
          placeholder={"Type the address you want to verify"}
          required={true}
          readOnly={false}
          text={contextObj.address}
        />
        <Input
          onChange={handleMessage}
          type={"text"}
          id={"signature"}
          placeholder={"Type the signature you want to verify"}
          required={true}
          readOnly={false}
          text={contextObj.signature}
        />
        <div className={styles.container}>
        <SubmitButton disabled={disabled} type={"submit"} text={"Verify"} />
        <Message isVisible={isNotifyVisible} text={notify} />
      </div>
      </form>
    </div>
    <SendForm verified={verified} setVerified={setVerified} setContext={setContext} contextObj={contextObj} setNotify={setNotify}/>
   </div>
  );
};

export default VerifyForm;

