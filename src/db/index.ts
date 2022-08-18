import dbConfig from "../config/db.config";

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
  }
);

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.gathering = require("../models/gathering.model.ts")(sequelize, Sequelize);
db.document = require("../models/document.model.ts")(sequelize, Sequelize);
db.comment = require("../models/comment.model.ts")(sequelize, Sequelize);
db.tag = require("../models/tag.model.ts")(sequelize, Sequelize);

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

export default db;
