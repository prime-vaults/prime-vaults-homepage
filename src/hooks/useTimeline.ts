import { useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'

export function useTimeline(
  endTime: number | string | Date = '2024-12-03T16:59:59+00:00',
) {
  const timeout = useRef<NodeJS.Timeout | undefined>(undefined)
  const [currentTimeUTC, setCurrentTimeUTC] = useState(
    dayjs().tz(dayjs.tz.guess()),
  )
  const endDateUTC = useMemo(
    () => dayjs(endTime).tz(dayjs.tz.guess()),
    [endTime],
  )
  const endDateDuration = useMemo(
    () => dayjs.duration(endDateUTC.diff(currentTimeUTC)),
    [currentTimeUTC, endDateUTC],
  )

  const isEnded = useMemo(
    () => dayjs(endDateUTC).isBefore(currentTimeUTC),
    [currentTimeUTC, endDateUTC],
  )

  useEffect(() => {
    if (timeout.current) clearInterval(timeout.current)
    timeout.current = setInterval(
      () => setCurrentTimeUTC(dayjs().tz(dayjs.tz.guess())),
      1000,
    )

    return () => clearInterval(timeout.current)
  }, [])

  return { endTime: endDateDuration, isEnded }
}

/**
 * Custom hook to get a range of dates.
 * - If no date is provided, returns the next 7 days from tomorrow.
 * - If a date is provided, returns a range of days around the date.
 * - Ensures no past dates are included if the chosen date is within the next 3 days from tomorrow.
 * - Supports min and max dates to constrain the range.
 *
 * @param {string | Date | null} baseDate - The base date to calculate from (optional).
 * @param {number} range - The number of days before and after the base date (default: 3).
 * @param {string | Date | null} minDate - The minimum allowable date (optional).
 * @param {string | Date | null} maxDate - The maximum allowable date (optional).
 * @returns {string[]} Array of date strings in the format 'YYYY-MM-DD'.
 */
export const useWeekRange = ({
  baseDate = null,
  maxDate = null,
  minDate = null,
  range = 3,
}: {
  baseDate: Date | string | undefined | null
  minDate: Date | string | null
  maxDate: Date | string | undefined | null
  range?: number
}) => {
  return useMemo(() => {
    const today = dayjs().utc().startOf('day')
    const tomorrow = today.add(1, 'day')
    const futureLimit = tomorrow.add(range, 'day')

    const minDay = minDate ? dayjs(minDate).utc().startOf('day') : null
    const maxDay = maxDate ? dayjs(maxDate).utc().startOf('day') : null

    let startDate
    let endDate

    if (baseDate) {
      const selectedDate = dayjs(baseDate)
      if (
        selectedDate.isSame(tomorrow, 'day') ||
        (selectedDate.isAfter(tomorrow) && selectedDate.isBefore(futureLimit))
      ) {
        startDate = tomorrow
        endDate = startDate.add(range * 2, 'day')
      } else {
        startDate = selectedDate.subtract(range, 'day')
        endDate = selectedDate.add(range, 'day')
      }
    } else {
      startDate = tomorrow
      endDate = tomorrow.add(7, 'day')
    }

    if (minDay && startDate.isBefore(minDay)) startDate = minDay
    if (maxDay && endDate.isAfter(maxDay)) endDate = maxDay

    if (
      baseDate &&
      maxDay &&
      dayjs(baseDate).isAfter(maxDay.subtract(3, 'day'))
    ) {
      endDate = maxDay
      const totalDays = endDate.diff(startDate, 'day') + 1
      if (totalDays < 7) {
        startDate = startDate.subtract(7 - totalDays, 'day')
      }
    }

    if (minDay && startDate.isBefore(minDay)) {
      startDate = minDay
    }

    const days = []
    for (
      let d = startDate;
      d.isBefore(endDate) || d.isSame(endDate, 'day');
      d = d.add(1, 'day')
    ) {
      days.push(d.format('YYYY-MM-DD'))
    }

    return days
  }, [baseDate, range, minDate, maxDate])
}
