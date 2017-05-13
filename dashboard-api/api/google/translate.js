// General imports
const express = require('express')

//const cheerio = require('cheerio')

const routes = express.Router()

/**
 * Routes to get
 *
 */
routes.get('/google/translate', (req, res) => {

	res.json('Text that wasn\'t really translated')
})

module.exports = routes