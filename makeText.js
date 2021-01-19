/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function generateText(text) {
	let mm = new markov.MarkovMachine(text);
	console.log(mm.makeText());
}

function makeFileText(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(`Cannot read file: ${path} (${err})`);
			process.exit(1);
		} else {
			generateText(data);
		}
	});
}

async function makeURLText(url) {
	try {
		let resp = await axios.get(url);
		generateText(resp.data);
	} catch (err) {
		console.error(`Cannot read URL: ${url} (${err})`);
		process.exit(1);
	}
}

let method = process.argv[2];
let path = process.argv[3];

if (method === 'file') {
	makeFileText(path);
} else if (method === 'url') {
	makeURLText(path);
} else {
	console.error(`Unknown method: ${method}. Please choose either 'file' or 'url`);
	process.exit(1);
}
