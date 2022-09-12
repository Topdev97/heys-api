import db from '../db'
const Comment = db.comment
const Op = db.Sequelize.Op
// Create and Save a new Gathering
async function create(req, res) {
  // Validate request
  if (!req.body.text) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  // Create a Comment
  const comment = {
    id: req.body.id,
    text: req.body.text,
    nickname: req.body.nickname,
    emailAddress: req.body.emailAddress,
    upvotes: req.body.upvotes,
    replyTo: req.body.replyTo,
  }

  // Save Comment in the database
  await Comment.create(comment)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Comment.',
      })
    })
}
// Retrieve all Comment from the database.
async function findAll(req, res) {
  const documentId = req.query.documentId
  const condition = documentId ? { documentId: `${documentId}` } : null
  await Comment.findAll({ order: [['upvotes', 'DESC']], where: condition, limit: 10 })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Comment.',
      })
    })
}

// Delete a Comment with the specified id in the request
async function deleteOne(req, res) {
  const id = req.params.id

  await Comment.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Comment was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`,
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Comment with id=' + id,
      })
    })
}
// Delete all Comment from the database.
async function deleteAll(req, res) {
  await Comment.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.send({ message: `${nums} Comment were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Comment.',
      })
    })
}

module.exports = {
  create,
  findAll,
  deleteOne,
  deleteAll,
}
