const API_URL: string = "https://icanhazdadjoke.com/"
const jokeBtn:any = document.getElementById("jokeBtn");
const jokeDiv: HTMLElement | any = document.getElementById("jokeDiv");
const headerApi = {
  headers: {
    Accept: "application/json",
  }
}
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