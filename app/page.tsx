// these two needs to be enabled for / route to _not_ be SSG
// export const dynamic = 'auto'
// export const revalidate = 30

const getSomeData = async () => {
  const response = await fetch('https://www.google.com', {
    next: {
      revalidate: 60,
      tags: [ 'whatever' ]
    }
  })

  return response.text()
}

export default async function Home() {
  const someData = await getSomeData()

  return <div>Hi</div>
}
