'use client'
import { GetCharactersAPI } from '@/apis'
import { CharacterCard } from '@/components'
import Loading from '@/components/Loading'
import UsePagination from '@/components/Pagination'
import { ICharacterActions } from '@/context/types'
import { ChangeEvent, useEffect, useState } from 'react'
import { useCharacters, useCharactersActions } from '../context.provider'

// const ITEMS_PER_PAGE = 10

const CharacterPage = () => {
  const characterActionsContext = useCharactersActions()
  const characterContext = useCharacters()

  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    total: characterContext?.total
  })

  const paginatedCharacters = characterContext.characters.filter(
    character => character.page === pagination.current
  )

  const getCharacters = async () => {
    setIsLoading(true)
    const response = await GetCharactersAPI(pagination.current)
    if (response) {
      const results = {
        characters: response.results.map(
          character => ({
            ...character,
            favorite: false,
            id: +character.url.replace(/\D/g, ''),
            page: pagination.current
          })
        ),
        total: response.count
      }
      characterActionsContext?.({ type: ICharacterActions.ADD_CHARACTERS, payload: results })
      setPagination(prev => ({ ...prev, total: response.count }))
    }
    setIsLoading(false)
  }

  const handleChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    setPagination(prev => ({ ...prev, current: newPage }))
  }

  useEffect(() => {
    getCharacters()
  }, [pagination.current])

  if (isLoading) return <Loading />
  if (characterContext.characters.length === 0) return <h1>No results found...</h1>

  return (
    <>
      {paginatedCharacters.map(
        (character, index) =>
          <CharacterCard
            key={index}
            character={character}
          />
      )}
      <UsePagination
        current={pagination.current}
        setCurrent={handleChangePage}
        total={pagination?.total}
      />
    </>
  )
}

export default CharacterPage