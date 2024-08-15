import React from 'react'
import Link from 'next/link'

const LogInButton = () => {
  return (
    <div>
        <Link href='/loginScreen'>
            <button 
                className="btn">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                <image height="25" width="25" href="/images/pfpPlacer.png" />
                </svg>
                <h2 className = 'pl-1 font-bold'>Log In</h2>
            </button>
        </Link>
    </div>
  )
}

export default LogInButton
