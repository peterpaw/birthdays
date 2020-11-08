import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-gray-900 w-full min-h-screen px-2'>
      <div className='max-w-2xl mx-auto'>
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
