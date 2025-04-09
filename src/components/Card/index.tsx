'use client'
import { useCharacters, useCharactersActions } from '@/app/context.provider'
import { Colors } from '@/app/global.styles'
import { ICharacterActions } from '@/context/types'
import { ICharacterAdapted } from '@/interfaces/Character'
import { Star } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import { CardStyle, ImageButtons, ImageContainer, InfoContainer } from './styles'

interface ICharacterCard {
  character: ICharacterAdapted,
  favorite: boolean
}

interface ICharacterInfo {
  label?: string,
  value: string
  title?: boolean
}

const CharacterInfo = ({ label, value, title = false }: ICharacterInfo) => {
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

  const characterActionsContext = useCharactersActions()
  const charactersContext = useCharacters()
  const isFavorite = charactersContext.favorites?.find(item => item.url === character.url)
  // console.log('@@ XXXX', { isFavorite, fav: charactersContext })
  const handleFavorite = () => {
    console.log('@@ ADD')
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
            text={character.homeworld.replace(/\D/g, '') || '?'}
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
        <CharacterInfo value={character?.name} title />
        <CharacterInfo label='Height' value={`${character?.height}cm`} />
        <CharacterInfo label='Birth year' value={`${character?.birth_year}`} />
        <CharacterInfo label='Gender' value={`${character?.gender}`} />
        <Link href={`/character/${character?.url.replace(/\D/g, '')}`}>View more...</Link>
      </InfoContainer>
    </CardStyle>
  )
}

export {
  CharacterCard
}

