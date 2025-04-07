const CharacterPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  console.log(params)
  return (
    <h1>Char Number {slug}</h1>
  )
}

export default CharacterPage