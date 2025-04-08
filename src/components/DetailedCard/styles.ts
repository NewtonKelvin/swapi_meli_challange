import { Colors } from '@/app/global.styles'
import styled from 'styled-components'

export const CardStyle = styled.div<{
  rotation: 'portrait' | 'landscape',
  size: 'fill' | 'content'
}>`
  height: ${props => props.size === 'fill' && 'auto'};
  width: ${props => props.size === 'fill' && '100%'};
  background-color: ${Colors.night};
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: ${props => props.rotation === 'portrait' ? 'column' : 'row'};
`

export const ImageContainer = styled.div`
  height: 316px;
  width: 316px;
  position: relative;
`
export const InfoContainer = styled.div<{
  size: 'fill' | 'content'
}>`
  width: ${props => props.size === 'fill' ? '100%' : 'calc(316px - 64px)'};
  /* height: ${props => props.size === 'fill' ? 'calc(316px - 48px)' : '100%'}; */
  background-color: ${Colors.raisin_black};
  border-radius: 8px;
  padding: 32px;
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

export const InfoTable = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-start;
`

export const CharTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0 12px
`