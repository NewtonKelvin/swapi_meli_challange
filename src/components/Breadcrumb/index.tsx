'use client'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BreadcrumbContainer } from './styles'

const Breadcrumb = () => {
  const path = usePathname().replace(/[^a-zA-Z]+/g, '')
  const pathName =
    String(path).charAt(0).toUpperCase() + String(path).slice(1) || 'Home'
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
        {pathName}
      </Typography>
    </BreadcrumbContainer>
  )
}

export default Breadcrumb