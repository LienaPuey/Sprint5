const API_URL: string = "https://icanhazdadjoke.com/"
const jokeBtn:any = document.getElementById("jokeBtn");
const jokeDiv: HTMLElement | any = document.getElementById("jokeDiv");
const tempInfo: any = document.getElementById("tempInfo");
const tempIcon: any = document.getElementById("tempIcon");
const API_KEY:string = '1c9c6cb101e7e4d9930b3d50a680e21a';

//______________________________WEATHER_____________________________

function getWeather () {
  navigator.geolocation.getCurrentPosition((success)=>{
    let {latitude, longitude} = success.coords;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      let {temp} = data.main;
      tempInfo.innerHTML= `${Math.trunc(temp)}ºC`;
      let icon = data.weather[0].icon;
      tempIcon.src=`http://openweathermap.org/img/wn/${icon}@2x.png`;
    })
  })
}
getWeather();
const headerApi = {
  headers: {
    Accept: "application/json",
  }
}


//______________________________JOKES______________________________

const reportJokes: {joke: string, score:number, date:string}[]=[];
const date :string = new Date().toISOString();
let joke:string = "";

const showJoke = async() => {
  try {
    const respuesta = await fetch(API_URL,headerApi);

    if (respuesta.status === 200){
      const data = await respuesta.json();
      joke = data.joke;
      jokeBtn.innerHTML = "Next joke";
      jokeDiv.innerHTML= `
      <p>${data.joke}</p>
      <button id="score1" onclick="scoreBtn(1)" class="scoreBtn">😓</button>
      <button id="score2" onclick="scoreBtn(2)" class="scoreBtn">😐</button>
      <button id="score3" onclick="scoreBtn(3)" class="scoreBtn">😆</button>`
    }

  } catch(error) {
    console.log(error);
  }
}

function scoreBtn(score:number) {
  let scoreJoke = {
    joke: joke,
    score: score,
    date: date
  };
  reportJokes.push(scoreJoke);
  console.log(reportJokes);
}

const chuckJoke =async () => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random', headerApi);
    
    if(response.status === 200){
      const data = await response.json();
      joke = data.value;
      jokeBtn.innerHTML = "Next joke";
      jokeDiv.innerHTML= `
      <p>${data.value}</p>
      <button id="score1" onclick="scoreBtn(1)" class="scoreBtn">😓</button>
      <button id="score2" onclick="scoreBtn(2)" class="scoreBtn">😐</button>
      <button id="score3" onclick="scoreBtn(3)" class="scoreBtn">😆</button>`
    }
  }catch(error){
    console.log(error);
  }
  
}

function randomJoke() {
  let random = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  if(random <=5){
    showJoke();
  }else {
    chuckJoke();
  }
}

//___________________________BLOBS________________________

