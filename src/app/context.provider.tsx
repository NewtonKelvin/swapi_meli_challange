'use client'
import {
  CharacterActionContext,
  CharacterContext,
  CharacterReducer,
  initialCharacters
} from '@/context'
import { ReactNode, useReducer } from 'react'

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [character, dispatchCharacter] = useReducer(CharacterReducer, initialCharacters)
  return (
    <CharacterContext.Provider value={character}>
      <CharacterActionContext.Provider value={dispatchCharacter}>
        {children}
      </CharacterActionContext.Provider>
    </CharacterContext.Provider>
  )
}