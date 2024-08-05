import {pintarTarjetas, pintarCheckBoxs, filtroChecks, filtroTexto} from "../module/funciones.js";

let url = "https://aulamindhub.github.io/amazing-api/events.json"
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);


  let arregloFecha = data.events.filter(e => e.date < data.currentDate);
  const contenedorTarjetas = document.getElementById("divtarjetas");
  const contenedorCheckboxs = document.getElementById("divcheckboxs");
 
  
  let categorias = arregloFecha.map((event) => event.category);
  let categoriasUnicas = [...new Set(categorias)];
  
  pintarCheckBoxs(categoriasUnicas, contenedorCheckboxs);
  pintarTarjetas(arregloFecha, contenedorTarjetas);
  
  
  document.getElementById("buscador").addEventListener('keyup', e => {
    let arregloFiltradoTexto = filtroTexto(arregloFecha);
    let arregloFiltradoChecks = filtroChecks(arregloFiltradoTexto);
    if(arregloFiltradoChecks.length != 0){
      pintarTarjetas(arregloFiltradoChecks, contenedorTarjetas);
    }else{
      let mensajeNoResultados = document.createElement("div");
      mensajeNoResultados.id = "mensajeNoResultados";
      mensajeNoResultados.textContent = "No se encontraron resultados";
      contenedorTarjetas.innerHTML = "";
      contenedorTarjetas.appendChild(mensajeNoResultados);
    }
  });
  
  document.getElementById("divcheckboxs").addEventListener('change', e => {
    let arregloFiltradoChecks = filtroChecks(arregloFecha);
    let arregloFiltradoTexto = filtroTexto(arregloFiltradoChecks);
    if(arregloFiltradoTexto.length !== 0){
      pintarTarjetas(arregloFiltradoTexto, contenedorTarjetas);
    }else {
      let mensajeNoResultados = document.createElement("div");
      mensajeNoResultados.id = "mensajeNoResultados";
      mensajeNoResultados.textContent = "No se encontraron resultados";
      contenedorTarjetas.innerHTML = "";
      contenedorTarjetas.appendChild(mensajeNoResultados);
    }
  });

})
.catch(error => console.log(error));
  