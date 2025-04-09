export interface IPlanet {
  name: string
  rotation_period: string
  orbital_period: string
  diameter: string
  climate: string
  gravity: string
  terrain: string
  surface_water: string
  population: string
  residents: string[]
  films: string[]
  created: string
  edited: string
  url: string
}

export interface IPlanetsAdapted extends IPlanet {
  id?: number
  page?: number
}

export interface IPlanetContext {
  planets: IPlanetsAdapted[],
  total: number
  favorites?: IPlanetsAdapted[]
  favorite?: IPlanet
}