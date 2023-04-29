require('dotenv').config()
const express = require("express")
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);


app.set('view engine', 'ejs')

app.get("/", (req, res)=>{
    res.render('login')
})
app.get("/home", (req, res)=>{
    res.render('home')
})
app.get("/chat", (req, res)=>{
    res.render('chat')
})
const PORT = process.env.PORT || 8080
// http = app.listen(PORT, () => console.log('http://localhost:' + PORT))
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


http.listen(PORT, () => {
  console.log('http://localhost:' +PORT);
});

// app.listen(3000, () => {
//   console.log('http://localhost:3000');
// });
