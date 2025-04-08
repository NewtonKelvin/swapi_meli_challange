import { ICharacter, ICharacterAdapted } from '@/interfaces/Character'


export enum ICharacterActions {
  ADD_CHARACTERS = 'ADD_CHARACTERS',
  ADD_FAVORITE = 'ADD_FAVORITE',
  REMOVE_FAVORITE = 'REMOVE_FAVORITE',
}

export interface ICharacterPayload {
  total?: number,
  characters?: ICharacterAdapted[]
  favorite?: ICharacter
}

export interface ICharacterHandle {
  type: ICharacterActions
  payload: ICharacterPayload
}