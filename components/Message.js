import styles from '../styles/message.module.scss'

const Message = ({text, isVisible}) => {
  return (
    <div className={`${styles.messageContainer} ${isVisible ? `${styles.messageVisible}` : null}`}>
    <h4 className={styles.message}>{text}</h4>
    </div>
  )
}

export default Message