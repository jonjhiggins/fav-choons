import { Request } from 'express';
import { AllUsersJsonResponse } from '@fav-choons/types';
import db from '../db';

export default async function getUsers(
  _request: Request,
  response: AllUsersJsonResponse
) {
  const query = `
            SELECT  app_user.username FROM app_user
            INNER JOIN day_item ON app_user.id = day_item.user_id
            GROUP BY app_user.id
            ORDER BY app_user.username ASC`;

  const result = await db.query(query);
  const users = result.rows;
  return response.status(200).json({
    data: { users },
    ok: true,
  });
}
