import styles from '../styles/input.module.scss'
import React from 'react';
import { forwardRef } from 'react';

const Input = forwardRef(function createInput({placeholder, required, id, onChange, text}, ref) {

  return (
    <label >
    <textarea ref={ref} onChange={onChange} className={styles.input} placeholder={placeholder} required={required} id={id} value={text}/>
    </label>
  )
})

export default Input
