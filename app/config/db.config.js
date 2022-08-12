module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "test",
  DB: "heystack_db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
