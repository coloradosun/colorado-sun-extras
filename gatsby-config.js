module.exports = {
  siteMetadata: {
    title: "The Colorado Sun Extras",
    description: "Interactive extras and data visualizations from The Colorado Sun",
    siteUrl: "https://extras.coloradosun.com",
  },
  pathPrefix: "",
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `html-files`,
        path: `${__dirname}/src/html-files`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-json`,
  ],
}
