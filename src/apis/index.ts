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