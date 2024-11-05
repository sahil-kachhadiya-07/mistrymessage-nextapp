import React from 'react'
import { Input } from '../Input'
import { useFormContext } from 'react-hook-form'

interface FieldInputProps {
  classNames?: {
    labelClassName?: string
    inputClassName?: string
    InputContainerClassName?: string
  }
  label?: string
  name: string
  type?: string
  onChange?: ()=>void
}

const FieldInput: React.FC<FieldInputProps> = ({
  classNames,
  label,
  name,
  type = 'text',
  onChange,
  ...props
}) => {
  const {
    formState: { errors }
  } = useFormContext()
  return (
    <>
      <Input
        label={label}
        name={name}
        classNames={classNames}
        type={type}
        {...props}
      />
      {errors[name] && (
        <p className='error'>{errors[name]?.message?.toString()}</p>
      )}
    </>
  )
}

export default FieldInput
