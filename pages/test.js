import checkType from "@/components/helpers/checkType"
import { walletConnection } from "@/components/wallet/walletConnection"
import { useEffect } from "react";
const Test = () => {
        useEffect(() => {
          const fetchData = async () => {
            const test = await walletConnection();
            console.log(test);
          };
          fetchData();
        }, []);
 
  return (
    <div>{checkType('https://media.giphy.com/media/JVGLHEuzbVviw/giphy.gif')}</div>
  )
}

export default Test