import { format } from 'date-fns';
import { Request } from 'express';
import { UserJsonResponse } from '@fav-choons/types';
import { dateFormat } from '@fav-choons/constants';
import db from '../db';

export default async function getUser(
  { params: { username } }: Request,
  response: UserJsonResponse
) {
  const query = `
        WITH select_username AS (SELECT id FROM app_user WHERE username = $1)
        SELECT date from select_username
        LEFT JOIN day_item on select_username.id = day_item.user_id
        GROUP BY date
        ORDER BY date DESC`;

  const result = await db.query(query, [username]);
  const dates = result.rows.map(({ date }) => format(date, dateFormat));

  if (dates.length < 1) {
    return response.status(404).json({
      error: 'User not found',
      ok: false,
    });
  }

  return response.status(200).json({
    data: { dates },
    ok: true,
  });
}
