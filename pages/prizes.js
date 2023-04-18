import Navigation from "@/components/Navigation";
import PrizesList from "@/components/PrizesList";
import { useState, useEffect } from "react";

const prizes = () => {
    const [prizes, setPrizes] = useState([]);
    console.log(prizes)
    const getPrizesFromLocalStorage = () => {
        return JSON.parse(window.localStorage.getItem('prizes')) || []; // Получаем массив из LocalStorage или создаем пустой массив, если он не существует
      };

      useEffect (() => {
        setPrizes(getPrizesFromLocalStorage())
      }, [])
    
  return (
    <div className="prizes">
      <Navigation href={'/'} text={'Home'}/>
        <h1>See the collection of your prizes</h1>
        {/* <div>{prizes.length}</div> */}
        <PrizesList prizes={prizes}/>
    </div>
  )
}

export default prizes