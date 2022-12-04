const os = require('os')
const polka = require('polka')
const serve = require('sirv')
const cors = require('cors')

const {
  NODE_ENV,
  PORT
} = process.env

const app = polka()

app
  .use(cors())

// Routes
/*
for (const controller of controllers) {
  const layers = controller.requisites.reduce((a, r) => a.concat(modules[r](controller)), [])

  app[controller.method]('/api' + controller.route, ...layers, controller.action)
}
app.all('/api', (req, res) => res.send(200))
*/

if (NODE_ENV !== 'development') {
  app.use(serve('build/', {
    single: true,
    ignores: '/api/*'
  }))
}

const server = app.listen(PORT, () => {
  const {
    port
  } = server.address()

  const interfaces = Object.values(os.networkInterfaces()).flat()

  console.info('Server online listening at http://%s:%s', interfaces.find((i) => !i.internal && i.family === 'IPv4').address, port)
})
