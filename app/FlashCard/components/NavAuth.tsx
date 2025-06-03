"use client"
import React, { useState, useEffect } from 'react'
import { auth } from '@/app/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import styles from './styles.module.css'

const NavAuth = () => {
    const [authUser, setAuthUser] = useState<string | null>(null);

    useEffect(() => {

        const authCheck = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user.uid);
            } else {
                setAuthUser(null);
            }
        })
        
        return () => {
            authCheck();
        }
    }, [])

    const userSignOut = () => {
        auth.signOut();
        setAuthUser(null);
    }

    console.log("User: ", authUser);

  return (
    <>
      { !authUser ? (
        <>
          <Link className={styles.rightbtn} href="../Pages/LoginPage">Log In</Link>
        </>
      ) : (
        <>
          <Link className={styles.rightbtn} href="/" onClick={userSignOut}>Sign Out</Link>
        </>
      )}
    </>
  )
}

export default NavAuth
