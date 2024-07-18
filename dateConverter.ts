const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

/**
 * If the day is Monday, return the number of days until next Monday
 * If the day is Tuesday, return the number of days until next Tuesday
 * If the day is Wednesday, and the current day is Wednesday, return 0
 * @input day [string]
 */
function daysUntilNext(day: string): number {
  const today = (new Date().getDay() + 6) % 7 // Adjust to make Monday = 0, Tuesday = 1, etc.
  const targetDayIndex = weekdays.indexOf(day)

  if (targetDayIndex === -1) {
    throw new Error("Invalid day")
  }

  if (targetDayIndex === today) {
    return 0
  }

  return (targetDayIndex + 7 - today) % 7
}

/**
 * If the day is today, return 0
 * If the day is tomorrow, return 1
 * If the day is Saturday, return the number of days until Saturday
 * If the day is Sunday, return the number of days until Sunday
 * @param day [string]
 */
function parseDayDelay(day: string): number {
  if (weekdays.includes(day)) {
    return daysUntilNext(day)
  } else if (day === "Today") {
    return 0
  } else if (day === "Tomorrow") {
    return 1
  }

  throw new Error(`Invalid day ${day}`)
}

const fancyDateToDate = (input: string) => {
  const [day, time] = input.split(", ")
  const [hour, minuteString] = time.split(":")
  const [minute, pmOrAm] = minuteString.split(" ")
  const delay = new Date()
  delay.setHours(pmOrAm === "PM" ? Number(hour) + 12 : Number(hour))
  delay.setMinutes(Number(minute))
  delay.setDate(delay.getDate() + parseDayDelay(day))

  return delay
}

function dateToReadableDelay(date: Date): string {
  const now = new Date()
  const diffInMillis = date.getTime() - now.getTime()
  console.log(diffInMillis)
  const diffInMinutes = Math.round(diffInMillis / (1000 * 60))
  const diffInHours = Math.round(diffInMillis / (1000 * 60 * 60))
  const diffInDays = Math.round(diffInMillis / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 0) {
    return "The date is in the past"
  } else if (diffInMinutes < 60) {
    return `in ${diffInMinutes} minutes`
  } else if (diffInHours < 24) {
    return `in ${diffInHours} hours`
  } else if (diffInDays === 1) {
    return "in one day"
  } else {
    return `in ${diffInDays} days`
  }
}

export default function fancyDateToReadableDelay(fancyDate: string): string {
  return dateToReadableDelay(fancyDateToDate(fancyDate))
}
