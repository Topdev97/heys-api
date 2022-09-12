module.exports = app => {
  const tag = require('../controllers/tag.controller.ts')
  const router = require('express').Router()
  // Create a new tag
  router.post('/', tag.create)
  // Retrieve all tag by documentId
  router.get('/bydocid', tag.findByDocumentId)
  // Retrieve all tag by gatheringid
  router.get('/bygatherid', tag.findByGatheringId)

  app.use('/api/tag', router)
}
