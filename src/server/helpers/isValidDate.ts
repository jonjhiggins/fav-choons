import { isMatch } from 'date-fns'
import { dateFormat } from '../constants'

export const isValidDate = (date: string) =>
    isMatch(date, dateFormat) && date.length === 10
