const db = require("../models");
const Document = db.document;
const Op = db.Sequelize.Op;
// Create and Save a new Document
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Document
  const document = {
    title: req.body.title,
    slug: req.body.slug,
    url: req.body.description,
    docUid: req.body.upvotes,
    description: req.body.owners,
    tags: req.body.customisation,
    upvotes: req.body.upvotes,
    views: req.body.views,
    readeds: req.body.readeds,
    clicks: req.body.clicks,
    permissions: req.body.permissions,
    meta: req.body.meta,
    payments: req.body.payments,
    allowNotifications: req.body.allowNotifications,
    hallOfFame: req.body.hallOfFame,
    contentDate: req.body.contentDate,
    content: req.body.content,
    spacesArr: req.body.spacesArr,
    archived: req.body.archived,
    ads: req.body.ads,
    allowForks: req.body.allowForks,
    forks: req.body.forks,
    dateNow: req.body.dateNow,
    approved: req.body.approved,
    hotScore: req.body.hotScore
  };

  // Save Document in the database
  Document.create(document)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Document.",
      });
    });
};
// Retrieve all Document from the database.
exports.findAll = (req, res) => {
  const gatheringId = req.query.gatheringId;
  var condition = gatheringId ? { gatheringId: `${gatheringId}` } : null;
  Document.findAll({ order: [['updatedAt', 'DESC']], where: condition, limit: 10,})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Document.",
      });
    });
};
// Find a single Document with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Document.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Document with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Document with id=" + id,
      });
    });
};
// Update a Document by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Document.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Document was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Document with id=${id}. Maybe Document was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Document with id=" + id,
      });
    });
};
// Delete a Document with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Document.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Document was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Document with id=${id}. Maybe Document was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Document with id=" + id,
      });
    });
};
// Delete all Document from the database.
exports.deleteAll = (req, res) => {
  Document.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Document were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Document.",
      });
    });
};