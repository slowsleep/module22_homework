let btn = document.querySelector(".j-btn");
let divSize = document.querySelector(".display-size");
let divGeo = document.querySelector(".geo");


btn.addEventListener("click", function(){
    divSize.innerText = "";
    divGeo.innerText = "";
    displayScreenSize();
    displayGeo();
});

function displayScreenSize() {
    let userScreenWidth = screen.width;
    let userScreenHeight = screen.height;
    divSize.innerText += `
    ширина: ${userScreenWidth} высота: ${userScreenHeight}
    `;
}

function displayGeo() {
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        divGeo.textContent = `Широта: ${latitude} °, Долгота: ${longitude} °`;
    }

    function error() {
        divGeo.textContent = "Информация о местоположении недоступна";
    }

    if (!navigator.geolocation) {
        error();
    } else {
        divGeo.textContent = "Определение местоположения…";
        navigator.geolocation.getCurrentPosition(success, error);
    }

}
