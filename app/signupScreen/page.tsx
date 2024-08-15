import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import Link from 'next/link'

const SignUp = () => {
  return (
    <main>
      <NavBar/>
      <div className='m-auto w-1/3 bg-white shadow-2xl pb-5 mt-20'>
        <h1 className='text-center text-3xl pt-14 text-purple-900 font-bold'>Sign Up</h1>
        <br/>
        <div className='m-auto flex items-center'>
          <div className='m-auto pb-10'>
            <label>
              <div className='label'>
                <span className='label-text text-xs'>Email</span>
              </div>
              <input className='border-b-2 border-purple-900 bg-transparent pb-1.5 text-lg pl-1 w-80' type='text' placeholder='Email'/>
            </label>
            <br/>
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
            </label>
            <br/>
            <label>
              <div className='label'>
                <span className='label-text text-xs'>Re-Enter Password</span>
              </div>
              <input className='border-b-2 border-purple-900 bg-transparent pb-1.5 text-lg pl-1 w-80' type='text' placeholder='Re-Enter Password'/>
            </label>
            <br/>
          </div>
        </div>
        <label className='flex flex-col items-center'>
              <p className='text-xs'>Already have an account? <Link href='../loginScreen' className='text-blue-400 link-hover'>Log In Here!</Link></p>
          </label>
          <div className='flex flex-col items-center mt-5'>
                <button className='border-2 border-purple-500 rounded-md px-2 py-1 bg-purple-500 text-white w-44 h-12 text-xl'>Sign Up Now!</button>
          </div>
      </div>
      
    </main>
  )
}

export default SignUp
