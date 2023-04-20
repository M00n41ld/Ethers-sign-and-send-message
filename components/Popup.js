import styles from '../styles/popup.module.scss'
import checkType from './helpers/checkType'
import Link from 'next/link'

const Popup = ({media}) => {
  console.log(media)

  return (
    <div className={styles.popup}>
      <h3>Here is your prize:</h3>
      {checkType(media)}
      <div className={styles.buttonContainer}>
      <Link className={styles.button} href={'/prizes'}>See all prizes here</Link>
      </div>
    </div>
  )
}

export default Popup