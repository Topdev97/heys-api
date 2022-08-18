import db from "../db";
const Tag = db.tag;
const Document = db.document;
const Gathering = db.gathering;
const Op = db.Sequelize.Op;

async function create(req, res) {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Tag
  const newTag = {
    id: req.body.id,
    title: req.body.title,
    count: req.body.count,
    // documentId: req.body.documentId
  };
  // Save Tag in the database
  Tag.findByPk(newTag.id)
    .then((tag) => {
      if (!tag) {
        Tag.create(newTag)
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while creating the new Tag.",
            });
          });
      }
      Document.findByPk(req.body.documentId).then((document) => {
        if (!document) {
          console.log("Document not found!");
          return null;
        }
        tag.addDocument(document);
        res.send({
          message: `>> added Tutorial id=${document.id} to Tag id=${tag.id} successfully`,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Tag.",
      });
    });
}

async function findByDocumentId(req, res) {
  const documentId = req.query.documentId;
  Document.findByPk(documentId, {
    include: [
      {
        model: Tag,
        as: "tag",
        attributes: ["id", "title", "count"],
        order: [["count", "DESC"]],
        // limit: 10
        // through: {
        //   attributes: [],
        // },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Tag.",
      });
    });
}

async function findByGatheringId(req, res) {
  const gatheringId = req.query.gatheringId;
  var condition = gatheringId ? { gatheringId: `${gatheringId}` } : null;
  Document.findAll({
    order: [["updatedAt", "DESC"]],
    where: condition,
    include: [
      {
        model: Tag,
        as: "tag",
        attributes: ["id", "title", "count"],
      },
    ],
    limit: 10,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Document.",
      });
    });
}

module.exports = {
  create,
  findByDocumentId,
  findByGatheringId,
};
