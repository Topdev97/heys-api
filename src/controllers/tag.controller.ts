import db from '../db'
const Tag = db.tag
const Doc = db.doc
const Gathering = db.gathering
const Op = db.Sequelize.Op

async function create(req, res) {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }
  // Create a Tag
  const newTag = {
    id: req.body.id,
    title: req.body.title,
    count: req.body.count,
    // docId: req.body.docId
  }
  const docId = req.query.docId
  // Save Tag in the database
  Tag.findByPk(newTag.id)
    .then(tag => {
      if (!tag) {
        Tag.create(newTag)
          .then(data => {
            res.send(data)
          })
          .catch(err => {
            res.status(500).send({
              message: err.message || 'Some error occurred while creating the new Tag.',
            })
          })
      }
      Doc.findByPk(docId).then(doc => {
        if (!doc) {
          console.log('Doc not found!')
          return null
        }
        tag.addDoc(doc)
        res.send({
          message: `>> added Tutorial id=${doc.id} to Tag id=${tag.id} successfully`,
        })
      })
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Tag.',
      })
    })
}

async function findByDocId(req, res) {
  const docId = req.query.docId
  Doc.findByPk(docId, {
    include: [
      {
        model: Tag,
        as: 'tag',
        attributes: ['id', 'title', 'count'],
        order: [['count', 'DESC']],
        // limit: 10
        // through: {
        //   attributes: [],
        // },
      },
    ],
  })
    .then(data => {
      res.send(data.tag)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Tag.',
      })
    })
}

async function findByGatheringId(req, res) {
  const gatheringId = req.query.gatheringId
  const condition = gatheringId ? { gatheringId: `${gatheringId}` } : null
  Doc.findAll({
    order: [['updatedAt', 'DESC']],
    where: condition,
    include: [
      {
        model: Tag,
        as: 'tag',
        attributes: ['id', 'title', 'count'],
      },
    ],
    limit: 10,
  })
    .then(data => {
      const tagResult = []
      data.forEach(element => {
        if (!tagResult.includes(element.tag)) {
          tagResult.push(element.tag)
        }
      })
      res.send(tagResult)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Doc.',
      })
    })
}

module.exports = {
  create,
  findByDocId,
  findByGatheringId,
}
