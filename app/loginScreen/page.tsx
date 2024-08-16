import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Link from 'next/link'

const LogIn = () => {
  return (
    <main>
      <NavBar/>
      <div className='m-auto w-1/3 bg-white shadow-2xl pb-5 mt-20'>
        <h1 className='text-center text-3xl pt-14 text-purple-900 font-bold'>Log In</h1>
        <br/>
        <div className='m-auto flex items-center'>
          <div className='m-auto'>
            <label>
              <div className='label'>
                <span className='label-text text-xs'>Username</span>
              </div>
              <input className='border-b-2 border-purple-900 bg-transparent pb-1.5 text-lg pl-1 w-80' type='text' placeholder='Username'/>
            </label>
            <br/>
            <label>
              <div className='label'>
                <span className='label-text text-xs'>Password</span>
              </div>
              <input className='border-b-2 border-purple-900 bg-transparent pb-1.5 text-lg pl-1 w-80' type='text' placeholder='Password'/>
              <div className='label'>
                <span className='label-text text-xs text-left'>Forgot Password?</span>
              </div>
            </label>
            <br/>
          </div>
        </div>
        {/* Add Google Sign In Here */}
          <label className='flex flex-col items-center'>
              <p className='text-xs'>Don't have an account? <Link href='../signupScreen' className='text-blue-400 link-hover'>Create one here!</Link></p>
          </label>
          <div className='flex flex-col items-center mt-5'>
                <button className='border-2 border-purple-500 rounded-md px-2 py-1 bg-purple-500 text-white w-44 h-12 text-xl'>Log In!</button>
          </div>
      </div>
    </main>
  )
}

export default LogIn
