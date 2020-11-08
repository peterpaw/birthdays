import { updateBirthday } from '../../utils/fauna'

export default async function handler(req, res) {
  const { id, firstname, lastname, birthday } = req.body
  if (req.method !== 'PUT') {
    return res
      .status(405)
      .json({ msg: 'Method not allowed. Expected PUT method.' })
  }

  try {
    const updatedBirthday = await updateBirthday(
      id,
      firstname,
      lastname,
      birthday
    )
    return res.status(200).json(updatedBirthday)
  } catch (err) {
    console.error(err)
  }
}
