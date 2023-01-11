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
const jokeDiv = document.getElementById("joke");
const headerApi = {
    headers: {
        Accept: "application/json",
    }
};
// fetch(API_URL, {
//     headers: {
//          Accept: "application/json",
//        }
//  })
//  .then(response => response.json())
//  .then(data=> { 
//     jokeDiv.innerHTML=`<p>${data.joke}</p>`;
//     console.log(data.joke);
// });
const showJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respuesta = yield fetch(API_URL, headerApi);
        if (respuesta.status === 200) {
            const data = yield respuesta.json();
            jokeDiv.innerHTML = data.joke;
        }
    }
    catch (error) {
        console.log(error);
    }
});
