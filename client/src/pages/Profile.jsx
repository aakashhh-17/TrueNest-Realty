import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
const {currentUser} = useSelector((state) => state.user);

  return (
    <div className='w-lg p-3 mx-auto'>
      <h1 className=' text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-y-3 '>
      <img className='self-center rounded-full h-20 w-20 ' src={currentUser.avatar} alt="profile" />
      <input className='bg-white p-3 rounded-md'  type="text" placeholder='Username' id="username" />
      <input className='bg-white p-3 rounded-md' type="email" placeholder='Email' id="email" />
      <input className='bg-white p-3 rounded-md' type="password" placeholder='Username' id="username" />
      <button type='button' className='bg-slate-700 p-3 text-white rounded-md cursor-pointer hover:opacity-95 uppercase '>Update</button>
        <button type='button' className='bg-green-700 p-3 text-white rounded-md cursor-pointer hover:opacity-95 uppercase'>Create a listing</button>
      </form> 

      <div className='flex justify-between mx-auto w-lg text-red-700 cursor-pointer mt-2'>
        <span>Delete account</span>
        <span>Sign Out</span>
      </div>
      <p className='mx-auto text-green-700 cursor-pointer'>Show listings</p>
      
    </div>
  )
}
