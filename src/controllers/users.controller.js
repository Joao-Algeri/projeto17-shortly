import { db } from '../database/db.js'
import bcrypt from 'bcrypt'

export async function signUp(req, res) {
    
  const { name, email, password } = req.body

  try {

    const userExists = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

    if (userExists.rowCount > 0) return res.sendStatus(409)

    const hash = bcrypt.hashSync(password, 10)

    await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, hash])

    res.sendStatus(201)

  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }

}

export async function getMyUser(req, res) {
    const { user } = res.locals
  
    try {
      const visits = await db.query(`SELECT SUM(shortens."visitCount") FROM shortens WHERE "userId" = $1 `, [user.id])
  
      const [visitCount] = visits.rows
  
      const urlResults = await db.query(`SELECT * FROM shortens WHERE "userId" = $1`, [user.id])
  
      const shortenedUrls = urlResults.rows.map((row) => {
        return {
          id: row.id,
          shortUrl: row.shortUrl,
          url: row.url,
          visitCount: row.visitCount
        }
      })
  
      res.send({
        id: user.id,
        name: user.name,
        visitCount: visitCount.sum || 0,
        shortenedUrls
      })
  
    } catch (error) {
      console.log(error)
      res.status(500).send(error.message)
    }
  
  }