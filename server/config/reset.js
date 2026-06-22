import { pool } from './database.js'
import './dotenv.js'
import pg from 'pg'
import giftData from '../data/gifts.js'

const createGiftsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS gifts;

        CREATE TABLE IF NOT EXISTS gifts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            pricePoint VARCHAR(10) NOT NULL,
            audience VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            submittedBy VARCHAR(255) NOT NULL,
            submittedOn TIMESTAMP NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 gifts table created successfully')
    } catch (err) {
        console.error('⚠️ error creating gifts table', err)
        // If the error indicates SSL is required, retry with an SSL-enabled client
        if (err && String(err.message).includes('SSL')) {
            try {
                const fallbackPool = new pg.Pool({
                    user: process.env.PGUSER,
                    password: process.env.PGPASSWORD,
                    host: process.env.PGHOST,
                    port: process.env.PGPORT,
                    database: process.env.PGDATABASE,
                    ssl: { rejectUnauthorized: false }
                })
                await fallbackPool.query(createTableQuery)
                console.log('🎉 gifts table created successfully (with SSL fallback)')
                await fallbackPool.end()
                return
            } catch (e) {
                console.error('⚠️ SSL fallback failed', e)
            }
        }
    }
}

const seedGiftsTable = async () => {
    await createGiftsTable()

    giftData.forEach((gift) => {
        const insertQuery = {
            text: 'INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }

        const values = [
            gift.name,
            gift.pricePoint,
            gift.audience,
            gift.image,
            gift.description,
            gift.submittedBy,
            gift.submittedOn
        ]

        pool.query(insertQuery, values, async (err, res) => {
            if (err) {
                console.error('⚠️ error inserting gift', err)
                // try SSL fallback for insert if SSL is required
                if (err && String(err.message).includes('SSL')) {
                    try {
                        const fallbackPool = new pg.Pool({
                            user: process.env.PGUSER,
                            password: process.env.PGPASSWORD,
                            host: process.env.PGHOST,
                            port: process.env.PGPORT,
                            database: process.env.PGDATABASE,
                            ssl: { rejectUnauthorized: false }
                        })
                        await fallbackPool.query(insertQuery, values)
                        console.log(`✅ ${gift.name} added successfully (with SSL fallback)`)
                        await fallbackPool.end()
                        return
                    } catch (e) {
                        console.error('⚠️ SSL fallback insert failed', e)
                    }
                }
                return
            }

            console.log(`✅ ${gift.name} added successfully`)
        })
    })
}

seedGiftsTable()