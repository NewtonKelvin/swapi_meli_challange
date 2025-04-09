import { ICharacter } from '@/interfaces/Character'

interface IPeople {
  count: number,
  next: string,
  previous: string,
  results: ICharacter[]
}

export const GetCharactersAPI = async (page: number): Promise<IPeople> => (
  await fetch(`${process.env.API_BASE_URL}/people/?page=${page}`)
    .then(res => res.json())
)

export const GetCharacterAPI = async (id: number): Promise<ICharacter> => (
  await fetch(`${process.env.API_BASE_URL}/people/${id}`)
    .then(res => res.json())
)

export const SearchCharacterAPI = async (name: string, page: number): Promise<IPeople> => (
  await fetch(`${process.env.API_BASE_URL}/people/?search=${name}&page=${page}`)
    .then(res => res.json())
)