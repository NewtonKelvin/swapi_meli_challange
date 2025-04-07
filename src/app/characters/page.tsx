'use client'
import { GetCharacters } from '@/apis'
import { CharacterCard } from '@/components'
import { useCharactersContext } from '@/context'
import { ICharacterActions } from '@/context/types'
import { ICharacter } from '@/interfaces/Character'
import { useEffect } from 'react'

const CharacterPage = () => {
  const { dispatchCharacterContext, characterContext } = useCharactersContext()

  const getCharacters = async () => {
    const response = await GetCharacters()
    if (response) {
      const results: ICharacter[] = response.results.map(
        character => ({ ...character, favorite: false })
      )
      dispatchCharacterContext({ type: ICharacterActions.ADD, payload: results })
    }
  }

  useEffect(() => {
    getCharacters()
  }, [])

  if (characterContext.length === 0) return <h1>No results found...</h1>

  return characterContext.map(
    (character, index) => <CharacterCard key={index} character={character} />
  )
}

export default CharacterPage