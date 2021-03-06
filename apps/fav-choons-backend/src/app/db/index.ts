import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DISABLE_PGSSL
    ? false
    : {
        rejectUnauthorized: false,
      },
});

export default {
  query: (text: string, params?: (string | number)[]) =>
    pool.query(text, params),
};
