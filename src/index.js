const { Server: ServerIO } = require('socket.io')
const http = require('http')

const express = require("express");
const morgan = require("morgan");
const path = require("path")
const routes = require("./routes/routeProductos.js");


const app = express();
const ServerHttp = http.createServer(app)

const io = new ServerIO(ServerHttp)

const messages = [
  {
    id: 1,
    text: "Hola soy tu anfitrión",
    author: "Roberto Ojeda",
  },
];

io.on("connection", (socket) => {
  console.log(`Cliente ${socket.id} conectado con sockets`);
  socket.emit("messages", messages);

  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});



//settings
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.url} -${req.method}`)
  next()
})

//Static files
app.use(express.static(path.join(__dirname + '/public')));

//Routes
app.use(routes);

// Starting the server
try {
  ServerHttp.listen(app.get("port"), () => {
    console.log(`Server escuchando en puerto ${app.get("port")}`);
  });
} catch (err) {
  console.error("Error de conexión en server...", err);
}

