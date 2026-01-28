import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { Button } from "react-aria-components"
import ProcessedHtmlEmbed from "../components/ProcessedHtmlEmbed"
import "../styles/global.css"

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

// Sidebar toggle icon - modern panel layout icon
const SidebarIcon = ({ isOpen }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
    <path strokeWidth={2} d="M9 3v18" />
    {isOpen && (
      <path strokeLinecap="round" strokeWidth={2} d="M14 9l3 3-3 3" />
    )}
    {!isOpen && (
      <path strokeLinecap="round" strokeWidth={2} d="M17 9l-3 3 3 3" />
    )}
  </svg>
)

// Copy icon
const CopyIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2" strokeWidth={2} />
    <path strokeWidth={2} d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

// Check icon for copy confirmation
const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

// Custom components for MDX - we'll handle HtmlEmbed separately in the layout
const mdxComponents = {}

export default function PostTemplate({ data, children }) {
  const { frontmatter } = data.mdx
  const { siteUrl } = data.site.siteMetadata
  const { title, description, htmlFile, category, publishDate, author, slug } = frontmatter
  const [isMetadataOpen, setIsMetadataOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [copied, setCopied] = useState(false)

  // Generate share URL using siteUrl from config
  const shareUrl = `${siteUrl}/share/${slug}/`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Nav Bar */}
      <header className="bg-sun-dark text-white py-3 px-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onPress={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/10 rounded transition"
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <SidebarIcon isOpen={isSidebarOpen} />
            </Button>
            <Link to="/" className="hover:opacity-80 transition">
              {/* Logo - replace src with your logo file */}
              <img 
                src="/images/logo.png" 
                alt="Colorado Sun Extras" 
                className="h-8 min-w-[200px] object-contain object-left"
                onError={(e) => {
                  // Fallback to text if logo not found
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'block'
                }}
              />
              <span className="text-xl font-bold hidden">Colorado Sun Extras</span>
            </Link>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link to="/" className="hover:text-sun-gold transition">Home</Link>
            <Link to="/categories" className="hover:text-sun-gold transition">Categories</Link>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Slides off screen */}
        <aside 
          className={`absolute inset-y-0 left-0 z-10 w-96 bg-gray-50 border-r border-gray-200 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-500 mb-4">
              <Link to="/" className="hover:text-sun-gold">Home</Link>
              <span className="mx-1">/</span>
              <Link 
                to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`} 
                className="hover:text-sun-gold"
              >
                {category}
              </Link>
            </nav>

            {/* Title & Description */}
            <h1 className="text-2xl font-bold text-sun-dark mb-3">{title}</h1>
            <p className="text-gray-600 text-sm mb-4">{description}</p>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-4">
              <Link
                to={`/edit/${slug}`}
                className="px-3 py-1.5 bg-sun-dark text-white text-sm rounded hover:bg-opacity-90 transition"
              >
                Edit
              </Link>
            </div>

            {/* Share URL */}
            <div className="mb-6">
              <label className="block text-xs text-gray-500 mb-1">Share URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="flex-1 px-2 py-1.5 text-xs bg-white border border-gray-200 rounded font-mono text-gray-600 truncate"
                  onClick={(e) => e.target.select()}
                />
                <Button
                  onPress={handleCopy}
                  className={`px-2 py-1.5 text-sm rounded transition flex items-center gap-1 ${
                    copied 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
                </Button>
              </div>
            </div>

            {/* Collapsible Metadata */}
            <div className="mb-6">
              <Button
                onPress={() => setIsMetadataOpen(!isMetadataOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition text-left text-sm"
              >
                <span className="font-medium text-sun-dark">
                  {isMetadataOpen ? "▼" : "▶"} Metadata
                </span>
              </Button>
              {isMetadataOpen && (
                <div className="mt-2 bg-white border border-gray-200 rounded-lg p-4">
                  <dl className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Author</dt>
                      <dd className="text-gray-900">{author}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Published</dt>
                      <dd className="text-gray-900">
                        {parseLocalDate(publishDate)?.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Category</dt>
                      <dd className="text-gray-900">{category}</dd>
                    </div>
                    {htmlFile && (
                      <div className="flex justify-between">
                        <dt className="text-gray-500">File</dt>
                        <dd className="text-gray-900 font-mono text-xs">{htmlFile}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>

            {/* MDX Content (excluding HtmlEmbed) */}
            <div className="prose prose-sm max-w-none post-content">
              <MDXProvider components={mdxComponents}>
                {children}
              </MDXProvider>
            </div>
          </div>
        </aside>

        {/* Right Content - Full Height HTML Embed */}
        <main className={`flex-1 bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-96" : "ml-0"
        }`}>
          <ProcessedHtmlEmbed 
            file={htmlFile} 
            publishDate={publishDate} 
            title={title} 
          />
        </main>
      </div>
    </div>
  )
}

export const Head = ({ data }) => (
  <>
    <title>{data.mdx.frontmatter.title} | Colorado Sun Extras</title>
    <meta name="description" content={data.mdx.frontmatter.description} />
  </>
)

export const query = graphql`
  query PostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        slug
        description
        category
        publishDate
        author
        htmlFile
      }
    }
  }
`
