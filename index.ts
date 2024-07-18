import fancyDateToReadableDelay from "./dateConverter"

function main() {
  const elements = document.querySelectorAll<HTMLElement>(
    ".SimklTVProfilePosterEpisodeText"
  )

  console.log(elements)

  elements.forEach((element) => {
    try {
      const date = element.innerText
      console.log(date)
      const readableDelay = fancyDateToReadableDelay(date)
      element.innerText = readableDelay
    } catch (error) {}
  })
}

setInterval(main, 1000)
