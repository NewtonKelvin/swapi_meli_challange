'use client'
import {
  CharacterActionContext,
  CharacterContext,
  useCharactersContext
} from '@/context'
import { ReactNode } from 'react'

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { characterContext, dispatchCharacterContext } = useCharactersContext()
  return (
    <CharacterContext.Provider value={characterContext}>
      <CharacterActionContext.Provider value={dispatchCharacterContext}>
        {children}
      </CharacterActionContext.Provider>
    </CharacterContext.Provider>
  )
}