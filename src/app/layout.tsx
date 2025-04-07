
import { Breadcrumb, Navbar } from '@/components'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { GlobalProvider } from './context.provider'
import GlobalStyles, { Container } from './global.styles'

export const metadata: Metadata = {
  title: {
    template: '%s | Desafio MELI [SWAPI]',
    default: '? | Desafio MELI [SWAPI]',
    absolute: 'Home | Desafio MELI [SWAPI]'
  },
  description: 'Home from Desafio MELI - Star wars API [SWAPI]',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <GlobalStyles />
          <Navbar />
          <Breadcrumb />
          <Container>
            {children}
          </Container>
        </GlobalProvider>
      </body>
    </html>
  )
}
