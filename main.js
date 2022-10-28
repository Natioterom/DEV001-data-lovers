import { getData, getDeads, getAlive, getFemale, getMale, ascendente, descendente } from './data.js';
import { printChart } from './template/charts.js';
import { tarjetas } from './template/cards.js';
import data from './data/rickandmorty/rickandmorty.js';



//Variable que me sirve para cualquier selector del DOM
const $ = (selector) => document.querySelector(selector);
//Desplegar vision dos HTML
$('.btn-iniciar').addEventListener("click",()=>{
  $('.visionUno').innerHTML="";
    $('.visionDos').style.display="block";
    
})

//Buscador mobile
let anchura = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
if (anchura <= 748) {
  $('.icon-search').addEventListener("click", () => {
    $('.menu').classList.toggle('ocultar');
    $('.orden').classList.toggle('ocultar');
    $('.btnGrafica').classList.toggle('ocultar');
    $('.busqueda').classList.toggle('mostrar');
  })
}

//Función para que el menu se abra y se cierre al darle Click
$('.menu_filtros').addEventListener("click", () => {
  $('.menu_setting').classList.toggle('inactive');
})
$('.menu_setting').addEventListener("click", () => {
  $('.menu_setting').classList.toggle('inactive');
})

/*
fetch('./data/rickandmorty/rickandmorty.json')
  .then(response => {
    response.json()})
  .then(data => {
    console.log(data);
  })
  .catch(error => console.log(error))
*/

//Seleccionar como ordenar
const sortData=(data)=>{
$('.orden').addEventListener("change", () => {
  const opcion = $('.orden').value;
  if (opcion == "1") {
    const resultA = ascendente(data);
    $('.cards').innerHTML = "";
    //Coloco los personajes en las tarjetas
    resultA.forEach(personaje => {
      $('.cards').insertAdjacentHTML("beforeend", tarjetas(personaje));
    })
  }
  else {
    const ordenB = descendente(data);
    $('.cards').innerHTML = "";
    //Coloco los personajes en las tarjetas
    ordenB.forEach(personaje => {
      $('.cards').insertAdjacentHTML("beforeend", tarjetas(personaje));
    })
  }
  $('.graficos').style.display = "none";
})
};

//Retorna el resultado de la fx de tarjetas, para realizarla
getData(data).forEach(personaje => {
  $('.orden').value = "Ordenar";
  $('.cards').insertAdjacentHTML("beforeend", tarjetas(personaje))
  sortData(getData(data))
  $('.graficos').style.display = "none";
});

//Creo un evento para volver a ver las tarjetas de todos los personajes
$('#todos').addEventListener("click", () => {
  $('.orden').value = "Ordenar";
  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resulTodos = getData(data);
  resulTodos.forEach(personaje => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personaje));
  })
  sortData(resulTodos)
  $('.graficos').style.display = "none";
})

// Creo un evento que al realizar click se muestres los personajes filtrados por gender"Male"
$('#hombre').addEventListener("click", () => {
  $('.orden').value = "Ordenar";
  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resultMale = getMale(data);
  resultMale.forEach(personajeMale => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personajeMale));
  })
  sortData(resultMale);
  $('.graficos').style.display = "none";
})

// Creo un evento que al realizar click se muestres los personajes filtrados por gender "Female"
$('#mujer').addEventListener("click", () => {
  $('.orden').value = "Ordenar";
  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resultFemale = getFemale(data);
  resultFemale.forEach(personajeFemale => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personajeFemale));
  })
  sortData(resultFemale)
  $('.graficos').style.display = "none";
})

// Creo un evento que al realizar click se muestres los personajes filtrados por gender "Alive"
$('#vivos').addEventListener("click", () => {
  $('.orden').value = "Ordenar";
  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resultAlive = getAlive(data);
  resultAlive.forEach(personajeAlive => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personajeAlive));
  })
  sortData(resultAlive)
  $('.graficos').style.display = "none";
})

//Creo un evento al realizar click en el enlace y filtro los personajes por status "Dead"
$('#muertos').addEventListener("click", () => {
  $('.orden').value = "Ordenar";
  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resultDead = getDeads(data);
  resultDead.forEach(personajeDead => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personajeDead));
  })
  sortData(resultDead)
  $('.graficos').style.display = "none";
})

//Busqueda de personjaes le agrego evento al input con keyup
$('.busqueda').addEventListener("keyup", () => {
  const busqueda = document.querySelector(".busqueda")
  let textoBusqueda = busqueda.value.toLowerCase();
  $('.cards').innerHTML = "";
  for (let nombre of getData(data)) {
    let nombrePersonaje = nombre.name.toLowerCase();
    if (nombrePersonaje.indexOf(textoBusqueda) != -1) {
      $('.cards').insertAdjacentHTML("beforeend", tarjetas(nombre));
    }
  }
  $('.graficos').style.display = "none";
});

//Insertar graficos
$('.btnGrafica').addEventListener("click", () => {
  $('.graficos').setAttribute("style", "display:block");
  const grafica = document.getElementById('myChart').getContext('2d');
  printChart(grafica);
  $('.cards').innerHTML = "";
});
