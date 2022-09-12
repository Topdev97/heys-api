const env = process.env

const dbConfig = {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME || 'heystack_db',
    port: env.DB_PORT || 5432,
    dialect: env.DB_TYPE || 'postgres',
}

export default dbConfig