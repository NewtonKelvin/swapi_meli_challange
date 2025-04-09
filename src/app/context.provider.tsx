'use client'
import {
  characterReducer,
  initialCharacters,
  initialPlanets,
  planetReducer
} from '@/context'
import { ICharacterHandle, IPlanetActions, IPlanetHandle } from '@/context/types'
import {
  ActionDispatch,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react'

export const CharacterContext = createContext(initialCharacters)
export const CharacterActionContext =
  createContext<ActionDispatch<[action: ICharacterHandle]> | null>(null)
export const PlanetContext = createContext(initialPlanets)
export const PlanetActionContext =
  createContext<ActionDispatch<[action: IPlanetHandle]> | null>(null)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [character, dispatchCharacter] = useReducer(characterReducer, initialCharacters)
  const [planet, dispatchPlanet] = useReducer(planetReducer, initialPlanets)

  useEffect(() => {
    const favChars = localStorage.getItem('favChars')
    const storedC = favChars ? JSON.parse(favChars) : []
    dispatchCharacter({
      type: IPlanetActions.INIT_FAVORITE,
      payload: { favorites: storedC }
    })
    const favPlanets = localStorage.getItem('favPlanets')
    const storedP = favPlanets ? JSON.parse(favPlanets) : []
    dispatchPlanet({
      type: IPlanetActions.INIT_FAVORITE,
      payload: { favorites: storedP }
    })
  }, [])

  const charValues = useMemo(() => {
    return character
  }, [character])
  const charActions = useMemo(() => {
    return dispatchCharacter
  }, [dispatchCharacter])
  const plntValues = useMemo(() => {
    return planet
  }, [planet])
  const plntActions = useMemo(() => {
    return dispatchPlanet
  }, [dispatchPlanet])

  return (
    <CharacterContext.Provider value={charValues}>
      <PlanetContext.Provider value={plntValues}>
        <CharacterActionContext.Provider value={charActions}>
          <PlanetActionContext.Provider value={plntActions}>
            {children}
          </PlanetActionContext.Provider>
        </CharacterActionContext.Provider>
      </PlanetContext.Provider>
    </CharacterContext.Provider >
  )
}

export const useCharacters = () => useContext(CharacterContext)
export const useCharactersActions = () => useContext(CharacterActionContext)
export const usePlanets = () => useContext(PlanetContext)
export const usePlanetsActions = () => useContext(PlanetActionContext)