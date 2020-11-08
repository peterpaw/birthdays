import { getBirthdays } from '../../utils/fauna'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405)
  }

  try {
    const birthdays = await getBirthdays()
    return res.status(200).json(birthdays)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Something went wrong' })
  }
}
