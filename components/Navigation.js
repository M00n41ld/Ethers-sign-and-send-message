import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/navigation.module.scss';

const Navigation = ({ href, text }) => {
  const { asPath } = useRouter(); 

  const isActive = asPath === href;
  console.log(isActive)
  return (
    <div className={`${styles.nav}`}>
        <Link className={isActive? 'active' : ''} href={href}>{text}</Link>
    </div>
  )
}

export default Navigation