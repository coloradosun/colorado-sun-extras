const fs = require("fs")
const path = require("path")

const htmlDir = path.join(__dirname, "../public")
const manifestPath = path.join(htmlDir, "manifest.json")

// Create directory if it doesn't exist
if (!fs.existsSync(htmlDir)) {
  fs.mkdirSync(htmlDir, { recursive: true })
}

// Get all HTML files in the directory (not subdirectories)
const files = fs.readdirSync(htmlDir)
  .filter(file => file.endsWith(".html") && !file.includes("index"))
  .sort()

const manifest = {
  generated: new Date().toISOString(),
  count: files.length,
  files: files
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
console.log(`✓ Generated manifest with ${files.length} HTML file(s)`)
