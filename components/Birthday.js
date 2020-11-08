import Link from 'next/link'

const Birthday = ({ data, id, birthdayDeleted }) => {
  const { firstname, lastname, birthday } = data

  const handleDelete = async () => {
    try {
      await fetch('/api/deleteBirthday', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' }
      })
      birthdayDeleted()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='mb-8'>
      <div className='bg-gray-300 p-4 rounded-md mt-2 shadow-lg text-gray-700 flex justify-between items-center'>
        <h2 className='text-md font-bold'>{`${firstname} ${lastname}`}</h2>
        <span className='font-bold text-sm'>{birthday}</span>
      </div>
      <Link href={`/edit/${id}`}>
        <a className='mt-3 inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold p-1 rounded focus:outline-none focus:shadow-outline px-4 text-xs'>
          Edit
        </a>
      </Link>
      <button
        className='mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold p-1 rounded focus:outline-none focus:shadow-outline ml-2 px-4 text-xs'
        type='button'
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  )
}

export default Birthday
