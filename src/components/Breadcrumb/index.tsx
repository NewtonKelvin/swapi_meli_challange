'use client'
import useUtils from '@/utils'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { BreadcrumbContainer } from './styles'

const Breadcrumb = () => {
  const { pathName } = useUtils()
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
      <Typography sx={{ color: 'text.primary' }} fontWeight='bold'>
        {pathName}
      </Typography>
    </BreadcrumbContainer>
  )
}

export default Breadcrumb