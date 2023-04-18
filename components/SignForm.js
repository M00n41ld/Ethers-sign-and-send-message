import React, { useState, useRef } from "react";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
// import { ethers } from "ethers";
import { signForm } from "./helpers/sign";

const SignForm = () => {
  const [signInfo, setSignInfo] = useState({});
  const [error, setError] = useState(null);
  const ref = useRef(null);

  const handleSign = async (e) => {
    e.preventDefault();
    if (ref?.current) {
      try {
        const message = ref.current.value;
        const sign = await signForm({ message });
        if(sign === undefined) {
          return setError("User declined signing");
        }  
        setSignInfo({ ...sign });
        setError(null);
      } catch (error) {
        console.log('error')
        setError("Error signing form");
      }
    }
  };

  return (
    <div>
      <h2>SignForm</h2>
      <form onSubmit={handleSign}>
        <Input
          type={"text"}
          placeholder={"Type the message you want to sign"}
          required={true}
          id={"message"}
          key={"message"}
          readOnly={false}
          ref={ref}
        />
        <SubmitButton text={"Sign"} type={"submit"} />
      </form>
      <form>
        {error ? (
          <h1>Error: {error}</h1>
        ) : Object.keys(signInfo).length ? (
          <div>
            <h2>Click each field to copy</h2>
            {Object.entries(signInfo).map((input) => {
              return (
                <Input
                  type={"text"}
                  placeholder={""}
                  required={false}
                  readOnly={true}
                  value={input[1]}
                  id={input[0]}
                  key={input[0]}
                  onClick={(e) => {
                    e.target.select();
                    document.execCommand("copy");
                  }}
                />
              );
            })}
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default SignForm;
