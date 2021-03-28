require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    csv: process.env.CSV,
    db: process.env.DB,
}