import { Request, Response } from 'express'
import db from '../db'
import userDateChecks from './userDateChecks'

interface Track {
    artist: string
    title: string
    spotifyId?: string
}

async function insertValues(
    userId: number,
    date: string,
    { artist, title }: Track
) {
    const values = [artist, title, userId, date]
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
        `
    try {
        await db.query(query, values)
        return { error: null }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { error }
    }
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
    response: Response
) {
    const paramChecks = await userDateChecks(username, date)
    if (!paramChecks.userId) {
        return response
            .status(paramChecks.statusCode || 500)
            .json({ error: paramChecks.error })
    }

    if (!body || !body.track || !body.track.artist || !body.track.title) {
        return response
            .status(paramChecks.statusCode || 500)
            .json({ error: 'Track data missing or not formatted correctly' })
    }

    const { error } = await insertValues(paramChecks.userId, date, body.track)

    if (error) {
        if (
            'code' in error &&
            error.code === '23505' &&
            error.constraint === 'day_item_user_id_date_track_id_key'
        ) {
            return response
                .status(500)
                .json({ error: 'Each track can only appear once for each day' })
        }
        return response.status(500).json({ error })
    }
    return response.status(200).json({ result: 'Success' })
}
