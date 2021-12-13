import db from '../db'
import { isValidDate } from '../helpers/isValidDate'
async function getUserIdFromUsername(username: string) {
    const query = `SELECT id FROM app_user WHERE username = $1`
    try {
        const result = await db.query(query, [username])
        return { result: parseInt(result.rows[0].id, 10), error: null }
    } catch (error) {
        return { result: null, error }
    }
}

export default async function userDateChecks(username: string, date: string) {
    const validDate = isValidDate(date)
    const { result: userId, error: userIdError } = await getUserIdFromUsername(
        username
    )
    if (!userId) {
        return { error: 'Could not find user', statusCode: 404 }
    }
    if (userIdError) {
        return { error: userIdError, statusCode: 500 }
    }
    if (!date || !validDate) {
        return { error: 'Invalid date', statusCode: 500 }
    }
    return { userId }
}
