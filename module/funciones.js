export function pintarTarjetas(arregloEventos, contenedor) {
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
  
  export function pintarCheckBoxs(arregloCategorias, contenedorcheck) {
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
/*
 export function filtroTexto(arregloEventos, texto) {
  //  let texto = document.getElementById("buscador").value.toLowerCase();
    let arregloFiltrado = arregloEventos
    if(texto != null || texto != undefined) {
      arregloFiltrado = arregloEventos.filter(evento => evento.name.toLowerCase().includes(texto) || 
      evento.description.toLowerCase().includes(texto));
    }
    return arregloFiltrado;
  }
  
 export function filtroChecks(arregloEventos, checkboxChecked) {
  //  let checkboxChecked = [...document.querySelectorAll('input[type=checkbox]:checked')];
    checkboxChecked = checkboxChecked.map(e=> e.value)
    
    let arregloFiltrado = arregloEventos
    if(checkboxChecked.length != 0){
      arregloFiltrado = arregloEventos.filter(evento => checkboxChecked.includes(evento.category))
    }
    return arregloFiltrado
  }
    */


  /*

Events Stadistics
Events with highest % of assistance	Events with lowest % of assistance	Events with larger capacity


  */
fetch("https://aulamindhub.github.io/amazing-api/events.json")
  .then(response => response.json())
  .then(data => {
    let eventoMayorAsistencia = null;
    let mayorPorcentaje = 0;

    data.events.forEach(evento => {
      let porcentaje = 0;
      if (evento.assistance) {
        porcentaje = (evento.assistance / evento.capacity) * 100;
      } else if (evento.estimate) {
        porcentaje = (evento.estimate / evento.capacity) * 100;
      }

      if (porcentaje > mayorPorcentaje) {
        mayorPorcentaje = porcentaje;
        eventoMayorAsistencia = evento;
      }
    });
l



    let resultado = `
      El evento con mayor porcentaje de asistencia es:
      Nombre: ${eventoMayorAsistencia.name}
      Categoría: ${eventoMayorAsistencia.category}
      Porcentaje de asistencia: ${mayorPorcentaje.toFixed(2)}%
    `;

    let contenedorResultado = document.getElementById("contenedor-resultado");
    contenedorResultado.textContent = resultado;

})
  .catch(error => console.error('Error al obtener los datos:', error));
  /*

   <tr>
            <td id="highest_assistance"></td>
            <td id="lowest_assistance"></td>:
            <td id="largest_capacity"></td>:
          </tr>
  */