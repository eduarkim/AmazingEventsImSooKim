import { cargarDetalles } from "../module/funciones.js";
console.log(cargarDetalles); 
let url = "https://aulamindhub.github.io/amazing-api/events.json"
const container = document.getElementById("containerdetails");
console.log(container); 

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); 

    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get('id');
    console.log(`Evento ID: ${eventoId}`);

    let evento = data.events.find(event => {
      console.log(`Comparando ${String(event._id)} con ${String(eventoId)}`);
      return String(event._id) === String(eventoId);
    });
    if (!evento) {
      console.error("No se encontró el evento con el ID proporcionado");
      return;
    }
    console.log(evento); 
    cargarDetalles(evento, container);
  } catch (error) {
    console.error(error);
  }
});
