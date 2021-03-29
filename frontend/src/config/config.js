
require('dotenv').config()

console.log(process.env)

export const environment = {
    api: process.env.REACT_APP_API,
};