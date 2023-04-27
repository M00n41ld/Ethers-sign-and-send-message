const savePrizeToLocalStorage = (prize, address, setNotify) => {

  try {
    const prizes = JSON.parse(window.localStorage.getItem(address)) || [];
    prizes.push(prize);
    window.localStorage.setItem(address, JSON.stringify(prizes));
  } catch (error) {
    console.error(error);
    setNotify('Error saving prizes')
  }
};

const getPrizesFromLocalStorage = (address) => {
  const storedPrizes = window.localStorage.getItem(address);
  return storedPrizes ? JSON.parse(storedPrizes) : [];
};
export { savePrizeToLocalStorage, getPrizesFromLocalStorage };
