import { Request } from 'express';
import { StandardResponse } from '@fav-choons/types';
import { Track } from '@fav-choons/types';
import db from '../db';
import userDateChecks from './userDateChecks';

async function insertValues(
  userId: number,
  date: string,
  { artist, title }: Track
) {
  const values = [artist, title, userId, date];
  const query = `WITH insert_artist AS (
            INSERT INTO artist (title)
            VALUES ($1)
            ON CONFLICT (title)
            DO UPDATE SET title = EXCLUDED.title
            RETURNING id AS artist_id
            ),
        insert_track AS (
            INSERT INTO track (artist_id, title)
            SELECT artist_id, $2 FROM insert_artist
            ON CONFLICT (artist_id, title)
            DO UPDATE SET title = EXCLUDED.title
            RETURNING id AS track_id
            )
        INSERT INTO day_item (user_id, date, track_id)
        SELECT $3, $4, track_id FROM insert_track
        ON CONFLICT (user_id, date, track_id) DO NOTHING
        RETURNING id
        `;
  const result = await db.query(query, values);
  return { result: result.rows[0].id };
}

export default async function addTrackForDate(
  {
    params: { username, date },
    body,
  }: Request<
    { username: string; date: string },
    Record<string, unknown>,
    { track: Track }
  >,
  response: StandardResponse<{ id: string }>
) {
  const paramChecks = await userDateChecks(username, date);
  if (!paramChecks.userId) {
    return response
      .status(paramChecks.statusCode || 500)
      .json({ ok: false, error: paramChecks.error });
  }

  if (!body || !body.track || !body.track.artist || !body.track.title) {
    return response.status(paramChecks.statusCode || 500).json({
      ok: false,
      error: 'Track data missing or not formatted correctly',
    });
  }

  const { result } = await insertValues(paramChecks.userId, date, body.track);

  return response.status(200).json({ ok: true, data: { id: result } });
}
