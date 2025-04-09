'use client'
import Link from 'next/link'
import styled from 'styled-components'
import { Colors } from './global.styles'

const StyledLink = styled(Link)`
  color: ${Colors.white}
`

export default function Home() {
  return (
    <>
      <StyledLink style={{
        fontSize: '24px',
        color: `${Colors.white}`,
        textDecoration: 'none'
      }} href='/characters'>Go to Characters</StyledLink>
      <StyledLink style={{
        fontSize: '24px',
        color: `${Colors.white}`,
        textDecoration: 'none'
      }} href='/planets'>Go to Planets</StyledLink>
      <StyledLink style={{
        fontSize: '24px',
        color: `${Colors.white}`,
        textDecoration: 'none'
      }} href='/favorites'>Go to Favorites</StyledLink>
    </>
  )
}
