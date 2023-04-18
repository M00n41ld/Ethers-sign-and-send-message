import styles from '../styles/submitButton.module.scss'

const SubmitButton = ({onClick, text, type}) => {
  return (
    <button onClick={onClick} className={styles.button} type={type}>{text}</button>
  )
}

export default SubmitButton