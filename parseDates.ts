import * as A from "arcsecond"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

function parseDayTimeToDate(day: string, hour: number, minute: number, period: string) {
  const toDay = new Date()
  const date = new Date()

  if (day === "Tomorrow") {
    date.setDate(date.getDate() + 1)
  } else if (day !== "Today") {
    const today = toDay.getDay()
    const targetDay = days.indexOf(day)

    if (targetDay === -1) {
      throw new Error("Invalid day provided")
    }

    let daysToAdd = targetDay - today
    if (daysToAdd <= 0) {
      daysToAdd += 7
    }

    date.setDate(date.getDate() + daysToAdd)
  }

  date.setHours(hour)
  date.setMinutes(minute)
  if (period === "PM" && date.getHours() < 12) {
    date.setHours(date.getHours() + 12)
  }
  return date
}

const concatenateAndParseInt = (input: any[]) => Number(input.join(""))

const typeOneParser = A.sequenceOf([
  A.choice([A.str("Today"), A.str("Tomorrow"), ...days.map((d) => A.str(d))]),
  A.str(", "),
  A.exactly(2)(A.digit).map(concatenateAndParseInt),
  A.str(":"),
  A.exactly(2)(A.digit).map(concatenateAndParseInt),
  A.str(" "),
  A.choice([A.str("AM"), A.str("PM")]),
]).map(([day, , hour, , minute, , period]) => {
  return parseDayTimeToDate(day, hour, minute, period)
})

const typeTwoParser = A.sequenceOf([A.str("Next"), A.str(" "), A.choice(days.map(A.str))]).map(([, , day]) => {
  const now = new Date()
  const currentDayIndex = now.getDay()
  const targetDayIndex = days.indexOf(day)

  const date = parseDayTimeToDate(day, 0, 0, "PM")

  if (targetDayIndex > currentDayIndex) {
    date.setDate(date.getDate() + 7)
  }

  return date
})

const typeThreeParser = A.sequenceOf([
  A.choice(days.map((d) => A.str(d.slice(0, 3)))),
  A.str(" "),
  A.exactly(2)(A.digit).map(concatenateAndParseInt),
  A.str("-"),
  A.exactly(2)(A.digit).map(concatenateAndParseInt),
  A.str("-"),
  A.exactly(4)(A.digit).map(concatenateAndParseInt),
]).map(([, , day, , month, , year]) => {
  // FIX: this handles poorly when the next day that corresponds is technically within this week
  return new Date(year, month - 1, day)
})

const dateParser = A.choice([typeOneParser, typeTwoParser, typeThreeParser])

function parseDate(date: string) {
  const res = dateParser.run(date)
  if (res.isError) {
    throw new Error(res.error)
  } else {
    return res.result
  }
}

function estimateTimeUntil(futureDate: Date) {
  const now = new Date()
  const diffInMinutes = futureDate.getMinutes() - now.getMinutes()
  const diffInHours = futureDate.getHours() - now.getHours()
  const diffInDays = futureDate.getDate() - now.getDate()
  const diffInWeeks = Math.floor(diffInDays / 7)

  if (diffInWeeks > 1) {
    return `In ${diffInWeeks} weeks`
  } else if (diffInDays > 1) {
    return `In ${diffInDays} days`
  } else if (diffInDays === 1) {
    return `Tomorrow`
  } else if (diffInHours > 0) {
    return `In ${diffInHours} hours`
  } else if (diffInMinutes > 0) {
    return `In ${diffInMinutes} minutes`
  } else {
    return "Any moment now"
  }
}

export { parseDate, estimateTimeUntil }

// Example usage:
// const futureDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days from now
// console.log(estimateTimeUntil(futureDate)) // Output: "in 3 days"

// const dates = [
//   "Today, 04:00 PM",
//   "Tomorrow, 05:30 PM",
//   "Saturday, 03:25 AM",
//   "Sunday, 07:25 PM",
//   "Next Wednesday",
//   "Next Friday",
//   "Fri 23-08-2024",
//   "Tue 23-01-2025",
// ].map((d) => d.trim())

// dates.forEach((d) => {
//   console.log(
//     `${d} :\n${JSON.stringify(dateParser.run(d))}\n${estimateTimeUntil(
//       parseDate(d)
//     )}`
//   )
// })
