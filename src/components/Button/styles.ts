import styled from 'styled-components'

export const CustomButton = styled.div<{ background: string, color: string }>`
  cursor: pointer;
  height: 16px;
  font-size: 1rem;
  background-color: ${(props) => props.background};
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: 8px;
  max-width: 30%;
  overflow: hidden;
`