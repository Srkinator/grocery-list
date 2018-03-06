const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const data = fs.readFileSync("./db/data.json");
const groceries = JSON.parse(data);
const http = require("http").Server(app);
const io = require("socket.io")(http);
let listOfClients =[];



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
        console.log(`Deleted Grocery : ${grocery}`);
    }
    else if(reqType === 'put'){
        console.log(`Updated Grocery : ${grocery}`);
    }
    else{
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

    fs.writeFile('db/data.json', JSON.stringify(currentData, null, 2), writeFileHandler(name, 'delete'));
    response.send(`${name} is deleted from list`)
}

app.put('/:name', putRequestHandler);
function putRequestHandler(request, response){
    let currentData = groceries;
    let name = request.params.name;
    let newData = request.body;
    console.log(newData);
    let updatedData = [];

    Number(newData.quantity);

    for(let i = 0; i<currentData.length; i++){
        let grocery = currentData[i];
        if(name ===grocery.name){
            grocery.quantity = newData.quantity;
        }
        updatedData.push(grocery);
    }

    fs.writeFile('db/data.json', JSON.stringify(currentData, null, 2), writeFileHandler(name, 'put'));
    response.send(newData);
}

io.sockets.on('connection', (socket) => {
	clients.push(socket.id);

	socket.on('notifyServer', () => {
		for (let i = 0; i < clients.length; i++) {
			io.sockets.connected[clients[i]].emit('notifyClient');
		}
	});

	socket.on('disconnect', () => {

		for (let i = 0; i < clients.length; i++) {
			if (clients[i] === socket.id) {
				clients.splice(i, 1);
			}
		}
	})
});


http.listen(9000, ()=>{
    console.log('Server is running');
});