import { ICharacter } from '@/interfaces/Character'


export enum ICharacterActions {
  ADD = 'ADD',
  FAVORITE = 'FAVORITE',
}
export interface ICharacterHandle {
  type: ICharacterActions
  payload: ICharacter[]
}