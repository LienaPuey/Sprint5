var API_URL = "https://icanhazdadjoke.com/";
var jokeBtn = document.getElementById("jokeBtn");
var jokeDiv = document.getElementById("printJoke");
jokeBtn.onclick = function () {
    fetch(API_URL, {
        headers: {
            Accept: "application/json"
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (data) {
        jokeDiv.innerHtml = "<p>".concat(data.joke, "</p>");
        console.log(data.joke);
    });
};
