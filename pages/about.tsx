import React from 'react'
import Router, { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import fetch from 'isomorphic-fetch'

const handler = () => {
  Router.push({
    pathname: '/about',
    query: { name: 'Zeit' }
  })
}

const About = (props: any) => {
  const hits = props.helth.hits.hits
  const router = useRouter()
  const { name } = router.query
  //   console.log({ name })
  const [a, setA] = React.useState<any>({})
  const [isClick, setIsClick] = React.useState(false)

  React.useEffect(() => {
    console.log({ props })
    const fetchData = async () => {
      const result = await fetch('http://localhost:3000/api/hello').then((res) => res.json())
      setA(result)
      console.log('リザルト', result)
    }
    isClick && fetchData()
  }, [isClick])
  console.log({ a })
  return (
    <>
      <ul>
        {hits.map((x: any, i: number) => (
          <li key={i}>
            {x._source.title} <br /> {x._source.price}
          </li>
        ))}
      </ul>
      test Click <span onClick={handler}>here</span>
      <button onClick={() => setIsClick(true)}>Search</button>
      <ul>
        {isClick &&
          a &&
          a.hits?.hits.map((x: any, i: number) => (
            <li key={i}>
              {x._source.title} <br /> {x._source.price}
            </li>
          ))}
      </ul>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //   console.log(context.query)
  //   const res1 = await fetch('http://localhost:9200/library/_search').then((res) => res.json())
  const res1 = await fetch('http://localhost:3000/api/v1/search').then((res) => res.json())
  //   console.log({ res1 })
  //   const res2 = await fetch('http://localhost:3000/api/v1/search').then((res) => res.json())
  const res2 = await fetch('http://localhost:3000/api/hello')
  //   console.log({ res2 })
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res2.json()
  return { props: { number: 1, helth: res1, data: json } }
}

export default About
