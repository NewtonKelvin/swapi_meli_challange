'use client'
import { Colors } from '@/app/global.styles'
import { ICharacter } from '@/interfaces/Character'
import { Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import { CardStyle, ImageButtons, ImageContainer, InfoContainer } from './styles'

interface ICharacterCard {
  character: ICharacter
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
  } as any
  return (
    <Typography {...labelProps}>
      {label ? `${label}: ${value}` : value}
    </Typography>
  )
}

const CharacterCard = ({ character }: ICharacterCard) => {

  return (
    <CardStyle>
      <ImageContainer>
        <ImageButtons>
          <Button
            background={Colors.raisin_black}
            color={Colors.white}
            text={character.homeworld || '?'}
          />
          <Button
            background={Colors.raisin_black}
            color={Colors.white}
            text={character.species[0] || '?'}
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

