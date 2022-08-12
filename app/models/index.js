const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.gathering = require("./gathering.model.js")(sequelize, Sequelize);
db.document = require("./document.model.js")(sequelize, Sequelize);
db.comment = require("./comment.model.js")(sequelize, Sequelize);
db.tag = require("./tag.model.js")(sequelize, Sequelize);

// //one-to-many
// db.gathering.hasMany(db.document, {as: "documents"})
// db.document.belongsTo(db.gathering, { foreignKey: "gathering_id",
// as: "gathering",})
// //one-to-many
// db.document.hasMany(db.comment, { as: "comments" })
// db.comment.belongsTo(db.document, { foreignKey: "document_id",
// as: "document",})
//many-to-many
// db.document.belongsToMany(db.tag, { through: "document_tag", as: "tags", foreignKey: "document_id" });
// db.tag.belongsToMany(db.document, { through: "document_tag", as: "documents", foreignKey: "tag_id" });

//one-to-many
db.gathering.hasMany(db.document);
db.document.belongsTo(db.gathering);
//one-to-many
db.document.hasMany(db.comment);
db.comment.belongsTo(db.document);
// many-to-many
db.document.belongsToMany(db.tag, {
  through: "document_tag",
  as: "tag",
  foreignKey: "document_id",
});
db.tag.belongsToMany(db.document, {
  through: "document_tag",
  as: "documents",
  foreignKey: "tag_id",
});

module.exports = db;
