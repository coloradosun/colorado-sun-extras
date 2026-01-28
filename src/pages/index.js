import React, { useState } from "react"
import { graphql } from "gatsby"
import "./index.css"

export default function Home({ data }) {
  const files = data.allFile.edges
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedContent, setSelectedContent] = useState("")
  const [loading, setLoading] = useState(false)

  const loadFile = async (filename) => {
    try {
      setLoading(true)
      setSelectedFile(filename)
      const response = await fetch(`/html-files/${filename}`)
      const content = await response.text()
      setSelectedContent(content)
      setLoading(false)
    } catch (error) {
      console.error("Error loading file:", error)
      setLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const filename = e.target.value
    if (filename) {
      loadFile(filename)
    }
  }

  return (
    <>
      <div className="container">
        <header className="header">
          <h1>The Colorado Sun Extras</h1>
          <p className="subtitle">Interactive extras and data visualizations</p>
        </header>
        
        <div className="controlPanel">
          <label htmlFor="file-select">Select an interactive:</label>
          <select 
            id="file-select" 
            value={selectedFile || ""} 
            onChange={handleFileChange}
            className="dropdown"
          >
            <option value="">-- Choose an interactive --</option>
            {files.map(({ node }) => (
              <option key={node.name} value={node.name + node.ext}>
                {node.name}
              </option>
            ))}
          </select>
        </div>

        <div className="viewerContainer">
          {loading ? (
            <p className="loading">Loading...</p>
          ) : selectedContent ? (
            <iframe
              srcDoc={selectedContent}
              className="iframe"
              title={selectedFile}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          ) : (
            <p className="placeholder">Select an interactive to view</p>
          )}
        </div>

        <footer className="info">
          <p><strong>The Colorado Sun Extras</strong></p>
          <p>Interactive data visualizations and multimedia extras from <a href="https://coloradosun.com" target="_blank" rel="noopener noreferrer">The Colorado Sun</a></p>
          <p>Place your self-contained HTML files in the <code>public/html-files</code> directory</p>
        </footer>
      </div>
    </>
  )
}

export const Head = () => (
  <>
    <title>The Colorado Sun Extras</title>
    <meta name="description" content="Interactive extras and data visualizations from The Colorado Sun" />
    <meta property="og:title" content="The Colorado Sun Extras" />
    <meta property="og:description" content="Interactive extras and data visualizations from The Colorado Sun" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="The Colorado Sun" />
  </>
)

export const query = graphql`
  query {
    allFile(filter: { sourceInstanceName: { eq: "html-files" }, extension: { eq: "html" } }) {
      edges {
        node {
          name
          ext
          sourceInstanceName
        }
      }
    }
  }
`
