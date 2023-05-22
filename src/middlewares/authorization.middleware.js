import { db } from '../database/db.js'

export async function authValidation(req, res, next) {
  const authorization = req.headers.authorization
  const token = authorization?.replace("Bearer ", "")

  if (!token) return res.status(401).send("You need to sign in")

  try {

    const { rows: sessions } = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token])

    const [session] = sessions;

    if (!session) return res.status(401).send("You need to sign in")

    const { rows: users } = await db.query(`SELECT * FROM users WHERE id = $1`, [session.userId])
    const [user] = users

    if (!user) return res.status(401).send("Invalid user")

    res.locals.user = user
    next()

  } catch (error) {
    console.log(error)
    res.status(500).send("There is a problem in our servers, try again later")
  }

}