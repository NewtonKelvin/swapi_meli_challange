/* eslint-disable no-unused-vars */
import { ICharacter, ICharacterAdapted, ICharacterContext } from '@/interfaces/Character'


export enum ICharacterActions {
  ADD_CHARACTERS = 'ADD_CHARACTERS',
  ADD_FAVORITE = 'ADD_FAVORITE',
  REMOVE_FAVORITE = 'REMOVE_FAVORITE',
  INIT_FAVORITE = 'INIT_FAVORITE'
}

export interface ICharacterPayload {
  total?: number,
  characters?: ICharacterAdapted[]
  favorite?: ICharacter
}

export interface ICharacterHandle {
  type: ICharacterActions
  payload: ICharacterContext
}