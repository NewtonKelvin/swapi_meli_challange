import { Colors } from '@/app/global.styles'
import styled from 'styled-components'

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`

export const Nav = styled.nav`
  /* background-color: red; */
  width: 100%;

  ul {
    background-color: ${Colors.night};
    width: max-content;
    margin: 0 auto;
    padding: 8px 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;
    border-radius: 8px;
  }
`

export const CustomButton = styled.button<{ $active?: boolean }>`
  /* background-color: orange; */
  height: 20px;
  cursor: ${props => props.disabled ? 'auto' : 'pointer'};
  width: 20px;
  padding: 6px;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props =>
    props.$active
      ? Colors.white
      : props.disabled
        ? Colors.van_dyke
        : Colors.silver_lake_blue}
`