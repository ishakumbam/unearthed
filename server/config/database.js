import pg from 'pg'

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)

// Log unexpected errors from idle clients to aid debugging (e.g., ECONNREFUSED)
pool.on('error', (err) => {
    console.error('Unexpected idle client error', err)
})