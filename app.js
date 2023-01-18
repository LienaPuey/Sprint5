"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://icanhazdadjoke.com/";
const jokeBtn = document.getElementById("jokeBtn");
const jokeDiv = document.getElementById("jokeDiv");
const tempInfo = document.getElementById("tempInfo");
const tempIcon = document.getElementById("tempIcon");
const API_KEY = '1c9c6cb101e7e4d9930b3d50a680e21a';
const blobContainer = document.getElementById('containerJokes');
//______________________________WEATHER_____________________________
function getWeather() {
    navigator.geolocation.getCurrentPosition((success) => {
        let { latitude, longitude } = success.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
            let { temp } = data.main;
            tempInfo.innerHTML = `${Math.trunc(temp)}ºC`;
            let icon = data.weather[0].icon;
            tempIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        });
    });
}
getWeather();
const headerApi = {
    headers: {
        Accept: "application/json",
    }
};
//______________________________JOKES______________________________
const reportJokes = [];
const date = new Date().toISOString();
let joke = "";
let score;
const btnScores = `
<div>
<label class="scoreBtn"><input name="emoji" type="radio" value="1" id="score1">😓</label>
<label class="scoreBtn"><input name="emoji" type="radio" value="2" id="score2" >😐</label>
<label class="scoreBtn"><input name="emoji" type="radio" value="3" id="score3">😆</label>
</div>`;
const showJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respuesta = yield fetch(API_URL, headerApi);
        if (respuesta.status === 200) {
            const data = yield respuesta.json();
            joke = data.joke;
            jokeBtn.innerHTML = "Next joke";
            jokeDiv.innerHTML = `
      <p>${data.joke}</p>` + btnScores;
        }
    }
    catch (error) {
        console.log(error);
    }
});
// let scoreJoke = {
//   joke: joke,
//   score: score,
//   date: date
// };
// console.log(scoreJoke);
const chuckJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://api.chucknorris.io/jokes/random', headerApi);
        if (response.status === 200) {
            const data = yield response.json();
            joke = data.value;
            jokeBtn.innerHTML = "Next joke";
            jokeDiv.innerHTML = `
      <p>${data.value}</p>` + btnScores;
        }
    }
    catch (error) {
        console.log(error);
    }
});
function randomJoke() {
    let random = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    if (random <= 5) {
        showJoke();
        getRandomBlob();
    }
    else {
        chuckJoke();
        getRandomBlob();
    }
    var emojiScore = document.querySelector('input[name="emoji"]:checked').value;
}
//___________________________BLOBS________________________
function getRandomBlob() {
    let randomBlob = new Array();
    randomBlob[0] = './assets/blobs/blob_2.svg';
    randomBlob[1] = './assets/blobs/blob_3.svg';
    randomBlob[2] = './assets/blobs/blob_4.svg';
    randomBlob[3] = './assets/blobs/blob_5.svg';
    randomBlob[4] = './assets/blobs/blob_6.svg';
    var number = Math.floor(Math.random() * randomBlob.length);
    blobContainer.style.backgroundImage = `url(${randomBlob[number]})`;
}
