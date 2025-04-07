import { Colors } from '@/app/global.styles'
import { Typography } from '@mui/material'
import styled from 'styled-components'

const NavbarStyles = styled.div`
  height: 2.5rem;
  padding: 12px 24px;
  margin: 0;
  background-color: ${Colors.night};
  color: ${Colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
  a {
    text-decoration: none;
    color: ${Colors.white};
  }
`

export const NavMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  a {
    text-decoration: none;
    color: ${Colors.white};
    font-weight: bold;
    font-size: 1rem;
  }
`

export default NavbarStyles