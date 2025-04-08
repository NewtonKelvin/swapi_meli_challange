import CharacterData from './character'

const CharacterPage = async ({ params }: { params: Promise<{ slug: string, id: number }> }) => {
  const { id } = await params
  console.log(params)

  return (
    <CharacterData id={+id} />
  )
}

export default CharacterPage