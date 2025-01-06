import * as fs from "fs/promises"

const templateScript = await fs.readFile("./templateScript.js", "utf8")
const currentScript = await fs.readFile("./script.user.js", "utf8")
const code = await fs.readFile("./index.js", "utf8")
const versionRegex = /@version(\s+)\d+\.(\d+)/

const version = currentScript.match(versionRegex)
if (version === undefined || version === null) {
  throw new Error("Version not found")
}
const bump = process.argv.includes("--bump")
const newVersionTag = `@version${version[1]}1.${
  Number(version[2]) + (bump ? 1 : 0)
}`

let newScript = templateScript
  .replace("// CODE HERE", code)
  .replace(versionRegex, newVersionTag)

fs.writeFile("./script.user.js", newScript)
fs.unlink("./index.js")
