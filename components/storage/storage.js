const savePrizeToLocalStorage = (prize, address) => {
  console.log(address)
  console.log(prize)
  try {
    const prizes = JSON.parse(window.localStorage.getItem(address)) || [];
    prizes.push(prize);
    window.localStorage.setItem(address, JSON.stringify(prizes));
    console.log("saved");
  } catch (error) {
    console.error(error);
  }
};

const getPrizesFromLocalStorage = (address) => {
  console.log(address)
  return JSON.parse(window.localStorage.getItem(address)) || [];
};

export { savePrizeToLocalStorage, getPrizesFromLocalStorage };
