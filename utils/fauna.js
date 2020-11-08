const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET
})

const getBirthdays = async () => {
  const { data } = await client.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('people'))),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )
  )

  const birthdays = data.map((birthday) => {
    birthday.id = birthday.ref.id
    delete birthday.ref
    return birthday
  })

  return birthdays
}

const createBirthday = async (firstname, lastname, birthday) => {
  return await client.query(
    q.Create(q.Collection('people'), {
      data: { firstname, lastname, birthday }
    })
  )
}

const updateBirthday = async (id, firstname, lastname, birthday) => {
  return await client.query(
    q.Update(q.Ref(q.Collection('people'), id), {
      data: {
        firstname,
        lastname,
        birthday
      }
    })
  )
}

const getBirthdayById = async (id) => {
  const birthday = await client.query(q.Get(q.Ref(q.Collection('people'), id)))

  birthday.id = birthday.ref.id
  delete birthday.ref
  return birthday
}

const deleteBirthday = async (id) => {
  return await client.query(q.Delete(q.Ref(q.Collection('people'), id)))
}

module.exports = {
  getBirthdays,
  createBirthday,
  updateBirthday,
  getBirthdayById,
  deleteBirthday
}
