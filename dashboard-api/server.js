const express = require('express') // the main server
const fs = require('fs')
const sqlite = require('sql.js')
const bodyParser = require('body-parser') // express tool for parsing json,html,etc
// import cors from 'cors'
const compression = require('compression') // uses compression when serving data
const mongoose = require('mongoose') // wrapper lib for mongodb that has schemas
const dotenv = require('dotenv') // reads from .env file
// Api base
const API_BASE = '/api/v1'
/*
if(process.env.NODE_ENV === 'development' || process.env.PORT === 5000) {
  // Load .env vars
  console.log('loading .env vars')
  dotenv.load();
}

// Connect to database
mongoose.connect(process.env.MONGODB_URI, function (error) {
	if (error) error(error);
	else console.log('mongo connected');
});
*/

const filebuffer = fs.readFileSync('db/usda-nnd.sqlite3');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}
//-------------------------------------------------
//-----BEGIN-PROBABLY GOING TO REMOVE------------
//------------------------------------------------
const db = new sqlite.Database(filebuffer);
const COLUMNS = [
	'carbohydrate_g',
	'protein_g',
	'fa_sat_g',
	'fa_mono_g',
	'fa_poly_g',
	'kcal',
	'description',
];

app.get('/api/food', (req, res) => {
	const param = req.query.q;

	if (!param) {
		res.json({
			error: 'Missing required parameter `q`',
		});
		return;
	}

	// WARNING: Not for production use! The following statement
	// is not protected against SQL injections.
	const r = db.exec(`
		select ${COLUMNS.join(', ')} from entries
		where description like '%${param}%'
		limit 100
	`);

	if (r[0]) {
		res.json(
			r[0].values.map((entry) => {
				const e = {};
				COLUMNS.forEach((c, idx) => {
					// combine fat columns
					if (c.match(/^fa_/)) {
						e.fat_g = e.fat_g || 0.0;
						e.fat_g = (
							parseFloat(e.fat_g, 10) + parseFloat(entry[idx], 10)
						).toFixed(2);
					} else {
						e[c] = entry[idx];
					}
				});
				return e;
			}),
		);
	} else {
		res.json([]);
	}
});
//-------------------------------------------------
//-----END-PROBABLY GOING TO REMOVE------------
//------------------------------------------------

// All API endpoints go below here

// Parser Middleware
app.use( API_BASE, bodyParser.urlencoded({ extended: true }));
app.use( API_BASE, bodyParser.json());
// app.use( API_BASE, cors()); // For allowing access from different origins

//const authenticationMiddleware = // probably some passport stuff
//app.use( API_BASE, authenticationMiddleware, require('./api/google/translate'))
app.use( API_BASE, require('./api/google/translate'))

// Setup Server
app.listen(app.get('port'), () => {
	console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
