import pg from 'pg'

const hostLooksRemote = process.env.PGHOST && !['localhost','127.0.0.1'].includes(process.env.PGHOST)
const shouldUseSSL = process.env.DB_SSL === 'true' || process.env.PGSSLMODE === 'require' || process.env.NODE_ENV === 'production' || hostLooksRemote

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    // Only enable SSL if explicitly requested via env vars
    ...(shouldUseSSL ? { ssl: { rejectUnauthorized: process.env.DB_SSL_REJECT === 'true' ? true : false } } : {})
}

export const pool = new pg.Pool(config)

// Log unexpected errors from idle clients to aid debugging (e.g., ECONNREFUSED)
pool.on('error', (err) => {
    console.error('Unexpected idle client error', err)
})