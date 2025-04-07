'use client'
import { CustomButton } from './styles'

interface IButtonProps {
  text: string
  background: string
  color: string
}

const Button = ({ text, background, color }: IButtonProps) => {
  return (
    <CustomButton
      background={background}
      color={color}
    >
      {text}
    </CustomButton>
  )
}

export default Button