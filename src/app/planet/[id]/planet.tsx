'use client'
import { GetPlanetAPI } from '@/apis'
import { usePlanets } from '@/app/context.provider'
import { DetailedPlanet } from '@/components'
import Loading from '@/components/Loading'
import { IPlanet } from '@/interfaces/Planet'
import { useEffect, useState } from 'react'

const PlanetData = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [planet, setPlanet] = useState<IPlanet>()
  const planetContext = usePlanets()

  const reusePlanet = planetContext?.planets?.find((planet) => planet.id === id)

  const getPlanet = async () => {
    if (planet) return
    if (reusePlanet) return setPlanet(reusePlanet)
    setIsLoading(true)
    const response = await GetPlanetAPI(id)
    if (response) {
      setPlanet(response)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getPlanet()
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
      {/* <h1>Char Number {id}</h1> */}
      <DetailedPlanet data={planet} type='planet' id={id} />
    </>
  )
}

export default PlanetData