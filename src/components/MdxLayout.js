import React from "react"
import { MDXProvider } from "@mdx-js/react"
import HtmlEmbed from "./HtmlEmbed"

const components = {
  HtmlEmbed,
}

export default function MdxLayout({ children }) {
  return (
    <MDXProvider components={components}>
      {children}
    </MDXProvider>
  )
}
