module.exports = app => {
  const gathering = require('../controllers/gathering.controller.ts')
  const router = require('express').Router()
  // Create a new Gathering
  // router.post('/', gathering.create)
  // Retrieve all Gatherings
  router.get('/', gathering.findAll)
  // Retrieve a single Gathering with id
  // router.get('/:id', gathering.findOne)
  // Update a Gathering with id
  // router.put('/:id', gathering.update)
  // Delete a Gathering with id
  // router.delete('/:id', gathering.deleteOne)
  // Create a new Gathering
  // router.delete('/', gathering.deleteAll)
  app.use('/api/gathering', router)
}
