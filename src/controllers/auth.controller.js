import bcrypt from 'bcrypt'
import { db } from '../database/db.js'
import { v4 as uuid } from 'uuid'

export async function signIn(req, res) {

  const { email, password } = req.body;

  const { rows: users } = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

  if (!users) return res.sendStatus(401)

  const [user] = users

  if (bcrypt.compareSync(password, user.password)) {
    
    const token = uuid();

    await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, user.id])

    return res.send({ token })
  }

  res.sendStatus(401);

}