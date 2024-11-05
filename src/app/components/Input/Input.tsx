import React, { ReactNode } from 'react'
import { UseFormRegister, useForm } from 'react-hook-form'

interface InputProps {
  name: string
  defaultValue?: string
  label?: ReactNode
  classNames?: {
    labelClassName?: string
    inputClassName?: string
    InputContainerClassName?: string
  }
  required?: boolean
  type?: string
  register: UseFormRegister<any>
}

const Input: React.FC<InputProps> = ({
  name,
  defaultValue,
  label,
  classNames,
  required,
  register,
  type,
  ...props
}) => {
  return (
    <>
      <div
        className={`flex flex-col gap-2 ${
          classNames?.InputContainerClassName ?? ''
        }`}
      >
        {!!label && (
          <label className={`${classNames?.labelClassName}`}>
            {label} <span className='required'>{required ? ' *' : ''}</span>
          </label>
        )}
        <input
          defaultValue={defaultValue}
          {...register(name)}
          className={` w-full ${classNames?.inputClassName}`}
          type={type}
          {...props}
        />
      </div>
    </>
  )
}

export default Input
