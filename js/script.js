"use strict";

const API_URL = 'https://pokeapi.co/api/v2/pokemon/'
const requestBtn = document.getElementById("request-btn");
const errorMessage = document.getElementById("error-message");
const loadingMsg = document.getElementById("loading-msg");
const historialList = document.getElementById("historial");
const clearHistorial = document.getElementById("clear-historial");
const pokemonDisplayData = document.getElementById("pokemon-display-data");
const pokeName = document.getElementById("pokeName");


const delay = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, 4000);
  });

  window.addEventListener("DOMContentLoaded", function () {
    const historial = localStorage.getItem("historial");
    historialList.innerHTML = historial;
  });
  
  function clearHistorialFn() {
    localStorage.clear();
    historialList.innerHTML = "";
  }
  
  clearHistorial.addEventListener("click", clearHistorialFn);

  function onPkmDisplayData(poke) {
    const { name , id } = poke;
    const newPoke = {
      name,
      id
    };
    console.log({ newPoke });
    
    pokemonDisplayData.classList.remove("hidden");
    pokemonDisplayData.innerHTML = `
        <p>Tu pokemon es: ${poke.name} <br /> Su numero es:  ${poke.id}</p>
      `;
  }

async function btnCallback() {
    const pokeName2 = pokeName.value;
    loadingMsg.classList.remove("hidden");
    try {
        pokemonDisplayData.classList.add("hidden");
       if (pokeName2 === null || pokeName2 === undefined || pokeName2 === '') {
         const error = "El nombre debe ser texto";
         throw new Error(error);
       }
      
      await delay;
      const response = await fetch(
        API_URL + pokeName2);
      if (response.status === 404) {
        throw new Error("Pokemon no encontrado");
      }
      const json = await response.json();
      console.log(json);

      onPkmDisplayData(json);
  
      historialList.innerHTML += `<li>Pokemon: ${json.name}, numero: ${json.id}</li>`;
      localStorage.setItem("historial", historialList.innerHTML);
    } catch (error) {
        console.error(error);
        errorMessage.innerText = error;
      } finally {
        loadingMsg.classList.add("hidden");
        setTimeout(function () {
          errorMessage.innerText = "";
          pokeName.value = "";
          pokeName.focus();
        }, 3000);
      }
    }
    
    requestBtn.addEventListener("click", btnCallback);
  
  