import styles from '../styles/input.module.scss'
import React from 'react';
import { forwardRef } from 'react';

const Input = forwardRef(function createInput({type, placeholder, required, readOnly, value, id, onChange, onClick}, ref) {
  
  return (
    readOnly? 
    <label >
    <textarea ref={ref} onClick={onClick} className={styles.inputReadOnly} type={type} placeholder={placeholder} required={required} readOnly={readOnly} value={value} id={id}  ></textarea>
    </label> :
    <label >
    <textarea ref={ref} onChange={onChange} className={styles.input} type={type} placeholder={placeholder} required={required} readOnly={readOnly} id={id} ></textarea>
    </label>
  )
})

export default Input