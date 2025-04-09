'use client'
import { GetCharacterAPI } from '@/apis'
import { initialCharacters } from '@/context'
import { ICharacter } from '@/interfaces/Character'
import { useEffect, useState } from 'react'
import { useCharacters } from '../context.provider'
import { Colors } from '../global.styles'

const FavoritesCharacters = () => {

  const [favChars, setFavChars] = useState<ICharacter[]>([])
  const [characterContext, characterActionsContext] = useCharacters()
  // console.log('@@', { st: localStorage.getItem('favChars') })

  const getFavorites = async () => {
    // console.log('@@@@@')
    const charList: ICharacter[] = []
    if (!charactersContext) return
    for (const id of charactersContext.favorites) {
      let newChar: ICharacter = initialCharacters.characters[0]
      const found = charactersContext.characters.find(char => char.id === id)
      if (found) newChar = found
      else newChar = await GetCharacterAPI(id)
      setFavChars((prev) => ([...prev || [], newChar]))
    }
    return charList
  }

  useEffect(() => {
    getFavorites()
  }, [])

  return (
    <ul>
      {favChars?.map((item, index) => (
        <li style={{ color: Colors.white }} key={index}>{item.name}___</li>
      ))}
    </ul>
  )
}
const Favorites = () => {
  return (
    <FavoritesCharacters />
  )
}

export default Favorites