import db from '../db'
const Doc = db.doc
const Op = db.Sequelize.Op
// Create and Save a new Doc
async function create(req, res) {
  // Validate request
  if (!req.body.gatheringId) {
    res.status(400).send({
      message: 'Gathering id needed',
    })
    return
  }

  // Create a Doc
  const docData = {
    gatheringId: req.body.gatheringId,

    url: req.body.url,
    docId: req.body.docId,
    description: req.body.description,
    tags: req.body.tags,
  }

  // TODO: calculate
  // title: req.body.title,
  // slug: req.body.slug,
  // docUid: req.body.docUid,
  // docType: req.body.docType,

  // permissions: req.body.permissions,
  // meta: req.body.meta,
  // payments: req.body.payments,

  // contentDate: req.body.contentDate,
  // content: req.body.content,
  // newDocObj.docUid = regex(newUrl)

  // if (newUrl.includes('/document/')) newDocObj.docType = 0
  // if (newUrl.includes('/spreadsheets/')) newDocObj.docType = 1
  // if (newUrl.includes('/presentation/')) newDocObj.docType = 2

  // Save Doc in the database
  await Doc.create({
    title: 'test',
    slug: 'test',
    docUid: 'test',
    docType: 0,
    ...docData,
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Doc.',
      })
    })
}
// Retrieve all Doc from the database.
async function findAll(req, res) {
  const gatheringId = req.params.gatheringId
  await Doc.findAll({
    order: [['updatedAt', 'DESC']],
    where: { gatheringId },
    limit: 10,
  })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Doc.',
      })
    })
}
// Find a single Doc with an id
async function findOne(req, res) {
  const id = req.params.id

  await Doc.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Doc with id=${id}.`,
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Doc with id=' + id,
      })
    })
}
// Update a Doc by the id in the request
async function update(req, res) {
  const id = req.params.id

  await Doc.update(req.body, {
    where: { id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Doc was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Doc with id=${id}. Maybe Doc was not found or req.body is empty!`,
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Doc with id=' + id,
      })
    })
}
// Delete a Doc with the specified id in the request
async function deleteOne(req, res) {
  const id = req.params.id

  await Doc.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Doc was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Doc with id=${id}. Maybe Doc was not found!`,
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Doc with id=' + id,
      })
    })
}
// Delete all Doc from the database.
async function deleteAll(req, res) {
  await Doc.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.send({ message: `${nums} Doc were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Doc.',
      })
    })
}

module.exports = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteAll,
}
