var socket = io('http://localhost:3000/');

// elements
var submitForm = document.getElementById('form');
var listElement = document.getElementById('messages');

// ask for user name
var userName = prompt('What is your name?')
socket.emit('user-join', userName)
createList('You joined!', "#eee");

// chatting feature
submitForm.addEventListener('submit', function(e) {
    e.preventDefault();
    var inputText = document.getElementById('input');
    socket.emit('send-message', inputText.value);
    createList('You: ' + inputText.value, "#ffffff")
    inputText.value = '';
})

// sockets
socket.on('user-join', (msg) => {
    createList(msg, '#eee')
})

socket.on('chat-message', (data) => {
    createList(`${data.name}: ${data.msg}`, '#efefef')
})

socket.on('user-disconnect', (msg) => {
    createList(msg, 'red')
})

function createList(msg, backgroundColor) {
    const liElement = document.createElement(('li'));
    liElement.innerHTML = msg
    liElement.style.backgroundColor = backgroundColor
    listElement.append(liElement);
}

