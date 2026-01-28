import React from "react"

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Page not found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <a href="/">Go back home</a>
    </div>
  )
}

export const Head = () => <title>Not found</title>
