'use client'
import styled, { createGlobalStyle } from 'styled-components'

// 1rem = 16px

export const Colors = {
  white: '#fefdfe',
  night: '#0f0e13ff',
  van_dyke: '#3c3235ff',
  paynes_gray: '#4b586eff',
  beaver: '#aa846dff',
  silver_lake_blue: '#688eb9ff',
  powder_blue: '#bac8d9ff',
  raisin_black: '#1a1a23ff',
  sage: '#bab768'
}

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
  body, html {
    font-family: "Outfit", sans-serif !important;
    margin: 0;
    padding: 0;
  }
  a, button, .MuiTypography-root {
    text-decoration: none;
    font-family: "Outfit", sans-serif !important;
  }
`

export const Container = styled.main`
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 36px;
  padding: 36px;
  flex-flow: wrap;
  background-color: ${Colors.night};
  height: 100%;
  min-height: calc(100svh - 12.5rem);
`

export default GlobalStyles