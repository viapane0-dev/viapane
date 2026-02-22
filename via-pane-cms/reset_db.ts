import { Client } from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

dotenv.config({ path: path.resolve(dirname, '.env') })

// Ensure connection string is present
if (!process.env.DATABASE_URI) {
    console.error('DATABASE_URI is missing in .env')
    process.exit(1)
}

const client = new Client({
    connectionString: process.env.DATABASE_URI,
})

async function reset() {
    console.log('Connecting to database...')
    await client.connect()
    console.log('Connected.')

    // Drop schema and recreate
    console.log('Dropping public schema...')
    await client.query(`
    DROP SCHEMA IF EXISTS public CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO public;
    COMMENT ON SCHEMA public IS 'standard public schema';
  `)

    console.log('Database reset successfully.')
    await client.end()
}

reset().catch((e) => {
    console.error('Error resetting DB:', e)
    process.exit(1)
})
