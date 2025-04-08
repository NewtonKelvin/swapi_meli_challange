'use client'
import { Colors } from '@/app/global.styles'
import useUtils from '@/utils'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import { ChangeEvent, useCallback, useState } from 'react'
import Input from '../Input'
import NavbarStyles, { NavMenu, Title } from './styles'

const Navbar = () => {
  const { currentPath } = useUtils()
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
        <Link
          href='/favorites'
          style={{
            color:
              currentPath === 'Favorites'
                ? Colors.white
                : Colors.paynes_gray
          }}
        >Favorites</Link>
        <Link
          href='/characters'
          style={{
            color:
              currentPath === 'Characters'
                ? Colors.white
                : Colors.paynes_gray
          }}
        >Characters</Link>
        <Link
          href='/planets'
          style={{
            color:
              currentPath === 'Planets'
                ? Colors.white
                : Colors.paynes_gray
          }}
        >Planets</Link>
      </NavMenu>
    </NavbarStyles>
  )
}

export default Navbar