'use client'
import { useCharacters, useCharactersActions } from '@/app/context.provider'
import { Colors } from '@/app/global.styles'
import { ICharacterActions } from '@/context/types'
import { ICharacter } from '@/interfaces/Character'
import useUtils from '@/utils/index'
import { Public, Star } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import Button from '../Button'
import {
  CardStyle,
  CharTitle,
  ImageButtons,
  ImageContainer,
  InfoContainer,
  InfoTable
} from './styles'

interface IDetailedCard {
  type: 'character' | 'planet'
  id: number
  data: ICharacter | undefined
}

interface ICharacterInfo {
  label?: string,
  value: string | undefined
  title?: boolean
  link?: boolean
}

const CharacterInfo = ({ label, value, title = false, link = false }: ICharacterInfo) => {
  const { extractIdFromUrl } = useUtils()
  const labelProps = title ? {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 24,
    textTransform: 'uppercase',
    padding: '16px 0',
    alignItems: 'center'
  } : {
    color: Colors.silver_lake_blue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
  if (link && value) {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography {...labelProps} color={Colors.white} marginRight={1}>
          {`${label}: `}
        </Typography>
        <Link href={`/planet/${extractIdFromUrl(value || '99')}`}>
          Planet {extractIdFromUrl(value)}
        </Link>
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

const DetailedCard = ({ data, id }: IDetailedCard) => {

  const { formatDate } = useUtils()
  const { extractIdFromUrl } = useUtils()
  const router = useRouter()

  const characterContext = useCharacters()
  const characterActionsContext = useCharactersActions()
  const favorite = useMemo(
    () => characterContext.favorites?.some(item => item.id === id),
    [characterContext, id]
  )

  const handleFavorite = () => {
    characterActionsContext?.({
      type: favorite
        ? ICharacterActions.REMOVE_FAVORITE
        : ICharacterActions.ADD_FAVORITE,
      payload: { favorite: data }
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
      <CardStyle rotation='portrait' size='content'>
        <ImageContainer>
          <ImageButtons>

            <Button
              background={Colors.raisin_black}
              color={Colors.white}
              icon={<Public />}
              handleClick={
                () => router.push(`/planet/${extractIdFromUrl(data?.homeworld || '99')}`)}
            />
            <Button
              background={Colors.raisin_black}
              handleClick={handleFavorite}
              color={favorite ? Colors.sage : Colors.white}
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
        <InfoContainer size='content'>
          <CharTitle>
            <CharacterInfo value={data?.name} title />
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
            <CharacterInfo value='Detailed data' title />
          </CharTitle>
          <InfoTable>
            <CharacterInfo label='Height' value={`${data?.height}cm`} />
            <CharacterInfo label='Mass' value={`${data?.mass}`} />
            <CharacterInfo label='Hair color' value={`${data?.hair_color}`} />
            <CharacterInfo label='Skin color' value={`${data?.skin_color}`} />
            <CharacterInfo label='Eye color' value={`${data?.eye_color}`} />
            <CharacterInfo label='Birth year' value={`${data?.birth_year}`} />
            <CharacterInfo label='Gender' value={`${data?.gender}`} />
            <CharacterInfo label='Homeworld' link value={`${data?.homeworld}`} />
            <CharacterInfo label='Films' value={`${data?.films?.join(', ')}`} />
            <CharacterInfo label='Species' link value={`${data?.species}`} />
            <CharacterInfo label='Vehicles' value={`${data?.vehicles}`} />
            <CharacterInfo label='Starships' value={`${data?.starships}`} />
            <CharacterInfo label='Created' value={`${formatDate(data?.created)}`} />
            <CharacterInfo label='Edited' value={`${formatDate(data?.edited)}`} />
            <CharacterInfo label='Identifier' value={`${id}`} />
          </InfoTable>
        </InfoContainer>
      </CardStyle>
    </div>
  )
}

export default DetailedCard