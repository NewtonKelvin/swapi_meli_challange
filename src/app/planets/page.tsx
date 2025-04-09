'use client'
import { GetPlanetsAPI, SearchPlanetAPI } from '@/apis'
import { PlanetCard } from '@/components'
import { SearchInput } from '@/components/Input/styles'
import Loading from '@/components/Loading'
import UsePagination from '@/components/Pagination'
import { IPlanetActions } from '@/context/types'
import debounce from 'lodash.debounce'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { usePlanets, usePlanetsActions } from '../context.provider'
import { Colors } from '../global.styles'

// const ITEMS_PER_PAGE = 10

const PlanetPage = () => {
  const planetActionsContext = usePlanetsActions()
  const planetContext = usePlanets()
  const [plnets, setPlnets] = useState(planetContext.planets)

  useEffect(() => {
    setPlnets(planetContext.planets)
  }, [planetContext.planets])

  const [isLoading, setIsLoading] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    total: planetContext?.total
  })
  const [search, setSearch] = useState('')
  const [debounceValue, setDebounceValue] = useState('')
  const debouncedSave = useCallback(
    debounce(async (nextValue: string) => await handleDebounce(nextValue), 1000),
    [],
  )

  const handleDebounce = async (nextValue: string) => {
    setDebounceValue(nextValue)
    handleSearchPlanet(nextValue)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    debouncedSave(e.target.value)
  }

  const paginatedPlanets = debounceValue ? plnets : plnets?.filter(
    planet => planet.page === pagination.current
  )

  const handleSearchPlanet = async (nextValue: string) => {
    setIsLoading(true)
    if (!nextValue) {
      setPagination({ current: 1, total: 1 })
      getPlanets()
      return setIsLoading(false)
    }
    const response = await SearchPlanetAPI(nextValue, pagination.current)
    setPlnets(response.results)
    setPagination(prev => ({ ...prev, total: Math.ceil(response.count / 10) }))
    setIsLoading(false)
  }

  const getPlanets = async () => {
    // if (paginatedPlanets?.length > 0 && plnets?.length > 0) return
    setIsLoading(true)
    const response = await GetPlanetsAPI(pagination.current)
    if (response) {
      const results = {
        planets: response.results.map(
          planet => ({
            ...planet,
            favorite: false,
            id: +planet.url.replace(/\D/g, ''),
            page: pagination.current
          })
        ),
        total: Math.ceil(response.count / 10)
      }
      planetActionsContext?.({ type: IPlanetActions.ADD_PLANET, payload: results })
      setPagination(prev => ({ ...prev, total: Math.ceil(response.count / 10) }))
    }
    setIsLoading(false)
  }

  const handleChangePage = (e: ChangeEvent<unknown>, newPage: number) => {
    setPagination(prev => ({ ...prev, current: newPage }))
  }

  useEffect(() => {
    if (debounceValue) {
      handleSearchPlanet(debounceValue)
      return
    }
    getPlanets()
  }, [pagination.current])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px 0px',
        alignItems: 'center'
      }}>
      {!isLoading && (
        <>
          <h1 style={{
            padding: '0px',
            margin: '0px',
            fontWeight: 'bold',
            color: Colors.white
          }}>Search: </h1>
          <SearchInput
            value={search}
            onChange={(e) => handleChange(e)}
            type='text'
            style={{ maxWidth: '300px' }}
          />
        </>
      )}
      {isLoading && <Loading />}
      {!isLoading && plnets?.length === 0 && (
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
          {paginatedPlanets?.map(
            (planet, index) =>
              <PlanetCard
                key={index}
                planet={planet}
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

export default PlanetPage