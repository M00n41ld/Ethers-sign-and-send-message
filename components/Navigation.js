import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/navigation.module.scss';
import React from 'react';

const Navigation = ({ href, text }) => {
  const { asPath } = useRouter(); 

  const isActive = asPath === href;
  console.log(isActive)
  return (
    <nav className={`${styles.nav}`}>
        <Link className={isActive? 'active' : ''} href={href}>{text}</Link>
    </nav>
  )
}

export default Navigation