module.exports = app => {
  const tag = require('../controllers/tag.controller.ts')
  const router = require('express').Router()
  // Create a new tag
  // router.post('/', tag.create)
  // Retrieve all tag by docId
  // router.get('/doc/:docId', tag.findByDocId)
  // Retrieve all tag by gatheringid
  router.get('/gathering/:gatheringId', tag.findByGatheringId)

  app.use('/api/tag', router)
}
