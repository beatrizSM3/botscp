
const axios = require("axios")
const dotenv = require('dotenv');
dotenv.config();

const api = axios.create(
    {
        baseURL: process.env.API_URL_PROD,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        
    }
)
module.exports = { api }
