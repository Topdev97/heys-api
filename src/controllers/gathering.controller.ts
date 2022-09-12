import db from '../db'
const Gathering = db.gathering
const Op = db.Sequelize.Op

// Create and Save a new Gathering
async function create(req, res) {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  // Create a Gathering
  const gathering = {
    name: req.body.name,
    slug: req.body.slug,
    description: req.body.description,
    upvotes: req.body.upvotes,
    owners: req.body.owners,
    customisation: req.body.customisation,
  }

  // Save Gathering in the database
  await Gathering.create(gathering)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Gathering.',
      })
    })
}
// Retrieve all Gathering from the database.
async function findAll(req, res) {
  await Gathering.findAll({ order: [['updatedAt', 'DESC']], limit: 10 })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Gathering.',
      })
    })
}
// Find a single Gathering with an id
async function findOne(req, res) {
  const id = req.params.id

  await Gathering.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `Cannot find Gathering with id=${id}.`,
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Gathering with id=' + id,
      })
    })
}
// Update a Gathering by the id in the request
async function update(req, res) {
  const id = req.params.id

  await Gathering.update(req.body, {
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Gathering was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Gathering with id=${id}. Maybe Gathering was not found or req.body is empty!`,
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Gathering with id=' + id,
      })
    })
}
// Delete a Gathering with the specified id in the request
async function deleteOne(req, res) {
  const id = req.params.id

  await Gathering.destroy({
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Gathering was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Gathering with id=${id}. Maybe Gathering was not found!`,
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Gathering with id=' + id,
      })
    })
}
// Delete all Gathering from the database.
async function deleteAll(req, res) {
  await Gathering.destroy({
    where: {},
    truncate: false,
  })
    .then(nums => {
      res.send({ message: `${nums} Gathering were deleted successfully!` })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all gathering.',
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
