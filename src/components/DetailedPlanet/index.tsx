'use client'
import { usePlanets, usePlanetsActions } from '@/app/context.provider'
import { Colors } from '@/app/global.styles'
import { IPlanetActions } from '@/context/types'
import { IPlanet } from '@/interfaces/Planet'
import useUtils from '@/utils/index'
import { Star } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import Button from '../Button'
import {
  CardStyle,
  CharTitle,
  ImageButtons,
  ImageContainer,
  InfoContainer,
  InfoTable
} from '../DetailedCard/styles'

interface IDetailedCard {
  type: 'planet' | 'planet'
  id: number
  data: IPlanet | undefined
}

interface IPlanetInfo {
  label?: string,
  value: string | string[]
  title?: boolean
  link?: boolean
}

const PlanetInfo = ({ label, value, title = false, link = false }: IPlanetInfo) => {
  const { extractIdFromUrl } = useUtils()
  const labelProps = title ? {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 24,
    textTransform: 'uppercase',
    padding: '16px 0',
    alignItems: 'center',
    width: '80px'
  } : {
    color: Colors.silver_lake_blue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
  if (link && value) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Typography {...labelProps} color={Colors.white} marginRight={1}>
          {`${label}: `}
        </Typography>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          color: Colors.white,
          flexWrap: 'wrap',
          gap: '6px'
        }}>
          {value?.map((char, index) => (
            <>
              <Link key={index} href={`/character/${extractIdFromUrl(char)}`}>
                {`Character ${extractIdFromUrl(char)}${index + 1 < value.length ? ', ' : ''}`}
              </Link>
            </>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      {label && (
        <Typography {...labelProps} color={Colors.white} marginRight={1}>
          {`${label}: `}
        </Typography>
      )}
      <Typography {...labelProps}>
        {value}
      </Typography>
    </div>
  )
}

const DetailedPlanet = ({ data, id }: IDetailedCard) => {

  const { formatDate } = useUtils()

  const planetContext = usePlanets()
  const planetActionsContext = usePlanetsActions()
  const favorite = useMemo(
    () => planetContext.favorites?.some(item => item.id === id),
    [planetContext, id]
  )

  const handleFavorite = () => {
    planetActionsContext?.({
      type: favorite
        ? IPlanetActions.REMOVE_FAVORITE
        : IPlanetActions.ADD_FAVORITE,
      payload: { favorite: data }
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
    <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
      <CardStyle rotation='portrait' size='content'>
        <ImageContainer>
          <ImageButtons>
            <Button
              background={Colors.raisin_black}
              color={Colors.white}
              text={calcTerrain(data?.terrain)}
            />
            <Button
              background={Colors.raisin_black}
              handleClick={handleFavorite}
              color={favorite ? Colors.sage : Colors.white}
              icon={<Star fontSize='small' />}
            />
          </ImageButtons>
          <Image
            src={'/images/planet.webp'}
            alt='Planet'
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
        <InfoContainer size='content'>
          <CharTitle>
            <PlanetInfo value={data?.name} title />
          </CharTitle>
          <Typography color={Colors.silver_lake_blue}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            finibus erat dui. Nullam sed malesuada ante. Integer vitae molestie
            tortor. Pellentesque aliquet, orci et convallis gravida, metus enim
            bibendum urna, vel elementum arcu elit vel ligula. Ut gravida lectus
            at bibendum sagittis.
          </Typography>
        </InfoContainer>
      </CardStyle>
      <CardStyle rotation='landscape' size='fill'>
        <InfoContainer size='fill'>
          <CharTitle>
            <PlanetInfo value='Detailed data' title />
          </CharTitle>
          <InfoTable>
            <PlanetInfo label='Mass' value={`${data?.rotation_period}`} />
            <PlanetInfo label='Orbital period' value={`${data?.orbital_period}`} />
            <PlanetInfo label='Diameter' value={`${data?.diameter}`} />
            <PlanetInfo label='Climate' value={`${data?.climate}`} />
            <PlanetInfo label='Gravity' value={`${data?.gravity}`} />
            <PlanetInfo label='Terrain' value={`${data?.terrain}`} />
            <PlanetInfo label='Surface water' value={`${data?.surface_water}`} />
            <PlanetInfo label='Population' value={`${data?.population}`} />
            <PlanetInfo label='Residents' link value={data?.residents} />
            <PlanetInfo label='Films' value={`${data?.films?.join(', ')}`} />
            <PlanetInfo label='Created' value={`${formatDate(data?.created)}`} />
            <PlanetInfo label='Edited' value={`${formatDate(data?.edited)}`} />
            <PlanetInfo label='Identifier' value={`${id}`} />
          </InfoTable>
        </InfoContainer>
      </CardStyle>
    </div>
  )
}

export default DetailedPlanet