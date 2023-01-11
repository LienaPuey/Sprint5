const API_URL: string = "https://icanhazdadjoke.com/"
const jokeBtn:any = document.getElementById("jokeBtn");
const jokeDiv: HTMLElement | any = document.getElementById("joke");
const headerApi = {
  headers: {
    Accept: "application/json",
  }
}
   
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

const showJoke = async() => {
  try {
    const respuesta = await fetch(API_URL,headerApi);

    if (respuesta.status === 200){
      const data = await respuesta.json();
      jokeDiv.innerHTML = data.joke;
    }

  } catch(error) {
    console.log(error);
  }
}
