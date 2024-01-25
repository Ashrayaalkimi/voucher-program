import React from 'react'

type Props = {}

const Button = (props: Props) => {
  return (
    <div className='flex inset-0 justify-center items-center fixed'>
        <button className='bg-gradient-to-br from-[#7F00FF] to-[#E100FF] p-5 px-7 rounded-[36px] text-lg font-medium '>Get Started</button>
    </div>
  )
}

export default Button