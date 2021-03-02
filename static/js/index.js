const socket = io()

socket.on("connect", function() {
    var input = document.getElementById("input")
    input.value = "접속 됨"
})

function send() {
    var message = document.getElementById("input").value

    document.getElementById("input").value = ""

    socket.emit("send", {msg: message})
}