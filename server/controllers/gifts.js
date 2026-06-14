import { pool } from '../config/database.js'

const getGifts = async (req, res) => {
    try {
        const results = await pool.query('SELECT id, name, pricepoint as "pricePoint", audience, image, description, submittedby as "submittedBy", submittedon as "submittedOn" FROM gifts ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const getGiftById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT id, name, pricepoint as "pricePoint", audience, image, description, submittedby as "submittedBy", submittedon as "submittedOn"
      FROM gifts
      WHERE id=$1
    `
    const results = await pool.query(selectQuery, [req.params.id])
    const gift = results.rows[0] || null
    if (!gift) return res.status(404).json({ error: 'Gift not found' })
    res.status(200).json(gift)
  } catch (error) {
    res.status(409).json( { error: error.message } )

  }
}
export default {
  getGifts,
  getGiftById
}