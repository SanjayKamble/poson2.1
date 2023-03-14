import React from 'react'

const InputError = (props) => {
  return (
    <div className='text-red-500 text-sm'>
        {props.children}
        </div>
  )
}

export default InputError