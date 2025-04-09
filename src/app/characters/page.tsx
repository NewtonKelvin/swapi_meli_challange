'use client'
import { GetCharactersAPI, SearchCharacterAPI } from '@/apis'
import { CharacterCard } from '@/components'
import Loading from '@/components/Loading'
import UsePagination from '@/components/Pagination'
import { ICharacterActions } from '@/context/types'
import debounce from 'lodash.debounce'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useCharacters, useCharactersActions } from '../context.provider'
import { Colors } from '../global.styles'

// const ITEMS_PER_PAGE = 10

const CharacterPage = () => {
  const characterActionsContext = useCharactersActions()
  const characterContext = useCharacters()
  const [chars, setChars] = useState(characterContext.characters)
  // const [charTotal, setCharTotal] = useState()

  useEffect(() => {
    setChars(characterContext.characters)
  }, [characterContext.characters])

  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    total: characterContext?.total
  })
  const [search, setSearch] = useState('')
  const [debounceValue, setDebounceValue] = useState('')
  const debouncedSave = useCallback(
    debounce(async (nextValue: string) => await handleDebounce(nextValue), 1000),
    [],
  )

  const handleDebounce = async (nextValue: string) => {
    setDebounceValue(nextValue)
    handleSearchCharacter(nextValue)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debouncedSave(e.target.value)
  }

  const paginatedCharacters = debounceValue ? chars : chars.filter(
    character => character.page === pagination.current
  )

  const handleSearchCharacter = async (nextValue: string) => {
    setIsLoading(true)
    if (!nextValue) {
      setPagination({ current: 1, total: 1 })
      getCharacters()
      return setIsLoading(false)
    }
    const response = await SearchCharacterAPI(nextValue, pagination.current)
    setChars(response.results)
    setPagination(prev => ({ ...prev, total: Math.ceil(response.count / 10) }))
    setIsLoading(false)
  }

  const getCharacters = async () => {
    if (paginatedCharacters?.length > 0 && chars?.length > 0) return
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
        total: Math.ceil(response.count / 10)
      }
      characterActionsContext?.({ type: ICharacterActions.ADD_CHARACTERS, payload: results })
      setPagination(prev => ({ ...prev, total: Math.ceil(response.count / 10) }))
    }
    setIsLoading(false)
  }

  const handleChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    setPagination(prev => ({ ...prev, current: newPage }))
  }

  useEffect(() => {
    if (debounceValue) {
      handleSearchCharacter(debounceValue)
      return
    }
    getCharacters()
  }, [pagination.current])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px 0px',
        alignItems: 'center'
      }}>
      <h1 style={{
        padding: '0px',
        margin: '0px',
        fontWeight: 'bold',
        color: Colors.white
      }}>Search: </h1>
      <input
        value={search}
        onChange={(e) => handleChange(e)}
        type='text'
        style={{ maxWidth: '300px' }}
      />
      {isLoading && <Loading />}
      {!isLoading && chars?.length === 0 && (
        <h1 style={{ color: Colors.white }}>No results found...</h1>
      )}
      {!isLoading && (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '36px',
          flexFlow: 'wrap',
          justifyContent: 'space-evenly'
        }}>
          {paginatedCharacters?.map(
            (character, index) =>
              <CharacterCard
                key={index}
                character={character}
              />
          )}
          {pagination.total > 1 && (
            <UsePagination
              current={pagination.current}
              setCurrent={handleChangePage}
              total={pagination?.total}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default CharacterPage