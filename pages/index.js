import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'

import Birthday from '../components/Birthday.js'

const IndexPage = () => {
  const { data: people, mutate } = useSWR('/api/birthdays')

  return (
    <>
      <Head>
        <title>Birthdays</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='text-gray-400 py-12'>
          <h1 className='text-center text-4xl font-bold'>Birthdays</h1>
          <p className='text-gray-500 text-center mb-8'>
            View upcoming birthdays and add new ones
          </p>
          <Link href='/create'>
            <a className='my-3 inline-block bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Add a Birthday
            </a>
          </Link>
          {!people && (
            <div className='container flex justify-center items-center min-h-full text-gray-300 py-12'>
              <div className='flex flex-col text-center'>
                <h3 className='text-3xl'>Loading</h3>
                <h4 className='text-xl'>Birthdays</h4>
              </div>
            </div>
          )}

          {people &&
            people.map(({ data, id }) => (
              <Birthday key={id} data={data} id={id} birthdayDeleted={mutate} />
            ))}
        </div>
      </main>
    </>
  )
}

export default IndexPage
