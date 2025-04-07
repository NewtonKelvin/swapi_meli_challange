 
'use client'
import { ICharacter } from '@/interfaces/Character'
import { ActionDispatch, createContext, useReducer } from 'react'
import { ICharacterActions, ICharacterHandle } from './types'

export const initialCharacters: ICharacter[] = []


export const CharacterContext = createContext(initialCharacters)
export const CharacterActionContext =
  createContext<ActionDispatch<[action: ICharacterHandle]> | undefined>(undefined)

export const characterReducer = (state: ICharacter[], action: ICharacterHandle) => {
  if (!state || !action) return state
  switch(action.type) {
    case ICharacterActions.ADD:
      if (state.length === 0) return action.payload
      return [
        ...state,
        ...action.payload
      ]
    default:
      return state
  }
}

export const useCharactersContext = () => {
  const [characterContext, dispatchCharacterContext] = useReducer(
    characterReducer,
    initialCharacters
  )
  return {
    characterContext,
    dispatchCharacterContext
  }
}