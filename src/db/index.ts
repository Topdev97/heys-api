import dbConfig from '../config/db.config'

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false,
})

const db: any = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.gathering = require('../models/gathering.model.ts')(sequelize, Sequelize)
db.doc = require('../models/doc.model.ts')(sequelize, Sequelize)
db.comment = require('../models/comment.model.ts')(sequelize, Sequelize)
db.tag = require('../models/tag.model.ts')(sequelize, Sequelize)

db.gathering.hasMany(db.doc)
db.doc.belongsTo(db.gathering)
//one-to-many
db.doc.hasMany(db.comment)
db.comment.belongsTo(db.doc)
// many-to-many
/*
db.doc.belongsToMany(db.tag, {
  through: 'doc_tag',
  as: 'tag',
  foreignKey: 'doc_id',
})
db.tag.belongsToMany(db.doc, {
  through: 'doc_tag',
  as: 'docs',
  foreignKey: 'tag_id',
})
*/

export default db
