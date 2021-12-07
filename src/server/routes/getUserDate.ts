import { isMatch } from 'date-fns'
import { Request, Response } from 'express'
import db from '../db'

async function getUserIdFromUsername(username: string) {
    const query = `SELECT id FROM app_user WHERE username = $1`
    try {
        const result = await db.query(query, [username])
        return { result: parseInt(result.rows[0].id, 10), error: null }
    } catch (error) {
        return { result: null, error }
    }
}

async function getValues(userId: number, date: string) {
    const query = `SELECT 
    track.title as track,
    artist.title as artist
FROM day_item
INNER JOIN track ON track.id = track_id
INNER JOIN artist ON artist.id = artist_id
WHERE day_item.user_id = $1
AND date = $2`

    try {
        const result = await db.query(query, [userId, date])
        return { result, error: null }
    } catch (error) {
        return { result: null, error }
    }
}

export default async function getUserDate(
    { params: { username, date } }: Request,
    response: Response
) {
    const isValidDate = isMatch(date, 'yyyy-MM-dd') && date.length === 10

    const { result: userId, error: userIdError } = await getUserIdFromUsername(
        username
    )

    if (!userId) {
        return response.status(404).json({ error: 'Could not find user' })
    }
    if (userIdError) {
        return response.status(500).json({ error: userIdError })
    }
    if (!date || !isValidDate) {
        return response.status(500).json({ error: 'Invalid date' })
    }

    const { result, error } = await getValues(userId, date)

    if (error) {
        return response.status(500).json({ error })
    }
    if (!result || !result.rows || result.rows.length === 0) {
        return response
            .status(404)
            .json({ error: 'Could not find tracks for this day' })
    }
    return response.status(200).json(result.rows)
}
