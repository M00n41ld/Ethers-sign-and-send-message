import Link from 'next/link';
import styles from '../styles/navigation.module.scss';

const Navigation = ({href, text}) => {
  return (
    <div className={styles.nav}>
        <Link href={href}>{text}</Link>
    </div>
  )
}

export default Navigation