import React from 'react'

export default function Header() {
  return (
    <header className='w-full flex justify-between px-2 py-4 border-b-2'>
        <h1>Logo</h1>
        
        <div className='flex items-center mx-1'>
            <a href='./cart'>Cart</a>
            <a href='./mypage'>My</a>
            <a href='./login'>Login</a>
        </div>
    </header>
  )
}
