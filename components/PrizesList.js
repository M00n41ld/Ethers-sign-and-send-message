import styles from '../styles/prizesList.module.scss'
import checkType from './helpers/checkType';

const PrizesList = ({prizes}) => {
  return (
    <ul className={styles.prizesList}>
        {prizes.map((prize, index) => <li className={styles.prizesItem} key={index}>
        {checkType(prize)}
        <div className={styles.overlay}><a href={prize}><span>Click to see full</span></a></div>
        </li>)}
    </ul>
  )
}

export default PrizesList