export function pintarCheckboxs(eventos, contenCheckboxs) {
    // const contenCheckboxs = document.getElementById("divcheckboxs");
     const categories = [...new Set(eventos.map(event => event.category))];
     console.log("Categorías:", categories);
   
     categories.forEach((category, index) => {
         const checkbox = document.createElement('div');
         checkbox.className = "form-check form-check-inline";
         checkbox.innerHTML = `
             <input class="form-check-input" type="checkbox" value="${category}" id="checkbox-categoria-${index}" name="checkcategory">
             <label class="form-check-label" for="checkbox-categoria-${index}">
                 ${category}
             </label>
         `;
         contenCheckboxs.appendChild(checkbox);
     });
   }

export function pintarTarjetas(eventos, contenedor) {
    //   const contenedor = document.getElementById("divtarjetas");
       contenedor.innerHTML = ''; 
   
       eventos.forEach(evento => {
           const tarjeta = document.createElement('div');
           tarjeta.className = "card col d-flex";
           tarjeta.dataset.category = evento.category; 
   
           tarjeta.innerHTML = `
               <div class="card col d-flex">
                   <img class="card-img-top" src="${evento.image}" alt="${evento.name}">
                   <div class="card-body d-flex flex-column flex-grow-1">
                       <h5 class="card-title">${evento.name}</h5>
                       <p class="card-text">${evento.description}</p>
                       <p class="card-text">${evento.category}</p>
                   </div>
                   <div class="card-footer d-flex justify-content-between">
                       <span>${evento.price}</span>
                       <a href="./details.html?id=${evento._id}" class="btn btn-primary">Details</a>
                   </div>
               </div>
           `;
   
           contenedor.appendChild(tarjeta);
       });
   }
   

  export function filterTarjetas(selectedCategories, searchText) {
    const tarjetasContainer = document.getElementById("divtarjetas");
    const mensajeNoResultados = document.getElementById("mensajeNoResultados");
    tarjetasContainer.innerHTML = ""; 

    const filteredEvents = data.events.filter(event => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        const matchesSearchText = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearchText;
    });

    
    if (filteredEvents.length === 0) {
        mensajeNoResultados.style.display = "block"; 
    } else {
        mensajeNoResultados.style.display = "none"; 
        // Pintar las tarjetas filtradas
        filteredEvents.forEach(event => {
            const tarjeta = document.createElement('div');
            tarjeta.className = "card col d-flex"; 
            tarjeta.innerHTML = `
                <div class="card col d-flex">
                    <img class="card-img-top" src="${event.image}" alt="${event.name}">
                    <div class="card-body d-flex flex-column flex-grow-1">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                        <p class="card-text">${event.category}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <span>${event.price}</span>
                        <a href="./details.html?id=${event._id}" class="btn btn-primary">Details</a>
                    </div>
                </div>
            `;
            tarjetasContainer.appendChild(tarjeta);
        });
    }
}