var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};

this.socket = io.connect('http://localhost:8000',connectionOptions);
const form = document.getElementById('sendbox');
const messageInput = document.getElementById('msginput');
const messageContainer = document.querySelector('.chat_box');
const music = new Audio("msg.m4a");

// append function
const appendItem = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add("box");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // if(position == "left"){ };
    music.play()
}
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const message = messageInput.value;
    appendItem(`You: ${message}`, "right");
    socket.emit("send", message);
    messageInput.value = "";

})

const name = prompt("Enter your name to join: ")
socket.emit("new_user_joined", name);


socket.on("user_joined", name => {
    appendItem(`${name} joined the chat`, "right");
    // console.log(name);
    
})
socket.on("receive", data => {
    appendItem(`${data.name}: ${data.message}`, "left");
    
})
socket.on("left", name => {
    appendItem(`${name} left the chat`, "left");
    
})

