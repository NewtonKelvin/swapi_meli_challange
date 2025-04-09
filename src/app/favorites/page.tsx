'use client'
import { CharacterCard, PlanetCard } from '@/components'
import { useCharacters, usePlanets } from '../context.provider'
import { Colors } from '../global.styles'

const FavoritesCharacters = () => {

  const charactersContext = useCharacters()
  const planetsContext = usePlanets()

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px 0px',
          alignItems: 'center'
        }}>
        <h1 style={{
          padding: '0px',
          margin: '0px',
          fontWeight: 'bold',
          color: Colors.white
        }}>Characters: </h1>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '36px',
          flexFlow: 'wrap',
          justifyContent: 'space-evenly'
        }}>
          {charactersContext?.favorites?.map((item, index) => (
            <CharacterCard key={index} character={item} />
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px 0px',
          alignItems: 'center'
        }}>

        <h1 style={{
          padding: '0px',
          margin: '0px',
          fontWeight: 'bold',
          color: Colors.white
        }}>Planets: </h1>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '36px',
          flexFlow: 'wrap',
          justifyContent: 'space-evenly'
        }}>
          {planetsContext?.favorites?.map((item, index) => (
            <PlanetCard key={index} planet={item} />
          ))}
        </div>
      </div>
    </>
  )
}

const Favorites = () => {
  return (
    <>
      <FavoritesCharacters />
    </>
  )
}

export default Favorites