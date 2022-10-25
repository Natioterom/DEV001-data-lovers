import { getData, getDeads, getAlive, getFemale, getMale, getUnknow, ascendente, descendente } from './data.js';
import { tarjetas } from './template/cards.js';
import data from './data/rickandmorty/rickandmorty.js';

//Variable que me sirve para cualquier selector del DOM
const $ = (selector) => document.querySelector(selector);

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
//Seleccionar como ordenar
const sortData = (data) => {
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
  $('.cards').insertAdjacentHTML("beforeend", tarjetas(personaje))
  sortData(getData(data))
  $('.graficos').style.display = "none";
});

//Creo un evento para volver a ver las tarjetas de todos los personajes
$('#todos').addEventListener("click", () => {
  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resulTodos = getData(data);
  resulTodos.forEach(personaje => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personaje));
  })
  sortData(getData(data))
  $('.graficos').style.display = "none";
})

// Creo un evento que al realizar click se muestres los personajes filtrados por gender"Male"
$('#hombre').addEventListener("click", () => {

  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resultMale = getMale(data);
  resultMale.forEach(personajeMale => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personajeMale));
  })
  sortData(getMale(data))
  $('.graficos').style.display = "none";
})

// Creo un evento que al realizar click se muestres los personajes filtrados por gender "Female"
$('#mujer').addEventListener("click", () => {
  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resultFemale = getFemale(data);
  resultFemale.forEach(personajeFemale => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personajeFemale));
  })
  sortData(getFemale(data))
  $('.graficos').style.display = "none";
})

// Creo un evento que al realizar click se muestres los personajes filtrados por gender "Alive"
$('#vivos').addEventListener("click", () => {
  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resultAlive = getAlive(data);
  resultAlive.forEach(personajeAlive => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personajeAlive));
  })
  sortData(getAlive(data))
  $('.graficos').style.display = "none";
})

//Creo un evento al realizar click en el enlace y filtro los personajes por status "Dead"
$('#muertos').addEventListener("click", () => {
  $('.cards').innerHTML = "";
  //Coloco los personajes en las tarjetas
  const resultDead = getDeads(data);
  resultDead.forEach(personajeDead => {
    $('.cards').insertAdjacentHTML("beforeend", tarjetas(personajeDead));
  })
  sortData(getDeads(data))
  $('.graficos').style.display = "none";
}) 
  //Busqueda de personjaes le agrego evento al input con keyup
 $('.busqueda').addEventListener("keyup", () => {
  //busqueda de personaje con indexOf
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
$('.btnGrafica').addEventListener("click", () => {
    $('.graficos').setAttribute("style", "display:block");
  const grafica = document.getElementById('myChart').getContext('2d');
  const personajes = ["Todos", "Hombres", "Mujeres","Género desconocido", "Vivos", "Muertos"]
  const myChart = new Chart(grafica, {
    type: 'bar',
    data: {
      labels: personajes,
      datasets: [{
        label: " Cantidad de Personajes",
        data: [
          getData(data).length,
          getMale(data).length,
          getFemale(data).length,
          getUnknow(data).length,
          getAlive(data).length,
          getDeads(data).length],
        backgroundColor: [
          ' greenyellow',
          'rgb(123, 110, 237)',
          'rgb(234, 139, 154)',
          'rgba(174, 69, 240, 0.641)',
          'rgb(14, 167, 174)',
          'rgb(250, 206, 125)',
        ],
        borderColor: [
          'rgb(124, 200, 11)',
          'rgb(41, 19, 238)',
          'rgb(225, 29, 59)',
          'rgba(117, 21, 177, 0.641)',
          'rgb(83, 214, 250)',
          'orange',

        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  $('.cards').innerHTML = "";

});

