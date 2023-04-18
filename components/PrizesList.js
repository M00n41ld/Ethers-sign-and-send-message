import styles from '../styles/prizesList.module.scss'
import checkType from './helpers/checkType';

const PrizesList = ({prizes}) => {
    function increment() {
        let i = 0;
      return function () {
        return i++;
       }
    }

    let counter = increment();

  return (
    <ul className={styles.prizesList}>
        {prizes.map((prize) => <li key={counter()}>
        {checkType(prize)}
        </li>)}
    </ul>
  )
}

export default PrizesList