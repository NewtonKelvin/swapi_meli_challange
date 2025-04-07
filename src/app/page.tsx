'use client'
import { useCharacters } from '@/context'

export default function Home() {

  const characterContext = useCharacters()
  console.log('@@ HOME', { characterContext })
  return (
    <>
      <h1 style={{ backgroundColor: 'red' }}>Hello word</h1>
      <h1 style={{ backgroundColor: 'red' }}>Hello word</h1>
      <h1 style={{ backgroundColor: 'red' }}>Hello word</h1>
      <h1 style={{ backgroundColor: 'red' }}>Hello word</h1>
    </>
  )
}
