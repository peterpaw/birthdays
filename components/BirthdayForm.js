import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function BirthdayForm(props) {
  const router = useRouter()
  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      firstname: props.firstname ? props.firstname : '',
      lastname: props.lastname ? props.lastname : '',
      birthday: props.birthday ? props.birthday : ''
    }
  })

  const createBirthday = async (data) => {
    const { firstname, lastname, birthday } = data
    try {
      await fetch('/api/createBirthday', {
        method: 'POST',
        body: JSON.stringify({ firstname, lastname, birthday }),
        headers: { 'Content-Type': 'application/json' }
      })
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  const updateBirthday = async (data) => {
    const { firstname, lastname, birthday } = data
    const id = props.id
    try {
      await fetch('/api/updateBirthday', {
        method: 'PUT',
        body: JSON.stringify({ id, firstname, lastname, birthday }),
        headers: { 'Content-Type': 'application/json' }
      })
      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(props.firstname ? updateBirthday : createBirthday)}
      className='py-12 text-left'
    >
      <h2 className='text-gray-400 text-center text-2xl font-bold mb-12'>
        {props.birthday ? 'Update existing' : 'Create a new'} Birthday
      </h2>
      {/* firstname */}
      <div className='mb-4'>
        <label
          htmlFor='firstname'
          className='block text-gray-400 text-sm font-bold mb-1'
        >
          First name
        </label>
        <input
          name='firstname'
          type='text'
          className='w-full border bg-gray-200 rounded px-3 py-2 outline-none text-gray-700'
          ref={register({ required: true })}
        />
        {errors.firstname && (
          <p className='font-bold text-gray-300 bg-red-800 rounded mt-2 p-2'>
            First name is required
          </p>
        )}
      </div>

      {/* lasstname */}
      <div className='mb-4'>
        <label
          htmlFor='lastname'
          className='block text-gray-400 text-sm font-bold mb-1'
        >
          Last name
        </label>
        <input
          name='lastname'
          type='text'
          className='w-full border bg-gray-200 rounded px-3 py-2 outline-none text-gray-700'
          ref={register({ required: true })}
        />
        {errors.lastname && (
          <p className='font-bold text-gray-300 bg-red-800 rounded mt-2 p-2'>
            Last name is required
          </p>
        )}
      </div>
      {/* birthday */}
      <div className='mb-4'>
        <label
          htmlFor='birthdy'
          className='block text-gray-400 text-sm font-bold mb-1'
        >
          Birthday
        </label>
        <input
          name='birthday'
          type='text'
          className='w-full border bg-gray-200 rounded px-3 py-2 outline-none text-gray-700'
          placeholder='DD.MM.YYYY'
          ref={register({ required: true })}
        />
        {errors.birthday && (
          <p className='font-bold text-gray-300 bg-red-800 rounded mt-2 p-2'>
            Birthday is required
          </p>
        )}
      </div>
      <button
        className='mt-3 inline-block bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'
        type='submit'
      >
        Save
      </button>
      <Link href='/'>
        <a className='mt-3 inline-block bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          Cancel
        </a>
      </Link>
    </form>
  )
}
