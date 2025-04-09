'use client'
import { Colors } from '@/app/global.styles'
import useUtils from '@/utils'
import Link from 'next/link'
import NavbarStyles, { NavMenu, Title } from './styles'

const Navbar = () => {
  const { currentPath } = useUtils()


  return (
    <NavbarStyles>
      <Title>
        <Link href='/'>STAR WARS</Link>
      </Title>
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