'use client'
import useUtils from '@/utils'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { BreadcrumbContainer } from './styles'

const Breadcrumb = () => {
  const { currentPath } = useUtils()
  return (
    <BreadcrumbContainer aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Desafio
      </Link>
      <Link
        color="inherit"
        href="/"
      >
        SWAPI
      </Link>
      <Typography
        sx={{ color: 'text.primary' }}
        fontWeight='bold'
        fontFamily='Outfit, Sans-serif'
        textTransform='uppercase'
      >
        {currentPath}
      </Typography>
    </BreadcrumbContainer>
  )
}

export default Breadcrumb