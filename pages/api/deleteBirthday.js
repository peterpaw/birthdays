import { deleteBirthday } from '../../utils/fauna'

export default async function handler(req, res) {
  const { id } = req.body

  if (req.method !== 'DELETE') {
    return res
      .status(405)
      .json({ msg: 'Method not allowed. Expected DELETE method.' })
  }

  try {
    const deletedBirthday = await deleteBirthday(id)
    return res.status(200).json(deletedBirthday)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}
