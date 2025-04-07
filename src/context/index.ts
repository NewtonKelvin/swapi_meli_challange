'use client'
import { ICharacterContext } from '@/interfaces/Character'
import { ActionDispatch, createContext, useContext } from 'react'
import { ICharacterActions, ICharacterHandle } from './types'

export const initialCharacters: ICharacterContext = {
  characters: [],
  favorites: [],
  total: 0
}

export const CharacterContext = createContext(initialCharacters)
export const CharacterActionContext =
  createContext<ActionDispatch<[action: ICharacterHandle]> | null>(null)

export const CharacterReducer = (
  state: ICharacterContext,
  action: ICharacterHandle
) => {
  if (!state || !action) return state
  switch (action.type) {
    case ICharacterActions.ADD_CHARACTERS:
      if (
        state.characters.length === 0 ||
        !action.payload.characters
      ) return action.payload
      const newCharacters = action.payload.characters?.filter(
        (newChar) => !state.characters.some((char) => char.id === newChar.id)
      )
      return {
        ...state,
        characters: [
          ...state.characters,
          ...newCharacters,
        ],
        total: action.payload.total
      }
    case ICharacterActions.ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites || [], action.payload.favorite],
      }
    case ICharacterActions.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(item => item !== action.payload.favorite),
      }
    default:
      return state
  }
}

export const useCharacters = () => useContext(CharacterContext)
export const useCharactersActions = () => useContext(CharacterActionContext)