import { Metadata } from 'next'
import { ReactElement } from 'react'

export const metadata: Metadata = {
  title: 'Planets',
  description: 'Planets from Desafio MELI - Star wars API [SWAPI]',
}

const Layout = ({ children }: { children: ReactElement }) => {
  return children
}

export default Layout