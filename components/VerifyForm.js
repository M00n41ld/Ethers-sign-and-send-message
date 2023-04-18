import { useState, useEffect } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import Link from 'next/link';
import Verify from "./helpers/Verify";
import { sendToContract } from "./helpers/sendToContract";

const VerifyForm = () => {
  const [form, setForm] = useState({});
  const [verified, setVerified] = useState("");
  // const [contractInstance, setContractInstance] = useState(null);
  const [prize, setPrize] = useState("");
  const [error, setError] = useState(null);
  const [drawPrize, setDrawPrize] = useState(false);


  const handleMessage = (event) => {
    setForm((currentState) => ({
      ...currentState,
      [event.target.id]: event.target.value,
    }));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const verifyUser = await Verify({ message: form.message, address: form.address, signature: form.signature });
      setVerified(verifyUser);
      setVerified(true);
    } catch (error) {
      console.error(error);
      setError("Failed to verify signature");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const isSent = await sendToContract(form, setPrize, prize);
    console.log(isSent)
    setDrawPrize(isSent);
  };

  return (
    <div>
      <h2>VerifyForm</h2>
      <form onSubmit={handleVerify}>
        <Input
          onChange={handleMessage}
          type={"text"}
          id={"message"}
          placeholder={"Type the message you want to verify"}
          required={true}
          readOnly={false}
        />
        <Input
          onChange={handleMessage}
          type={"text"}
          id={"address"}
          placeholder={"Type the address you want to verify"}
          required={true}
          readOnly={false}
        />
        <Input
          onChange={handleMessage}
          type={"text"}
          id={"signature"}
          placeholder={"Type the signature you want to verify"}
          required={true}
          readOnly={false}
        />
        <SubmitButton type={"submit"} text={"Verify"} />
      </form>
      {verified ? (
        <>
          <h4>Signature is correct!</h4>
           <SubmitButton onClick={handleSend} type={"button"} text={"Click to send your message to the smart contract"} />
        </>
      ) : (
        ''
      )}
      {drawPrize ? <div><h3>Message is sent</h3><Link href='/prizes'>See all your prizes here</Link></div> : ''}
    </div>
  );
};

export default VerifyForm;
