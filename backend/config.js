require('dotenv').config()

module.exports = {
    env: process.env.ENV,
    port: process.env.PORT,
    csv: process.env.CSV,
    db: process.env.DB,
}