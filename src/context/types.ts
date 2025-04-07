import { ICharacterAdapted } from '@/interfaces/Character'


export enum ICharacterActions {
  ADD_CHARACTERS = 'ADD_CHARACTERS',
  ADD_FAVORITE = 'ADD_FAVORITE',
  REMOVE_FAVORITE = 'REMOVE_FAVORITE',
}

export interface ICharacterPayload {
  total?: number,
  characters?: ICharacterAdapted[]
  favorite?: number
}

export interface ICharacterHandle {
  type: ICharacterActions
  payload: ICharacterPayload
}