'use client'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import { ChangeEvent, useCallback, useState } from 'react'
import Input from '../Input'
import NavbarStyles, { NavMenu, Title } from './styles'

const Navbar = () => {
  const [search, setSearch] = useState('')
  const [debounceValue, setDebounceValue] = useState('')
  const debouncedSave = useCallback(
    debounce((nextValue: string) => setDebounceValue(nextValue), 1000),
    [],
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debouncedSave(e.target.value)
  }

  console.log('@@', { debounceValue })

  return (
    <NavbarStyles>
      <Title>
        <Link href='/'>STAR WARS</Link>
      </Title>
      <Input
        value={search}
        onChange={(e) => handleChange(e)}
        type='text'
      />
      <NavMenu>
        <Link href='/favorites'>Favorites</Link>
        <Link href='/characters'>Characters</Link>
        <Link href='/planets'>Planets</Link>
      </NavMenu>
    </NavbarStyles>
  )
}

export default Navbar