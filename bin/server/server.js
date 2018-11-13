import webpack from 'webpack'
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import historyApiFallback from 'connect-history-api-fallback'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackConfig from '../../webpack'


const port      = 5100
const app       = express()
const compiler  = webpack(webpackConfig)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(historyApiFallback())
app.use(webpackMiddleware(compiler, webpackConfig.devServer));
app.use('/', express.static(path.resolve(__dirname, '../../site')));

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port)
})
