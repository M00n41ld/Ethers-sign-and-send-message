import { handleTimeout } from "./timeOut";

export const sign = async ({
  message,
  setNotify,
  setIsNotifyVisible,
  signer,
}) => {
  try {
    const address = await signer.getAddress();
    //изначально я хешировала сообщение, тк в тз была подсказка, но и без хеша функция контракта verify отрабатывает успешно
    // const hashedMessage = ethers.utils.hashMessage(message);
    const signature = await signer.signMessage(message);
    return {
      message,
      address,
      signature,
    };
  } catch (error) {
    setNotify("Error in signing");
    setIsNotifyVisible(true);
    handleTimeout(setNotify, setIsNotifyVisible);
  }
};
