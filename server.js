// imports
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const session = require("express-session")
const morgan = require("morgan")
const http = require("http")
const routes = require("./routes")
const passport = require("./passport")
const {
  addUsers,
  removeUser,
  getUser,
  usersInNode,
} = require("./roomManagement.js")
const { restart } = require("nodemon")

const port = process.env.PORT || 4000
const app = express()

// middleware - server logging
app.use(morgan("dev"))

// middleware - JSON parsing
app.use(express.json())

// middleware - cors
const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true, // allow the session cookie to be sent to and from the client
  optionsSuccessStatus: 204,
}

app.use(cors(corsOptions))

const server = http.createServer(app)
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // will not resave sessions
    saveUninitialized: false, // only create a session when a property is added to the session
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
)

// middleware - passport config
app.use(passport.initialize())
app.use(passport.session())

// Attempts to resolve CORs
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

// middleware - API routes
app.use("/api/v1/auth", routes.auth)
app.use("/api/v1/users", routes.users)

io.on("connect", (socket) => {
  // event and a call back
  socket.on("join", ({ username, node }, callback) => {
    // console.log({username, node})
    const { user } = addUsers({ id: socket.id, username, node })
    socket.join(user.node)
    socket.emit("message", {
      user: "null.void",
      text: `${user.username}, connecting to node ${user.node}`,
    })
    socket.broadcast.to(user.node).emit("message", {
      user: "null.void",
      text: `${user.username} joining from PORT: ${Math.floor(
        Math.random() * 9999
      )}`,
    })
    io.to(user.node).emit("nodeData", {
      node: user.node,
      users: usersInNode(user.node),
    })
    callback()
  })
  // socket takes in an event, and a callback
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id)
    io.to(user.node).emit("message", { user: user.username, text: message })
    callback()
  })
  // event and a call back
  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if (user) {
      io.to(user.node).emit("message", {
        user: "null.void",
        text: `${user.username} is returning to meatspace.`,
      })
      io.to(user.node).emit("nodeData", {
        node: user.node,
        users: usersInNode(user.node),
      })
    }
  })
})

// connection
server.listen(port, () => console.log(`Server is running on port ${port}`))
