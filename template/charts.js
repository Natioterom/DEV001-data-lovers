import { getData, getDeads, getAlive, getFemale, getMale, getUnknow } from '../data.js';
import data from '../data/rickandmorty/rickandmorty.js';

//Graficos - CharsJS
export const printChart = (grafica) => {
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
  return myChart
}
