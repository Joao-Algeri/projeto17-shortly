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

export async function getUrlById(req, res) {
    const { id } = req.params
  
    try {

      const result = await db.query(`SELECT * FROM shortens WHERE id = $1`, [id])
  
      if (result.rowCount === 0) return res.sendStatus(404)
  
      const [url] = result.rows
  
      res.send({
        id: url.id,
        shortUrl: url.shortUrl,
        url: url.url
      })
  
    } catch (error) {
      console.log(error)
      res.status(500).send("There is a problem in our servers, try again later")
    }
  
  }

  export async function openUrl(req, res) {

    const { shortUrl } = req.params
  
    try {
      const result = await db.query(`SELECT * FROM shortens WHERE "shortUrl" = $1`, [shortUrl])
  
      if (result.rowCount === 0) return res.sendStatus(404)
  
      const [url] = result.rows
  
      await db.query(`UPDATE shortens SET "visitCount" = "visitCount" + 1 WHERE id = $1`, [url.id])
  
      res.redirect(url.url)
  
    } catch (error) {
      console.log(error)
      res.status(500).send("There is a problem in our servers, try again later")
    }
  
  }

  export async function deleteUrl(req, res) {
    const { id } = req.params
    const { user } = res.locals
  
    try {
      const result = await db.query(`SELECT * FROM shortens WHERE id = $1`, [id])
  
      if (result.rowCount === 0) return res.sendStatus(404)
  
      const [url] = result.rows
  
      if (url.userId !== user.id) return res.sendStatus(401)
  
      await db.query(`DELETE FROM shortens WHERE id = $1`, [id])
  
      res.sendStatus(204)
      
    } catch (error) {
      console.log(error)
      res.status(500).send("There is a problem in our servers, try again later")
    }
  }