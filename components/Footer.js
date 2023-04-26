import styles from '../styles/footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <a href='https://t.me/maryreznik'>
        <h2>Got any questions?</h2>
        <span>Contact  me via Telegram</span>
        </a>
    </footer>
  )
}

export default Footer