import { ICharacter } from '@/interfaces/Character'
import { IPlanet } from '@/interfaces/Planet'

interface IResponse<T> {
  count: number,
  next: string,
  previous: string,
  results: T[]
}

export const GetCharactersAPI = async (page: number): Promise<IResponse<ICharacter>> => (
  await fetch(`${process.env.API_BASE_URL}/people/?page=${page}`)
    .then(res => res.json())
)

export const GetCharacterAPI = async (id: number): Promise<ICharacter> => (
  await fetch(`${process.env.API_BASE_URL}/people/${id}`)
    .then(res => res.json())
)

export const SearchCharacterAPI =
  async (name: string, page: number): Promise<IResponse<ICharacter>> =>
  (
    await fetch(`${process.env.API_BASE_URL}/people/?search=${name}&page=${page}`)
      .then(res => res.json())
  )

export const GetPlanetsAPI = async (page: number): Promise<IResponse<IPlanet>> => (
  await fetch(`${process.env.API_BASE_URL}/planets/?page=${page}`)
    .then(res => res.json())
)

export const GetPlanetAPI = async (id: number): Promise<ICharacter> => (
  await fetch(`${process.env.API_BASE_URL}/planets/${id}`)
    .then(res => res.json())
)

export const SearchPlanetAPI = async (name: string, page: number): Promise<IResponse<IPlanet>> => (
  await fetch(`${process.env.API_BASE_URL}/planets/?search=${name}&page=${page}`)
    .then(res => res.json())
)