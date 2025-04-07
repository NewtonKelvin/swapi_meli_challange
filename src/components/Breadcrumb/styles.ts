import { Colors } from '@/app/global.styles'
import { Breadcrumbs } from '@mui/material'
import styled from 'styled-components'

export const BreadcrumbContainer = styled(Breadcrumbs)`
  background-color: ${Colors.paynes_gray};
  color: ${Colors.powder_blue};
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  height: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  a {
    color: ${Colors.powder_blue};
  }
  p {
    color: white;
  }
`