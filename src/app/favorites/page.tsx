'use client'
import { CharacterCard } from '@/components'
import { useCharacters } from '../context.provider'

const FavoritesCharacters = () => {

  const charactersContext = useCharacters()

  return (
    <>
      {charactersContext?.favorites?.map((item, index) => (
        <CharacterCard key={index} character={item} />
      ))}
    </>
  )
}

const Favorites = () => {
  return (
    <>
      <FavoritesCharacters />
    </>
  )
}

export default Favorites