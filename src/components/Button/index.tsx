'use client'
import { ReactElement } from 'react'
import { CustomButton } from './styles'

interface IButtonProps {
  text?: string
  background: string
  color: string,
  icon?: ReactElement,
  handleClick?: () => void
}

const Button = ({ text, background, color, icon, handleClick }: IButtonProps) => {
  return (
    <CustomButton background={background} color={color} onClick={handleClick}>
      {icon ?? text}
    </CustomButton>
  )
}

export default Button