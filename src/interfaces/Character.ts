export interface ICharacter {
  birth_year: string
  eye_color: string
  films: string[]
  gender: string
  hair_color: string
  height: string
  homeworld: string
  mass: string
  name: string
  skin_color: string
  created: string
  edited: string
  species: string[]
  starships: string[]
  url: string
  vehicles: string[]
}

export interface ICharacterAdapted extends ICharacter {
  id?: number
  page?: number
}

export interface ICharacterContext {
  characters: ICharacterAdapted[],
  total: number
  favorites?: ICharacterAdapted[]
  favorite?: ICharacter
}