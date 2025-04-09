'use client'
import { useCharacters, useCharactersActions, usePlanets, usePlanetsActions } from '@/app/context.provider'
import { Colors } from '@/app/global.styles'
import { ICharacterActions, IPlanetActions } from '@/context/types'
import { ICharacterAdapted } from '@/interfaces/Character'
import { IPlanetsAdapted } from '@/interfaces/Planet'
import useUtils from '@/utils'
import { Public, Star } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '../Button'
import { CardStyle, ImageButtons, ImageContainer, InfoContainer } from './styles'

interface ICharacterCard {
  character: ICharacterAdapted
}
interface IPlanetCard {
  planet: IPlanetsAdapted
}

interface ILabelInfo {
  label?: string,
  value: string
  title?: boolean
}

const Info = ({ label, value, title = false }: ILabelInfo) => {
  const labelProps = title ? {
    color: Colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  } : {
    color: Colors.silver_lake_blue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
  return (
    <Typography {...labelProps}>
      {label ? `${label}: ${value}` : value}
    </Typography>
  )
}

const CharacterCard = ({ character }: ICharacterCard) => {

  const { extractIdFromUrl } = useUtils()
  const router = useRouter()

  const characterActionsContext = useCharactersActions()
  const charactersContext = useCharacters()
  const isFavorite = charactersContext.favorites?.find(item => item.url === character.url)
  const handleFavorite = () => {
    characterActionsContext?.({
      type: isFavorite
        ? ICharacterActions.REMOVE_FAVORITE
        : ICharacterActions.ADD_FAVORITE,
      payload: { favorite: character }
    })
  }

  return (
    <CardStyle>
      <ImageContainer>
        <ImageButtons>
          <Button
            background={Colors.raisin_black}
            color={Colors.white}
            icon={<Public />}
            handleClick={() => router.push(`/planet/${extractIdFromUrl(character.homeworld)}`)}
          />
          <Button
            background={Colors.raisin_black}
            handleClick={handleFavorite}
            color={isFavorite ? Colors.sage : Colors.white}
            icon={<Star fontSize='small' />}
          />
        </ImageButtons>
        <Image
          src={'/images/character.png'}
          alt='Character'
          width={316}
          height={316}
          style={{
            objectFit: 'cover',
            margin: 0,
            padding: 0,
            borderRadius: '8px'
          }}
        />
      </ImageContainer>
      <InfoContainer>
        <Info value={character?.name} title />
        <Info label='Height' value={`${character?.height}cm`} />
        <Info label='Birth year' value={`${character?.birth_year}`} />
        <Info label='Gender' value={`${character?.gender}`} />
        <Link href={`/character/${extractIdFromUrl(character?.url)}`}>View more...</Link>
      </InfoContainer>
    </CardStyle>
  )
}

const PlanetCard = ({ planet }: IPlanetCard) => {

  const planetActionsContext = usePlanetsActions()
  const planetsContext = usePlanets()
  const isFavorite = planetsContext.favorites?.find(item => item.url === planet.url)
  const handleFavorite = () => {
    planetActionsContext?.({
      type: isFavorite
        ? IPlanetActions.REMOVE_FAVORITE
        : IPlanetActions.ADD_FAVORITE,
      payload: { favorite: planet }
    })
  }

  const calcTerrain = (terrain: string) => {
    const quantity = terrain?.split(',').length
    const hasMore = quantity > 1
    const howMuchMore = quantity - 1
    const mainTerrain = terrain?.split(',')[0]
    return (`${mainTerrain} ${hasMore ? `+${howMuchMore}` : ''}`)
  }

  return (
    <CardStyle>
      <ImageContainer>
        <ImageButtons>
          <Button
            background={Colors.raisin_black}
            color={Colors.white}
            text={calcTerrain(planet.terrain)}
          />
          <Button
            background={Colors.raisin_black}
            handleClick={handleFavorite}
            color={isFavorite ? Colors.sage : Colors.white}
            icon={<Star fontSize='small' />}
          />
        </ImageButtons>
        <Image
          src={'/images/planet.webp'}
          alt='Character'
          width={316}
          height={316}
          style={{
            objectFit: 'cover',
            margin: 0,
            padding: 0,
            borderRadius: '8px'
          }}
        />
      </ImageContainer>
      <InfoContainer>
        <Info value={planet?.name} title />
        <Info label='Diameter' value={`${planet?.diameter}`} />
        <Info label='Climate' value={`${planet?.climate}`} />
        <Info label='Population' value={`${planet?.population}`} />
        <Link href={`/planet/${planet?.url?.replace(/\D/g, '')}`}>View more...</Link>
      </InfoContainer>
    </CardStyle>
  )
}

export {
  CharacterCard,
  PlanetCard
}

