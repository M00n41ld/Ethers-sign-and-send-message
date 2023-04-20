import styles from '../styles/submitButton.module.scss'

const SubmitButton = ({onClick, text, type, disabled}) => {
  return (
    <button onClick={onClick} className={`${styles.button}`} type={type} disabled={disabled}>{text}</button>
  )
}

export default SubmitButton