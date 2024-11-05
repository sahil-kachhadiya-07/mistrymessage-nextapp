import React from 'react'
import { Input } from '../Input'
import { useFormContext } from 'react-hook-form'

interface FieldInputProps {
  classNames: {
    labelClassName?: string
    inputClassName?: string
    InputContainerClassName?: string
  }
  label: string
  name: string
  type: string
}

const FieldInput: React.FC<FieldInputProps> = ({
  classNames,
  label,
  name,
  type = 'text',
  ...props
}) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()
  return (
    <>
      <Input
        {...props}
        label={label}
        name={name}
        register={register}
        classNames={classNames}
        type={type}
      />
      {errors[name] && (
        <p className='error'>{errors[name]?.message?.toString()}</p>
      )}
    </>
  )
}

export default FieldInput
