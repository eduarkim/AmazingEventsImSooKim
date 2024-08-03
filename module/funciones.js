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
           <a href="../details.html?id=${arregloEventos[i]._id}" class="btn btn-primary">Details</a>
         
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

 export function filtroTexto(arregloEventos) {
    let texto = document.getElementById("buscador").value.toLowerCase();
    let arregloFiltrado = arregloEventos
    if(texto != null || texto != undefined) {
      arregloFiltrado = arregloEventos.filter(evento => evento.name.toLowerCase().includes(texto) || 
      evento.description.toLowerCase().includes(texto));
    }
    return arregloFiltrado;
  }
  
 export function filtroChecks(arregloEventos) {
    let checkboxChecked = [...document.querySelectorAll('input[type=checkbox]:checked')];
    checkboxChecked = checkboxChecked.map(e=> e.value)
    
    let arregloFiltrado = arregloEventos
    if(checkboxChecked.length != 0){
      arregloFiltrado = arregloEventos.filter(evento => checkboxChecked.includes(evento.category))
    }
    return arregloFiltrado
  }
    
  export function cargarDetalles(evento, container) {
   
   
    let card = document.createElement("div");
    card.className = "card-details card border-success mb-3";
      container.innerHTML = `
          <div class="card mb-8">
              <div class="row g-0">
                  <div class="col-md-6">
                      <img src=${evento.image} class="img-fluid rounded-start" alt=${evento.name}>
                  </div>
                  <div class="col-md-6">
                      <div class="card-body">
                           <h5 class="card-title">${evento.name}</h5>
                            <p class="card-text">${evento.description}</p>
                            <p class="card-text">Date: ${evento.date}</p>
                            <p class="card-text">Category: ${evento.category}</p>
                            <p class="card-text">Place: ${evento.place}</p>
                            <p class="card-text">Capacity: ${evento.capacity}</p>
                            <p class="card-text">Assistance: ${evento.assistance ? evento.assistance : "No hay información"}</p>
                            <p class="card-text">Estimate: ${evento.estimate ? evento.estimate : "No hay información"}</p>
                            <p class="card-text">Price: US$ ${evento.price}</p>
                      </div>
                  </div>
              </div>
          </div>
      `;
      container.appendChild(card);
  
  } 

  /*

Events Stadistics
Events with highest % of assistance	Events with lowest % of assistance	Events with larger capacity


  */
