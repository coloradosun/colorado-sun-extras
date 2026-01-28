import React, { useState, useCallback } from "react"
import { Link } from "gatsby"
import { Button } from "react-aria-components"
import Layout from "../components/Layout"
import "../styles/global.css"

export default function EditTemplate({ pageContext }) {
  const { title, description, htmlFile, category, publishDate, author, slug } = pageContext
  
  // Sample MDX content - in production this would come from the actual file
  const [content, setContent] = useState(`---
title: ${title}
slug: ${slug}
description: ${description}
category: ${category}
publishDate: ${publishDate}
author: ${author}
htmlFile: ${htmlFile || ""}
---

# ${title}

${description}

## Interactive Content

<HtmlEmbed file="${htmlFile || ""}" height="600px" />

## Notes

Add your content here...
`)

  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = useCallback(async () => {
    setIsSaving(true)
    // Simulate save - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert("Changes saved! (Demo only - no actual file write)")
  }, [])

  return (
    <Layout title={`Edit: ${title}`}>
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Editor Panel */}
        <div className={`flex-1 flex flex-col ${isPreviewOpen ? "w-1/2" : "w-full"} transition-all`}>
          {/* Toolbar */}
          <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to={`/view/${slug}`}
                className="text-gray-600 hover:text-sun-dark transition"
              >
                ← Back to View
              </Link>
              <h1 className="text-lg font-semibold text-sun-dark">
                Editing: {title}
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onPress={() => setIsPreviewOpen(!isPreviewOpen)}
                className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm"
              >
                {isPreviewOpen ? "Hide Preview" : "Show Preview"}
              </Button>
              <Button
                onPress={handleSave}
                isDisabled={isSaving}
                className="px-4 py-1.5 bg-sun-gold text-sun-dark font-medium rounded hover:bg-opacity-90 transition text-sm disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 p-4 bg-gray-50">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full font-mono text-sm p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-sun-gold focus:border-transparent"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Preview Panel (Slideout) */}
        {isPreviewOpen && (
          <div className="w-1/2 border-l border-gray-200 flex flex-col bg-white">
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-3">
              <h2 className="text-lg font-semibold text-sun-dark">Preview</h2>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div className="prose max-w-none">
                <h1>{title}</h1>
                <p className="text-gray-600">{description}</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded p-4 my-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Full MDX preview requires server-side rendering. 
                    This is a simplified preview showing metadata and embedded content.
                  </p>
                </div>

                {/* Embedded HTML Preview */}
                {htmlFile && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden my-6">
                    <iframe
                      src={`/html-files/${htmlFile}`}
                      title={title}
                      className="w-full h-[400px] border-0"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const Head = ({ pageContext }) => (
  <>
    <title>Edit: {pageContext.title} | Colorado Sun Extras</title>
    <meta name="robots" content="noindex" />
  </>
)
