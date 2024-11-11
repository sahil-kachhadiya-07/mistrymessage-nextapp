'use client'
import React, { useState } from 'react'

interface SwitchProps {
  checked?: boolean
  onChange?: (toggle: boolean) => void
}
const Switch: React.FC<SwitchProps> = ({ checked = false, onChange }) => {
  const [toggle, setToggle] = useState(checked)
  console.log('toggle', toggle)
  return (
    <div className='inline-flex items-center cursor-pointer'>
      <input
        type='checkbox'
        checked={toggle}
        className='sr-only peer'
        onChange={(e) => {
          setToggle((prev) => !prev)
          e.stopPropagation();
          if (onChange) {
            onChange(!toggle)
          }
        }}
      />
      <div className="relative w-11 h-6 bg-purple-50 peer-focus:outline-none peer-focus:ring-4 rounded-full peer dark:bg-white-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:shadow-lg after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:!bg-purple-600 p-1" />
    </div>
  )
}

export default Switch
