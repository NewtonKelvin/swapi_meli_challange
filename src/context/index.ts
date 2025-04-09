'use client'
import { ICharacter, ICharacterContext } from '@/interfaces/Character'
import { ICharacterActions, ICharacterHandle } from './types'

export const initialCharacters: ICharacterContext = {
  characters: [],
  favorites: [],
  total: 0
}


export const characterReducer = (
  state: ICharacterContext,
  action: ICharacterHandle
) => {
  if (!state || !action) return state
  switch (action.type) {
    case ICharacterActions.ADD_CHARACTERS:
      if (
        state.characters.length === 0 ||
        !action.payload.characters
      ) return { ...state, characters: action.payload.characters }
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
    case ICharacterActions.INIT_FAVORITE:
      return {
        ...state,
        favorites: action.payload.favorites,
      }
    case ICharacterActions.ADD_FAVORITE:
      const favChars = localStorage.getItem('favChars')
      const stored = favChars ? JSON.parse(favChars) : []
      const newStored = stored.filter(
        (item: ICharacter) => item.url !== action.payload.favorite?.url
      )

      const newItem = newStored.length === 0
        ? [action.payload.favorite]
        : [...newStored, action.payload.favorite]

      localStorage.setItem('favChars', JSON.stringify(newItem))

      return {
        ...state,
        favorites: [...state.favorites || [], action.payload.favorite],
      }
    case ICharacterActions.REMOVE_FAVORITE:
      const favChars2 = localStorage.getItem('favChars') || '[]'
      const stored2 = JSON.parse(favChars2)
      const newStored2 = stored2.filter(
        (item: ICharacter) => item.url !== action.payload.favorite?.url
      )
      localStorage.setItem('favChars', JSON.stringify(newStored2))
      return {
        ...state,
        favorites: state.favorites.filter(item => item.url !== action.payload.favorite?.url),
      }
    default:
      return state
  }
}