'use client'
import React from 'react'
import Link from 'next/link'
import styles from './styles.module.css'
import NavAuth from './NavAuth'


const NavBar = () => {
  return (
    <div className={styles.navbar}>
        <Link className={styles.homebtn} href="../">Memorize</Link>
        <NavAuth/>
        
    </div>
  )
}

export default NavBar
