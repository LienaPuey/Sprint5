const API_URL: string = "https://icanhazdadjoke.com/"
const jokeBtn:any = document.getElementById("jokeBtn");
const jokeDiv :any = document.getElementById("printJoke");

jokeBtn.onclick = function() {    
fetch(API_URL, {
    headers: {
         Accept: "application/json",
       }
 })
 .then(response => response.json())
 .then(data=> { 
    jokeDiv.innerHtml=`<p>${data.joke}</p>`;
    console.log(data.joke);
});

  };