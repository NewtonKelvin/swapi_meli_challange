
const CharacterPage = async ({ params }: { params: Promise<{ slug: string, id: number }> }) => {
  const { id } = await params
  console.log(params)

  return (
    <h1>Char Number {id}</h1>
  )
}

export default CharacterPage