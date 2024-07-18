import { estimateTimeUntil, parseDate } from "./parseDates"

function main() {
  const elements = document.querySelectorAll<HTMLElement>(
    ".SimklTVProfilePosterEpisodeText"
  )

  console.log(elements)

  elements.forEach((element) => {
    try {
      const date = parseDate(element.innerText)
      const readableDelay = estimateTimeUntil(date)
      element.innerText = readableDelay
    } catch (error) {}
  })
}

setInterval(main, 1000)
