'use client'
import { GetCharacterAPI } from '@/apis'
import { useCharacters } from '@/app/context.provider'
import { DetailedCard } from '@/components'
import Loading from '@/components/Loading'
import { ICharacter } from '@/interfaces/Character'
import { useEffect, useState } from 'react'

const CharacterData = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [character, setCharacter] = useState<ICharacter>()
  const characterContext = useCharacters()

  const reuseChar = characterContext?.characters?.find((char) => char.id === id)

  const getCharacter = async () => {
    if (character) return
    if (reuseChar) return setCharacter(reuseChar)
    setIsLoading(true)
    const response = await GetCharacterAPI(id)
    if (response) {
      setCharacter(response)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getCharacter()
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
      {/* <h1>Char Number {id}</h1> */}
      <DetailedCard data={character} type='character' id={id} />
    </>
  )
}

export default CharacterData