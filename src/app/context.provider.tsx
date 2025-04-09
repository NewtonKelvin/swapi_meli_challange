'use client'
import {
  characterReducer,
  initialCharacters
} from '@/context'
import { ICharacterActions, ICharacterHandle } from '@/context/types'
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

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [character, dispatchCharacter] = useReducer(characterReducer, initialCharacters)

  useEffect(() => {
    const favChars = localStorage.getItem('favChars')
    const stored = favChars ? JSON.parse(favChars) : []
    // if (!stored.length) return
    console.log('@@ STORED', { stored })
    dispatchCharacter({
      type: ICharacterActions.INIT_FAVORITE,
      payload: { favorites: stored }
    })
  }, [])

  const charValues = useMemo(() => {
    console.log('@@ XD', { character })
    return character
  }, [character])
  const charActions = useMemo(() => {
    return dispatchCharacter
  }, [dispatchCharacter])

  return (
    <CharacterContext.Provider value={charValues}>
      <CharacterActionContext.Provider value={charActions}>
        {children}
      </CharacterActionContext.Provider>
    </CharacterContext.Provider>
  )
}

export const useCharacters = () => useContext(CharacterContext)
export const useCharactersActions = () => useContext(CharacterActionContext)