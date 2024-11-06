import React, { ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

export interface InputProps extends React.ComponentProps<"input"> {
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
  onChange?:(e?:React.ChangeEvent<HTMLInputElement>)=>void
}

const Input: React.FC<InputProps> = ({
  name,
  defaultValue = '',
  label,
  classNames,
  required,
  onChange,
  type,
  ...props
}) => {
  const { register } = useFormContext()
  return (
    <>
      <div
        className={`flex flex-row gap-2 ${
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
          className={` border-solid border-[1px] border-x-black w-full ${classNames?.inputClassName}`}
          type={type}
          {...props}
          {...register(name , {onChange:onChange})}
        />
      </div>
    </>
  )
}

export default Input
