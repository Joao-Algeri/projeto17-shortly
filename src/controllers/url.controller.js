import { nanoid } from "nanoid"
import { db } from '../database/db.js'

export async function urlShortener(req, res) {

  const { url } = req.body

  const { id: userId } = res.locals.user

  const urlShortener = nanoid(8)

  try {

    const { rows: results } = await db.query(`INSERT INTO shortens (url, "shortUrl", "userId") VALUES ($1, $2, $3) RETURNING id`, [url, urlShortener, userId])

    const [result] = results

    res.status(201).send({
      id: result.id,
      shortUrl: urlShortener
    })

  } catch (error) {
    console.log(error)
    res.status(500).send('There is a problem in our servers, try again later')
  }


}