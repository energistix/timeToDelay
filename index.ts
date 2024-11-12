import { estimateTimeUntil, parseDate } from "./parseDates"

const cfg = {
  key: "search_url",
  defaultUrl: "https://google.com/search?q=%s",

  get searchUrl() {
    return localStorage.getItem(this.key) ?? this.defaultUrl
  },

  set searchUrl(url) {
    localStorage.setItem(this.key, url)
  },

  promptForSearchUrl() {
    const url = prompt("Enter search URL (use %s where the search term should go):", this.searchUrl)
    if (url) {
      this.searchUrl = url
      alert("Search URL updated.")
      // reload the page to apply the changes
      location.reload()
    }
  },
}

GM_registerMenuCommand("Set search URL", function () {
  cfg.promptForSearchUrl()
})

function main() {
  const elements = document.querySelectorAll<HTMLElement>(".SimklTVProfilePosterEpisodeText")

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

  const titleElement = document.querySelector("#bigtext-id1 > h2") as HTMLDivElement | null
  if (titleElement) {
    // replace the element by a link to a search of it's inner text
    const searchUrlWithQuery = cfg.searchUrl.replace("%s", titleElement.innerText)

    const link = document.createElement("a")
    link.href = searchUrlWithQuery

    //get the main part of the domain name of the url
    const domain = searchUrlWithQuery.match(/https?:\/\/([^/]+)/)?.[1] ?? "unknown"

    link.target = "_blank"
    link.rel = "noopener noreferrer"
    link.className = "simkl-search-link"
    // make sure the text stays white, and is a bit bigger than default
    link.style.color = "white"
    link.style.fontSize = "1.2em"

    link.innerText = `Search on ${domain} for "${titleElement.innerText}"`

    titleElement.replaceWith(link)
  }
}

setInterval(main, 1000)
