const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query all MDX posts from frontmatter
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
            title
            description
            htmlFile
            category
            publishDate
            author
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX files", result.errors)
    return
  }

  const posts = result.data.allMdx.nodes

  // Create view pages for each MDX post
  const postTemplate = path.resolve("./src/templates/post.js")
  const shareTemplate = path.resolve("./src/templates/share.js")
  
  posts.forEach((post) => {
    const { slug } = post.frontmatter
    
    // Create view page
    createPage({
      path: `/view/${slug}`,
      component: `${postTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        slug,
      },
    })

    // Create share page (minimal version without edit/metadata)
    createPage({
      path: `/share/${slug}`,
      component: `${shareTemplate}?__contentFilePath=${post.internal.contentFilePath}`,
      context: {
        slug,
      },
    })

    // Create edit pages for each post
    createPage({
      path: `/edit/${slug}`,
      component: path.resolve("./src/templates/edit.js"),
      context: {
        slug,
        ...post.frontmatter,
      },
    })
  })

  // Get unique categories from MDX frontmatter
  const categories = [...new Set(posts.map((p) => p.frontmatter.category).filter(Boolean))]

  // Create category pages
  categories.forEach((category) => {
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-")
    createPage({
      path: `/category/${categorySlug}`,
      component: path.resolve("./src/templates/category.js"),
      context: {
        category,
        categorySlug,
      },
    })
  })

  // Create category index page
  createPage({
    path: `/categories`,
    component: path.resolve("./src/templates/category-index.js"),
    context: {
      categories: categories.map((cat) => ({
        name: cat,
        slug: cat.toLowerCase().replace(/\s+/g, "-"),
        count: posts.filter((p) => p.frontmatter.category === cat).length,
      })),
    },
  })
}

// Serve static files from /static/html-files during development
exports.onCreateDevServer = ({ app }) => {
  const express = require("express")
  app.use("/html-files", express.static(path.join(__dirname, "static/html-files")))
}
