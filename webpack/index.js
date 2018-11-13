import base from './common'
import development from './development'
import production from './production'


const appEnv = process.env.NODE_ENV || 'development'
let webpackConfig

if (appEnv !== 'development') {
  webpackConfig = production(base)
}
else {
  webpackConfig = development(base)
}


export default webpackConfig
