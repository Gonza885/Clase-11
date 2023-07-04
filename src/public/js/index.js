const socket = io();
let user;
let chatBox = document.getElementById("chatBox")


Swal.fire({
    title: "Bienvenido a nuestro chat",
    input: "text",
    text: "Ingresa por favor tu nombre:",
    inputValidator: (value) => {
        return !value && "¡Se requiere un nombre para continuar!"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
})

chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = "";

    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message} </br>`
    });
    log.innerHTML = messages
})

socket.on('newUserConnected',data=>{
    if(!user) return;
    Swal.fire({
        text: "Nuevo usuario conectado",
        toast:true,
        position:'top-right'
    })
})





















/* const input  = document.getElementById('textbox');
const log = document.getElementById('log');
input.addEventListener('keyup',evt=>{
    if(evt.key==="Enter"){
        socket.emit('message',input.value);
        input.value=""
    }
})
socket.on('log',data=>{
    let logs='';
    data.logs.forEach(log=>{
        logs += `${log.socketid} dice: ${log.message}<br/>`
    })
    log.innerHTML=logs;
})
/*
socket.emit('message',"Hola soy cliente y me estoy comunicando desde un WS")

socket.on('evento_para_socket',data=>{
    console.log(data)
})*/
