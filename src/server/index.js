import express from 'express'
import cors from 'cors'
import * as React from 'react'
import ReactDOM from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server';
import serialize from 'serialize-javascript'
import App from '../shared/App'
import routes from '../shared/routing/serverRoutes'

const app = express()
const { readFile } = require('fs/promises')

app.use(cors())
app.use(express.static('dist'))

function content(path) {
  return readFile(path, 'utf8')
}

const renderApp = (req, res, next) => {

  const activeRoute = routes.find((route) => matchPath(route.path, req.url)) || {}

  const getQuery = activeRoute.fetchInitialData
    ? activeRoute.fetchInitialData(req.path)
    : Promise.resolve()

  const getHtmlTemplate = content('./dist/index.html')
  Promise.all(
    [
      getQuery,
      getHtmlTemplate
    ]
  ).then(([data, htmlTemplate]) => {
    console.log('SSR: redering...')
    const markup = ReactDOM.renderToString(
      <StaticRouter location={req.url} >
        <App serverData={data} isSSR={true} />
      </StaticRouter>
    )

    let htmlRedered = htmlTemplate.replace('<!--initialdata-->', `<script>window.__INITIAL_DATA__ = ${serialize(data)}</script>`).replace('<!--markup-->', markup);

    res.send(htmlRedered);
  }).catch(next)
}

app.get('/popular/ruby', (req, res, next) => {
  renderApp(req, res, next)
})

app.get('*', (_req, res, next) => {
  console.log('Here return bundle')
  const getHtmlTemplate = content('./dist/index.html')
  getHtmlTemplate.then((htmlTemplate) => {
    res.send(htmlTemplate);
  }).catch(next)


})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})