//default modules
const express = require("express");
const socket = require("socket.io");
const http = require("http");
const fs = require("fs")

//default variables
const app = express()
const server = http.createServer(app)
const io = socket(server)

//static 설정
app.use("/css", express.static("./static/css"))
app.use("/js", express.static("./static/js"))

//page setting
app.get("/", (request, response) => {
    //response.send("Hello, express!")
    fs.readFile("./static/index.html", function(err, data) {
        if (err) {
            response.send("error")
        } else {
            response.writeHead(200, {"Content-Type": "text/html"})
            response.write(data)
            response.end()
        }
    })
})

//socket
io.sockets.on("connection", (socket) => {
    console.log("유저가 접속하였습니다.")

    socket.on("send", (data) => {
        console.log(`전달된 메세지: ${data.msg}`)
    })

    socket.on("disconnect", () => {
        console.log("접속 종료")
    })
})

//run server
server.listen(8000, () => {
    console.log("running server!")
})