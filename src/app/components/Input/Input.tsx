import { Eye, EyeClosed, EyeOff } from 'lucide-react'
import React, { ReactNode, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export interface InputProps extends React.ComponentProps<'input'> {
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
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void
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
  const [visible, setVisible] = useState(false)
  const formContext = useFormContext()

  if (!formContext) {
    return (
      <input
        className={`border border-solid shadow-sm p-1 w-full rounded ${classNames?.inputClassName}`}
        {...props}
      />
    )
  }
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
        {type === 'password' ? (
          <div className='relative'>
            <input
              defaultValue={defaultValue}
              className={`border border-solid shadow-sm p-1 w-full rounded ${classNames?.inputClassName}`}
              type={`${visible === true ? 'text' : 'password'}`}
              {...props}
              {...formContext.register(name, { onChange: onChange })}
            />
            {visible === true ? (
              <Eye
                className='absolute right-[5px] cursor-pointer top-[6px] text-gray-400'
                size={20}
                onClick={() => setVisible(prev => !prev)}
              />
            ) : (
              <EyeClosed
                className='absolute right-[5px] cursor-pointer top-[6px] text-gray-400'
                size={20}
                onClick={() => setVisible(prev => !prev)}
              />
            )}
          </div>
        ) : (
          <input
            defaultValue={defaultValue}
            className={`border border-solid shadow-sm p-1 w-full rounded ${classNames?.inputClassName}`}
            type={type}
            {...props}
            {...formContext.register(name, { onChange: onChange })}
          />
        )}
      </div>
    </>
  )
}

export default Input
