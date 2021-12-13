import { isMatch } from 'date-fns'

export const isValidDate = (date: string) =>
    isMatch(date, 'yyyy-MM-dd') && date.length === 10
