module.exports = app => {
  require('./gathering.routes.ts')(app)
  require('./document.routes.ts')(app)
  require('./comment.routes.ts')(app)
  require('./tag.routes.ts')(app)
}
