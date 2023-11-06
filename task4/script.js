let divDataTime = document.querySelector(".data-time");
let btnGetTataTime = document.querySelector("#get_data_time");

btnGetTataTime.addEventListener("click", function () {
    divDataTime.innerText = "";
    displayGeo();
});

function displayGeo() {
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let url = ` https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;
        fetch(url)
            .then((data) => data.json())
            .then((json) => {
                divDataTime.innerText = `timezone = ${json.timezone}; date_time_txt = ${json.date_time_txt} `;
            })
            .catch((error) => console.log(data));
    }

    function error() {
        divDataTime.textContent = "Информация о местоположении недоступна";
    }

    if (!navigator.geolocation) {
        error();
    } else {
        divDataTime.textContent = "Определение местоположения…";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}
