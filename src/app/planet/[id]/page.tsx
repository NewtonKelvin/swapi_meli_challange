import PlanetData from './planet'

const PlanetPage = async ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = await params
  console.log(params)

  return (
    <PlanetData id={+id} />
  )
}

export default PlanetPage