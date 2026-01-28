import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Layout from "../components/Layout"
import "../styles/global.css"

export default function CategoryTemplate({ pageContext }) {
  const { category } = pageContext

  // Query all MDX posts and filter by category
  const data = useStaticQuery(graphql`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
            title
            description
            category
            publishDate
            author
          }
        }
      }
    }
  `)

  const posts = data.allMdx.nodes.filter((post) => post.frontmatter.category === category)

  // Get all categories for sidebar
  const allCategories = [...new Set(data.allMdx.nodes.map((p) => p.frontmatter.category).filter(Boolean))]

  return (
    <Layout title={category}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-8">
              <h2 className="text-lg font-semibold text-sun-dark mb-4">Categories</h2>
              <nav className="space-y-2">
                {allCategories.map((cat) => {
                  const catSlug = cat.toLowerCase().replace(/\s+/g, "-")
                  const isActive = cat === category
                  return (
                    <Link
                      key={cat}
                      to={`/category/${catSlug}`}
                      className={`block px-3 py-2 rounded transition ${
                        isActive
                          ? "bg-sun-gold text-sun-dark font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </Link>
                  )
                })}
              </nav>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/categories"
                  className="text-sm text-gray-500 hover:text-sun-dark transition"
                >
                  ← All Categories
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <h1 className="text-4xl font-bold text-sun-dark mb-2">{category}</h1>
            <p className="text-gray-600 mb-8">{posts.length} interactive{posts.length !== 1 ? "s" : ""}</p>

            <div className="space-y-6">
              {posts.map((post) => {
                const { slug, title, description, author, publishDate } = post.frontmatter
                return (
                  <article
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
                  >
                    <h2 className="text-2xl font-bold mb-2">
                      <Link
                        to={`/view/${slug}`}
                        className="text-sun-dark hover:text-sun-gold transition"
                      >
                        {title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span>{author}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(publishDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          to={`/view/${slug}`}
                          className="px-4 py-2 bg-sun-gold text-sun-dark font-medium rounded hover:bg-opacity-90 transition text-sm"
                        >
                          View
                        </Link>
                        <Link
                          to={`/edit/${slug}`}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition text-sm"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}

              {posts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p>No interactives in this category yet.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ pageContext }) => (
  <>
    <title>{pageContext.category} | Colorado Sun Extras</title>
    <meta
      name="description"
      content={`Interactive data visualizations in the ${pageContext.category} category`}
    />
  </>
)
