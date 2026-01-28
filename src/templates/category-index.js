import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import "../styles/global.css"

export default function CategoryIndexTemplate({ pageContext }) {
  const { categories } = pageContext

  // Category icons/colors mapping
  const categoryStyles = {
    Elections: { emoji: "🗳️", color: "bg-blue-100 border-blue-300" },
    Newsletters: { emoji: "✉️", color: "bg-blue-100 border-blue-300" },
    Economy: { emoji: "📊", color: "bg-green-100 border-green-300" },
    Environment: { emoji: "🌿", color: "bg-emerald-100 border-emerald-300" },
    Health: { emoji: "🏥", color: "bg-red-100 border-red-300" },
    Education: { emoji: "📚", color: "bg-purple-100 border-purple-300" },
    Sports: { emoji: "⚽", color: "bg-orange-100 border-orange-300" },
    default: { emoji: "📰", color: "bg-gray-100 border-gray-300" },
  }

  return (
    <Layout title="Categories">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-sun-dark mb-4">Categories</h1>
          <p className="text-xl text-gray-600">
            Browse interactive visualizations by topic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const style = categoryStyles[category.name] || categoryStyles.default
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className={`block p-6 rounded-xl border-2 ${style.color} hover:shadow-lg transition transform hover:-translate-y-1`}
              >
                <div className="text-4xl mb-4">{style.emoji}</div>
                <h2 className="text-2xl font-bold text-sun-dark mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600">
                  {category.count} interactive{category.count !== 1 ? "s" : ""}
                </p>
              </Link>
            )
          })}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No categories yet.</p>
            <p className="mt-2">
              Add some entries to{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">src/data/files.json</code>{" "}
              to get started.
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const Head = () => (
  <>
    <title>Categories | Colorado Sun Extras</title>
    <meta
      name="description"
      content="Browse interactive data visualizations by category"
    />
  </>
)
