const savePrizeToLocalStorage = (prize) => {
    try {
      const prizes = JSON.parse(window.localStorage.getItem("prizes")) || [];
      prizes.push(prize);
      window.localStorage.setItem("prizes", JSON.stringify(prizes));
      console.log("saved");
    } catch (error) {
      console.error(error);
    }
  };
  

export {savePrizeToLocalStorage}