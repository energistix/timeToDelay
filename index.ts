import { estimateTimeUntil, parseDate } from "./parseDates"

function main() {
  const elements = document.querySelectorAll<HTMLElement>(
    ".SimklTVProfilePosterEpisodeText"
  )

  elements.forEach((element) => {
    try {
      let date: Date | null = null

      if (element.dataset.date) {
        date = new Date(element.dataset.date)
      }
      if (date === null) {
        date = parseDate(element.innerText)
        element.dataset.date = date.toISOString()
      }

      const readableDelay = estimateTimeUntil(date)
      element.innerText = readableDelay
    } catch (error) {}
  })
}

setInterval(main, 1000)
