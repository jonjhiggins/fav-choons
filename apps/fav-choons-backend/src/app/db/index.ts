import { Pool } from 'pg'

const pool = new Pool()

export default {
    query: (text: string, params?: (string | number)[]) =>
        pool.query(text, params),
}
