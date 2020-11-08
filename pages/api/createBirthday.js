import { createBirthday } from '../../utils/fauna'

export default async function handler(req, res) {
  const { firstname, lastname, birthday } = req.body
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ msg: 'Method not allowed. Expected POST method.' })
  }

  try {
    const createdBirthday = await createBirthday(firstname, lastname, birthday)
    return res.status(200).json(createdBirthday)
  } catch (err) {
    console.error(err)
  }
}
