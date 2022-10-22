/** Destruct environment variable to get database configuration */
const {
    DB_USERNAME = "postgres",
        DB_PASSWORD = "riowdyws27",
        DB_HOST = "localhost",
        DB_NAME = "mobil",
} = process.env;

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: `${DB_NAME}`,
        host: DB_HOST,
        dialect: "postgres",
    },
    test: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: `${DB_NAME}_test`,
        host: DB_HOST,
        dialect: "postgres",
    },
    production: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: `${DB_NAME}_production`,
        host: DB_HOST,
        dialect: "postgres",
    },
};