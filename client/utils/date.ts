import {format} from 'date-fns'

// https://date-fns.org/v2.6.0/docs/format
export const dateFormats = {
    PRIMARY: 'Pp' // 05/29/1453, 12:00 AM
}

export const formatDate = (date: number | Date, dateFormat: string) => format(date, dateFormat)