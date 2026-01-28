import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import "../styles/global.css"

export default function Home({ data }) {
  const posts = data.allMdx.nodes

  return (
    <Layout title="Home">
      <div className="bg-gradient-to-r from-sun-dark to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Colorado Sun Extras</h1>
          <p className="text-xl text-gray-300">Interactive data visualizations and extras</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="space-y-6">
          {posts.map((post) => {
            const { slug, title, description, category, publishDate } = post.frontmatter
            return (
              <div key={post.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex gap-4 items-center">
                  <div className="text-sm text-gray-500">
                    <p>Published: {new Date(publishDate).toLocaleDateString()}</p>
                    <p>Category: {category}</p>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <Link
                      to={`/view/${slug}`}
                      className="px-4 py-2 bg-sun-gold text-sun-dark font-medium rounded hover:bg-opacity-90 transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${slug}`}
                      className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ data }) => {
  const { siteUrl, defaultImage, title, description } = data.site.siteMetadata
  const fullImageUrl = `${siteUrl}${defaultImage}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={title} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        siteUrl
        defaultImage
      }
    }
    allMdx(sort: { frontmatter: { publishDate: DESC } }) {
      nodes {
        id
        frontmatter {
          slug
          title
          description
          category
          publishDate
        }
      }
    }
  }
`