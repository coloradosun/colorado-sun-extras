import React, { useState, useEffect } from "react"

/**
 * Parse a date that could be YYYY-MM-DD string or Date object
 * Handles timezone issues by parsing as local date
 */
function parseLocalDate(dateInput) {
  if (!dateInput) return null
  
  // If it's already a Date object
  if (dateInput instanceof Date) {
    return dateInput
  }
  
  // If it's a string in YYYY-MM-DD format
  if (typeof dateInput === 'string') {
    // Check if it's ISO format (YYYY-MM-DD)
    const isoMatch = dateInput.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (isoMatch) {
      const [, year, month, day] = isoMatch
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }
    // Fallback: try parsing as-is
    return new Date(dateInput)
  }
  
  return null
}

/**
 * ProcessedHtmlEmbed - Fetches an HTML file and processes template variables
 * 
 * Replaces:
 * - %TODAY% with formatted publishDate (e.g., "Friday, July 11, 2025")
 * - Removes %SENDER-INFO-SINGLELINE%
 */
export default function ProcessedHtmlEmbed({ file, publishDate, title }) {
  const [htmlContent, setHtmlContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!file) {
      setLoading(false)
      return
    }

    const fetchAndProcessHtml = async () => {
      try {
        const response = await fetch(`/html-files/${file}`)
        if (!response.ok) {
          throw new Error(`Failed to load HTML file: ${response.status}`)
        }
        
        let html = await response.text()
        
        // Format the publishDate as "Friday, July 11, 2025"
        if (publishDate) {
          const date = parseLocalDate(publishDate)
          if (date) {
            const formattedDate = date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            html = html.replace(/%TODAY%/g, formattedDate)
          }
        }
        
        // Remove %SENDER-INFO-SINGLELINE%
        html = html.replace(/%SENDER-INFO-SINGLELINE%/g, "")
        
        setHtmlContent(html)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchAndProcessHtml()
  }, [file, publishDate])

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  if (!htmlContent) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">No HTML file specified</div>
      </div>
    )
  }

  return (
    <iframe
      srcDoc={htmlContent}
      title={title || "HTML Content"}
      className="w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin"
    />
  )
}
