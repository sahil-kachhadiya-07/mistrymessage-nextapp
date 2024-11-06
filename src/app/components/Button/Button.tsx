import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import classes from './button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  leftAdornment?: ReactNode
  rightAdornment?: ReactNode
  className?: string
  iconClassName?: string
}

enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TEXT = 'text'
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  children,
  leftAdornment,
  rightAdornment,
  ...props
}) => {
  const renderButtonVariant = () => {
    switch (variant) {
      case ButtonVariant.SECONDARY:
        return classes.secondary
      case ButtonVariant.TEXT:
        return classes.text
      default:
        return classes.primary
    }
  }
  return (
    <>
      {!!leftAdornment && (
        <span className={`{iconClassName}`}>{leftAdornment}</span>
      )}
      <button
        className={`flex items-center justify-center py-2 px-4 ${className} ${renderButtonVariant()}`}
        {...props}
      >
        {children}
      </button>
      {!!rightAdornment && (
        <span className={`{iconClassName}`}>{rightAdornment}</span>
      )}
    </>
  )
}

export default Button
