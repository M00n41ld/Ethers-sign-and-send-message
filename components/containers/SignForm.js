import React, {
  useState,
  useRef,
  useContext,
} from "react";
import Input from "../Input";
import SubmitButton from "../SubmitButton";
import { sign } from "../helpers/sign";
import SignContext from "../helpers/SignContext";
import styles from "../../styles/signForm.module.scss";
import Message from "../Message";
import { handleTimeout } from "../helpers/timeOut";

const SignForm = ({signer}) => {
  const [notify, setNotify] = useState(null);
  const ref = useRef(null);
  const [isNotifyVisible, setIsNotifyVisible] = useState(false);
  const context = useContext(SignContext);
  const [disabled, setDisabled] = useState(false);

  const handleSign = async (e) => {
    e.preventDefault();
    setDisabled(true)

    if (ref?.current) {
      try {
        const message = ref.current.value;
        const signResult = await sign({ message, setNotify, setIsNotifyVisible, signer });
        if (signResult === undefined) {
          setNotify('Error in signing')
          setIsNotifyVisible(true);
          handleTimeout(setNotify, setIsNotifyVisible);
          setDisabled(false)
          return;
        }
        setNotify("Message signed!");
        setIsNotifyVisible(true);
        handleTimeout(setNotify, setIsNotifyVisible);
        context.setSignInfo({ ...signResult });
        ref.current.value = null;
        setDisabled(false)
      } catch (error) {
        setNotify("Error signing form");
        setIsNotifyVisible(true);
        handleTimeout(setNotify, setIsNotifyVisible);
        setDisabled(false)
      }
    }
  };

  return (
    <div className={styles.signForm}>
      <h2>Sign Form:</h2>
      <form onSubmit={handleSign}>
        <Input
          type={"text"}
          placeholder={"Type the message you want to sign"}
          required={true}
          id={"message"}
          key={"message"}
          ref={ref}
        />
        <div className={styles.container}>
          <SubmitButton text={"Sign"} type={"submit"} disabled={disabled}/>
          <Message isVisible={isNotifyVisible} text={notify}/>
        </div>
      </form>
    </div>
  );
};

export default SignForm;
