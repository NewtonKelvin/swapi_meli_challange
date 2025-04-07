import { ICharacter } from '@/interfaces/Character'

interface IPeople {
  count: number,
  next: string,
  previous: string,
  results: ICharacter[]
}

export const GetCharacters = async (): Promise<IPeople> => (
  await fetch(`${process.env.API_BASE_URL}/people`)
    .then(res => res.json())
)