"use strict";

window.addEventListener('load', init);

var jokeBtn;
var jokeParagraph;

function init(){
    jokeBtn = document.getElementById("joke-btn");
    jokeParagraph = document.getElementById("joke")
    jokeBtn.addEventListener('click', fetchJoke);
    jokeBtn.addEventListener('click', fetchJokeWithHttpRequest);
}

function fetchJoke(){
    fetch('http://api.icndb.com/jokes/random').then(resp => {
      console.log(resp);  
      if(resp.status === 404){
        return {"value":{"joke": "Joke not found"}};
      } else {
        return resp.json();
      }
    }).then(data => {
      jokeParagraph.innerHTML = data.value.joke;
    });
}

function fetchJokeWithHttpRequest(){
      var oReq = new XMLHttpRequest();
      oReq.addEventListener("load", reqListener);
      oReq.open("GET", "http://api.icndb.com/jokes/random");
      oReq.send();
}

function reqListener () {
    console.log(this.responseText);
}