const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const data = fs.readFileSync("./db/data.json");
const groceries = JSON.parse(data);
const http = require("http").Server(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (request, response, next) {
	response.header("Access-Control-Allow-Origin", "http://localhost:3000");
	response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	response.header(
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

function writeFileHandler(grocery, reqType) {
    if(reqType === 'delete'){
        console.log(`Deleted Grocery : ${grocery.name}`);
    } else{
        console.log(`Added Grocery : ${grocery.name}`);
    }
}

app.delete('/:name', deleteRequestHandler);
function deleteRequestHandler(request, response){
    let currentData = groceries;
    let name = request.params.name;

    for (let i = 0; i<currentData.length; i++){
        let grocery = currentData[i];
        if(name ===grocery.name){
            currentData.splice(i, 1);
        }
    }

    fs.writeFile('db/data.json', JSON.stringify(currentData, null, 2), writeFileHandler(newData, 'delete'));
    response.send(`${name} is deleted from list`)
}


http.listen(3000, ()=>{
    console.log('Server is running');
});