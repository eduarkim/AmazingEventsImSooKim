import {pintarTarjetas, pintarCheckBoxs, filtroChecks, filtroTexto} from "../module/funciones.js";


let url = "https://aulamindhub.github.io/amazing-api/events.json"
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);


      const contenedorTarjetas = document.getElementById("divtarjetas");
      const contenedorCheckboxs = document.getElementById("divcheckboxs");
 //     let texto = document.getElementById("buscador").value.toLowerCase();
   //   let checkboxChecked = [...document.querySelectorAll('input[type=checkbox]:checked')];
      let categorias = data.events.map((event) => event.category);
      let categoriasUnicas = [...new Set(categorias)];
      
      pintarCheckBoxs(categoriasUnicas, contenedorCheckboxs);
      pintarTarjetas(data.events, contenedorTarjetas);
 //      filtroChecks(data.events, checkboxChecked);
   //    filtroTexto(data.events, texto);
      
      document.getElementById("buscador").addEventListener('keyup', e => {
        let arregloFiltradoTexto = filtroTexto(data.events);
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
        let arregloFiltradoChecks = filtroChecks(data.events);
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
      
     /* 
      function pintarTarjetas(arregloEventos, contenedor) {
        let tamanio = arregloEventos.length;
       // let contenedor = document.getElementById("divtarjetas");
        contenedor.innerHTML = "";
        for (let i = 0; i < tamanio; i++) {
          let tarjeta = document.createElement("div");
          tarjeta.className = "card col d-flex";
          tarjeta.innerHTML = `
      
           <div class="card col d-flex mb-4">
           <img class="card-img-top" src="${arregloEventos[i].image}" alt="${arregloEventos[i].name}">
           <div class="card-body d-flex flex-column flex-grow-1">
               <h5 class="card-title">${arregloEventos[i].name}</h5>
               <p class="card-text">${arregloEventos[i].description}</p>
               <p class="card-text">${arregloEventos[i].category}</p>
           </div>
           <div class="card-footer d-flex justify-content-between">
               <span>u$u ${arregloEventos[i].price}</span>
               <a href="./details.html?id=${arregloEventos[i]._id}" class="btn btn-primary">Details</a>
           </div>
       </div>
             `
          contenedor.appendChild(tarjeta);
        }
      }
      
      function pintarCheckBoxs(arregloCategorias, contenedorcheck) {
        for (let i = 0; i < arregloCategorias.length; i++) {
          let nuevoCheck = document.createElement("div")
          nuevoCheck.className = "form-check form-check-inline";
          nuevoCheck.innerHTML = `
          <input class="form-check-input" type="checkbox" value="${arregloCategorias[i]}" id="${arregloCategorias[i].replace(" ", "-")}" name="checkcategory">
          <label class="form-check-label" for="${arregloCategorias[i].replace(" ", "-")}">${arregloCategorias[i]}</label>
          `
          contenedorcheck.appendChild(nuevoCheck);
        }
      }
   */   
  /*
      function filtroTexto(arregloEventos) {
        let texto = document.getElementById("buscador").value.toLowerCase();
        let arregloFiltrado = arregloEventos
        if(texto != null || texto != undefined) {
          arregloFiltrado = arregloEventos.filter(evento => evento.name.toLowerCase().includes(texto) || 
          evento.description.toLowerCase().includes(texto));
        }
        return arregloFiltrado;
      }
      
      function filtroChecks(arregloEventos) {
        let checkboxChecked = [...document.querySelectorAll('input[type=checkbox]:checked')];
        checkboxChecked = checkboxChecked.map(e=> e.value)
        
        let arregloFiltrado = arregloEventos
        if(checkboxChecked.length != 0){
          arregloFiltrado = arregloEventos.filter(evento => checkboxChecked.includes(evento.category))
        }
        return arregloFiltrado
      }
*/
    })
  
  
    .catch(error => console.log(error));