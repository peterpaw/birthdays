// this code is running on the server before this component gets send to the user
// we can reference code that runs on the server
import { getBirthdayById } from '../../utils/fauna'
import BirthdayForm from '../../components/BirthdayForm'

export default function EditBirthdayPage({
  id,
  firstname,
  lastname,
  birthday
}) {
  return (
    <BirthdayForm
      id={id}
      firstname={firstname}
      lastname={lastname}
      birthday={birthday}
    />
  )
}

export async function getServerSideProps(context) {
  try {
    const id = context.params.id
    const {
      data: { firstname, lastname, birthday }
    } = await getBirthdayById(id)
    return { props: { id, firstname, lastname, birthday } }
  } catch (err) {
    console.error(err)
  }
}
