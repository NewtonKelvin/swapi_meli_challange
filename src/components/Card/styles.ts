import { Colors } from '@/app/global.styles'
import styled from 'styled-components'

export const CardStyle = styled.div`
  height: auto;
  background-color: ${Colors.night};
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  max-width: 316px;
`

export const ImageContainer = styled.div`
  height: 316px;
  width: 316px;
  position: relative;
`
export const InfoContainer = styled.div`
  background-color: ${Colors.raisin_black};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  a {
    color: ${Colors.white};
    text-decoration: underline;
    font-weight: normal;
  }
`

export const ImageButtons = styled.div`
  width: calc(100% - 32px);
  height: calc(100% - 32px);
  position: absolute;
  color: ${Colors.white};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding: 16px;
`