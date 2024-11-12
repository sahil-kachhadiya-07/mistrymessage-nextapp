'use client'
import React from 'react'
import { Input } from '../Input'
import { useFormContext } from 'react-hook-form'
import { InputProps } from '../Input/Input'

interface FieldInputProps  extends Omit<InputProps, "register">  {
  classNames?: {
    labelClassName?: string
    inputClassName?: string
    inputContainerClassName?: string 
  }
  label?: string
  name: string
  type?: string
  onChange?:(e:any)=>void
}


const FieldInput: React.FC<FieldInputProps> = ({
  classNames,
  label,
  name,
  onChange,
  type = 'text',
  ...props
}) => {
  const { formState , register } = useFormContext() || { formState: { errors: {} } };
  const { errors } = formState;
  return (
    <>
      <Input
        label={label}
        name={name}
        classNames={classNames}
        type={type}
        onChange={onChange}
        {...props}
      />
      {errors[name] && (
        <p  className="text-red-100">{errors[name]?.message?.toString()}</p>
      )}
    </>
  )
}

export default FieldInput
