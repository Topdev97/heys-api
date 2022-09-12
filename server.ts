import express from 'express'
// import morgan from "morgan"
const morgan = require('morgan')
const bodyParser = require('body-parser')
import bearerToken from 'express-bearer-token'
import errorMiddleware from './src/middlewares/error.middleware'
import swaggerUi from 'swagger-ui-express'
const swaggerDocument = require('./swagger.json')
import 'dotenv/config'

const app = express()
const port = process.env.PORT ?? 3000

const cors = require('cors')
if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )
} else {
  app.use(
    cors({
      origin: '*',
      credentials: false,
    })
  )
}

app.use(bearerToken())

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

import db from './src/db'
db.sequelize
  .sync()
  .then(() => {
    console.log('Synced db.')
  })
  .catch(err => {
    console.log('Failed to sync db: ' + err.message)
  })
app.use(morgan('tiny'))
app.get('/', async (req, res) => {
  res.send('Hello there')
})
require('./src/routes/index.routes.ts')(app)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Tasks server listening at http://localhost:${port}`)
})
