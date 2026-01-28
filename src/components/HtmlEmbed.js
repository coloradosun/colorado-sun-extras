import React from "react"

export default function HtmlEmbed({ file, height = "600px", title }) {
  return (
    <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <iframe
        src={`/html-files/${file}`}
        title={title || file}
        style={{ height }}
        className="w-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  )
}
