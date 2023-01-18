const API_URL: string = "https://icanhazdadjoke.com/"
const jokeBtn:any = document.getElementById("jokeBtn");
const jokeDiv: HTMLElement | any = document.getElementById("jokeDiv");
const tempInfo: any = document.getElementById("tempInfo");
const tempIcon: any = document.getElementById("tempIcon");
const API_KEY:string = '1c9c6cb101e7e4d9930b3d50a680e21a';
const blobContainer:any = document.getElementById('containerJokes');
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
      <div>
      <button id="score1" onclick="scoreBtn(1)" class="scoreBtn">😓</button>
      <button id="score2" onclick="scoreBtn(2)" class="scoreBtn">😐</button>
      <button id="score3" onclick="scoreBtn(3)" class="scoreBtn">😆</button>
      </div>`
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
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const score3 = document.getElementById("score3");


const chuckJoke =async () => {
  try {
    const response = await fetch('https://api.chucknorris.io/jokes/random', headerApi);
    
    if(response.status === 200){
      const data = await response.json();
      joke = data.value;
      jokeBtn.innerHTML = "Next joke";
      jokeDiv.innerHTML= `
      <p>${data.value}</p>
      <div>
      <button id="score1" onclick="scoreBtn(1)" class="scoreBtn">😓</button>
      <button id="score2" onclick="scoreBtn(2)" class="scoreBtn">😐</button>
      <button id="score3" onclick="scoreBtn(3)" class="scoreBtn">😆</button>
      </div>`

    }
  }catch(error){
    console.log(error);
  }
  
}

function randomJoke():void {
  let random = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
  if(random <=5){
    showJoke();
    getRandomBlob();

  }else{
    chuckJoke();
    getRandomBlob();
  }
  
}

//___________________________BLOBS________________________

function getRandomBlob(){
  let randomBlob:string[] = new Array();
  randomBlob[0]= './assets/blobs/blob_2.svg';
  randomBlob[1]= './assets/blobs/blob_3.svg';
  randomBlob[2]= './assets/blobs/blob_4.svg';
  randomBlob[3]= './assets/blobs/blob_5.svg';
  randomBlob[4]= './assets/blobs/blob_6.svg';
  var number = Math.floor(Math.random()*randomBlob.length); 
  blobContainer.style.backgroundImage = `url(${randomBlob[number]})`;
}