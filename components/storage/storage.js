const savePrizeToLocalStorage = (prize, address, setNotify) => {

  try {
    const prizes = JSON.parse(window.localStorage.getItem(address)) || [];
    prizes.push(prize);
    window.localStorage.setItem(address, JSON.stringify(prizes));
  } catch (error) {
    console.error(error);
    setNotify('Error loading prizes')
  }
};

const getPrizesFromLocalStorage = (address) => {
  return JSON.parse(window.localStorage.getItem(address)) || [];
};

export { savePrizeToLocalStorage, getPrizesFromLocalStorage };
