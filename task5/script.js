let message = document.querySelector("#message");
let btnSendMessage = document.querySelector("#send_message");
let boxMessages = document.querySelector(".box-messages");

btnSendMessage.addEventListener("click", function (e) {
    e.preventDefault();
    let textMessage = message.value;
    addMessageToBox(textMessage, "client");

    let ws = createWS();
    ws.onopen = (event) => {
        ws.send(textMessage);
    };
});

function createWS() {
    const websocket = new WebSocket("wss://echo-ws-service.herokuapp.com/");
    websocket.onopen = function (evt) {
        console.log("CONNECTED");
    };
    websocket.onclose = function (evt) {
        console.log("DISCONNECTED");
    };
    websocket.onmessage = function (evt) {
        addMessageToBox(evt.data, "server");
    };
    websocket.onerror = function (evt) {
        console.log("ERROR: ", evt.data);
    };
    return websocket;
}

// typeSender = "client" or "server"
function addMessageToBox(message, typeSender) {
    let messageElement = document.createElement("div");

    messageElement.innerText = message;
    messageElement.classList.add("message", `message--${typeSender}`);

    boxMessages.appendChild(messageElement);
}
