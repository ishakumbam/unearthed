import express from 'express'
import path from 'path'

import { fileURLToPath } from 'url'

import giftData from '../data/gifts.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).json(giftData)
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const gift = giftData.find(g => String(g.id) === String(id))
  if (!gift) return res.status(404).json({ error: 'Gift not found' })
  res.status(200).json(gift)
})

export default router