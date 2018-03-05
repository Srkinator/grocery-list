const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const data = fs.readFileSync("./db/data.json");
const groceries = JSON.parse(data);

const server = app.listen(3000, listening);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (request, response, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.get('/', getRequestHandler);
function getRequestHandler(request,response) {
    response.send(groceries);
}

app.post('/', postRequestHandler);
function postRequestHandler(request, response) {
    let currentData = groceries;
    let newData = request.body;

    Number(newData.quantity);

    currentData.push(newData);
    fs.writeFile('db/data.json', JSON.stringify(currentData, null, 2), writeFileHandler(newData));
    response.send(newData);
}

function writeFileHandler(grocery) {
    console.log(`Added Grocery : ${grocery.name}`)
}