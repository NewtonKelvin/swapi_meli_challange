import { ChangeEventHandler } from 'react'
import { SearchInput } from './styles'

interface IInput extends Partial<HTMLInputElement> {
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Input = ({ value, onChange }: IInput) => {

  return (
    <SearchInput
      value={value}
      onChange={onChange}
      type='text'
    />
  )
}

export default Input