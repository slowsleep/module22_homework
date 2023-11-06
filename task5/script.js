let message = document.querySelector("#message");
let btnSendMessage = document.querySelector("#send_message");
let boxMessages = document.querySelector(".box-messages");
let btnSendGeo = document.querySelector("#send_geo");

btnSendMessage.addEventListener("click", function (e) {
    e.preventDefault();
    let textMessage = message.value;
    addMessageToBox(textMessage, "client");

    let ws = createWS();
    ws.onopen = (event) => {
        ws.send(textMessage);
    };
});

btnSendGeo.addEventListener("click", function (e) {
    e.preventDefault();
    displayGeo();
});

// typeSender = "client" or "server"
function addMessageToBox(message, typeSender) {
    let messageElement = document.createElement("div");
    messageElement.classList.add("message", `message--${typeSender}`);

    if (typeof message == "string") {
        messageElement.innerText = message;
        boxMessages.appendChild(messageElement);
    } else if (typeof message == "object") {
        messageElement.appendChild(message);
        boxMessages.appendChild(messageElement);
    }
}

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

function displayGeo() {
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let geoLink = document.createElement("a");

        geoLink.setAttribute(
            "href",
            `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`
        );
        geoLink.setAttribute("target", "_blank");
        geoLink.innerText = "Гео-локация";

        addMessageToBox(geoLink, "client");
    }

    function error() {
        alert("Информация о местоположении недоступна");
    }

    if (!navigator.geolocation) {
        error();
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
