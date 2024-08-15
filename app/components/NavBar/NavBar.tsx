import React from 'react'
import LogInButton from './LogInButton'
import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="navbar bg-purple-400 text-neutral-content">
        <div className='navbar-start'>
            <Link href='../'>
                <h1 className="text-xl font-bold">Memorize</h1>
            </Link>
        </div>
        <div className='navbar-end'>
            {/* Log in button goes here*/}
            <LogInButton />
            <div className='dropdown dropdown-hover dropdown-bottom dropdown-end'>
                <div tabIndex={0} role='button'>
                    <button className='btn btn-square btn-ghost'>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                    <ul tabIndex={0} className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'>
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default NavBar
