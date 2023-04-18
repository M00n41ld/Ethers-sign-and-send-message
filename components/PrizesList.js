import styles from '../styles/prizesList.module.scss'
import Image from 'next/image';
import Head from 'next/head';
import Script from 'react-async-script';

const PrizesList = ({prizes}) => {
    function increment() {
        let i = 0;
      return function () {
        return i++;
       }
    }
    let counter = increment();

    const checkType = (prize) => {
      const regex = /(jpg|webp)/;
      const typeImage = regex.test(prize)
      console.log(prize)
      console.log(typeImage)
      if(typeImage) {
        return (
          <Image width={'300'} height={'200'} src={prize} alt={'prize description'}></Image>
        ) 
      } else {
        return (
          <iframe width={'300'} height={'200'} src={prize}></iframe>
        )
      
      }
    }
  return (
    <ul className={styles.prizesList}>
        {prizes.map((prize) => <li key={counter()}>
        {checkType(prize)}
        </li>)}
    </ul>
  )
}

export default PrizesList