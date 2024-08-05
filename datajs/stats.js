document.addEventListener("DOMContentLoaded", async () => {
  const dataUrl = "https://aulamindhub.github.io/amazing-api/events.json";
  const containerTables = document.getElementById("contenedordetablas");

  const fetchDataTables = async () => {
    try {
      const response = await fetch(dataUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const dataTablas = await fetchDataTables(); // toda la data global


  const datatotal = dataTablas.events; // data de los eventos totales

  const pasadosData = dataTablas.events.filter(
    (event) => event.date <= dataTablas.currentDate
  );

  const futurosData = dataTablas.events.filter(
    (event) => event.date > dataTablas.currentDate
  );

  const categoriasPastEvents = Array.from(
    new Set(pasadosData.map((item) => item.category))
  );

  const categoriasUpcomingEvents = Array.from(
    new Set(futurosData.map((item) => item.category))
  );

  function calcularMayor(eventos) {
    let porcentaje = 0;
    let title = "";
    let asistencia = 0;
    let capacidad = 0;
 //   let imagen = "";
    eventos.forEach((evento) => {
      const numero = (evento.assistance / evento.capacity) * 100;
      if (numero > porcentaje) {
        porcentaje = numero;
        title = evento.name;
        asistencia = evento.assistance;
        capacidad = evento.capacity;
   //     imagen = evento.image;
      }
    });
    return `El mayor es ${title} con ${porcentaje.toFixed(2)}% de asistencia, (con una asistencia de ${asistencia.toLocaleString('es-AR')}, sobre una capacidad de ${capacidad.toLocaleString('es-AR')})`
  }
  //+`<div style="text-align: center;"><img id="imagentabla" src=${imagen} class="img-fluid rounded-start" alt="${title}"></div>`;


  function calcularMenor(eventos) {
    let porcentaje = 100;
    let title = "";
    let asistencia = 0;
    let capacidad = 0;
   // let imagen = "";
    eventos.forEach((evento) => {
      const numero = (evento.assistance / evento.capacity) * 100;
      if (numero < porcentaje) {
        porcentaje = numero;
        title = evento.name;
        asistencia = evento.assistance;
        capacidad = evento.capacity;
 //       imagen = evento.image;
      }
    });
    return `El menor es ${title} con ${porcentaje}% de asistencia (con una asistencia de ${asistencia.toLocaleString('es-AR')}, sobre una capacidad de ${capacidad.toLocaleString('es-AR')})`
  }
  //+`<br><div style="text-align: center;"><img id="imagentabla" src=${imagen} class="img-fluid rounded-start" alt="${title}"></div>`;
  function mayorCapacidad(eventos) {
    let mayor = 0;
    let title = "";
  //  let imagen = "";
    eventos.forEach((evento) => {
      if (evento.capacity > mayor) {
        mayor = evento.capacity;
        title = evento.name;
   //     imagen = evento.image;
      }
    });
    return `El mayor es ${title} con ${mayor.toLocaleString('es-AR')} de capacidad`
  }
  //+`<br><div style="text-align: center;"><img id="imagentabla" src=${imagen} class="img-fluid rounded-start" alt="${title}"></div>`;
  function infoPastEventsPorcategorias(categorias, eventos) {
    const array = [];
    categorias.forEach((categoria) => {
      const catEvents = eventos.filter((evento) => categoria === evento.category);
      const ingresos = catEvents.reduce(
        (acum, evento) =>
          acum + evento.price * (evento.estimate || evento.assistance),
        0
      );
      const attendance = catEvents.reduce(
        (acum, event) =>
          acum + ((event.assistance || event.estimate) / event.capacity) * 100,
        0
      );
      array.push({
        categoria,
        ingresos,
        attendance: attendance / catEvents.length,
      });
    });
    return array;
  }

  const infoPastEventsByCats = infoPastEventsPorcategorias(
    categoriasPastEvents,
    pasadosData
  );

  function infoUpcomingEventsPorcategorias(categorias, eventos) {
    const array = [];
    categorias.forEach((category) => {
      const catEvents = eventos.filter((event) => category === event.category);
      const ingresos = catEvents.reduce(
        (acum, event) =>
          acum + event.price * (event.estimate || event.assistance),
        0
      );
      const attendance = catEvents.reduce(
        (acum, event) =>
          acum + ((event.assistance || event.estimate) / event.capacity) * 100,
        0
      );
      array.push({
        category,
        ingresos,
        attendance: attendance / catEvents.length,
      });
    });
    return array;
  }

  const infoUpcomingEventsByCats = infoUpcomingEventsPorcategorias(
    categoriasUpcomingEvents,
    futurosData
  );



  const table = document.createElement("table");
  table.className =
  "table table-hover table-hover-custom table-striped caption-top";
  table.innerHTML = `
  <thead class="table-dark">
  <tr>
  <th colspan="3" class="text-center text-white fw-bold">Events Statistics</th></tr
    <tr>
      <th>Event with the highest percentage of attendance</th>
      <th>Event with the lowest percentage of attendance</th>
      <th>Event with larger capacity</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>${calcularMayor(pasadosData)}</td>
      <td>${calcularMenor(pasadosData)}</td>
      <td>${mayorCapacidad(datatotal)}</td>
    </tr>
  </tbody>`;

  const tableUpcoming = document.createElement("table");
  const tbodyTableUpcoming = document.createElement("tbody");
  tableUpcoming.className =
  "table table-hover table-hover-custom table-striped caption-top";
 
  tableUpcoming.innerHTML =
    `<thead class="table-dark">
    <tr>
      <th colspan="3" class="text-center text-white fw-bold">  Upcoming events statistics</th>
    </tr>
    <tr>
      <th>Categories</th>
      <th>Revenues</th>
      <th>Attendance</th>
    </tr>
  </thead>`;

  for (const event of infoUpcomingEventsByCats) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${event.category}</td>
        <td>${event.ingresos.toLocaleString('es-AR')} u$u</td>
        <td>${event.attendance.toFixed(2)} %</td>`;
    tbodyTableUpcoming.appendChild(tr);
  }

  tableUpcoming.appendChild(tbodyTableUpcoming);


  const tablePast = document.createElement("table");
  const tbodyTablePast = document.createElement("tbody");
  tablePast.className =
  "table table-hover table-hover-custom table-striped  caption-top";
  //  "table caption-top table-secondary table-bordered border-success";
  tablePast.innerHTML =
    ` <thead class="table-dark">
    <tr>
      <th colspan="3" class="text-center text-white fw-bold">Past Events Statistics</th>
    </tr>
    <tr>
      <th>Categories</th>
      <th>Revenues</th>
      <th>Attendance</th>
    </tr>
  </thead>`;
  for (const event of infoPastEventsByCats) {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${event.categoria}</td>
      <td>${event.ingresos.toLocaleString('es-AR')} u$u</td>
      <td>${event.attendance.toFixed(2)} %</td>`;
    tbodyTablePast.appendChild(tr);
  }

  tablePast.appendChild(tbodyTablePast);



  
  containerTables.append(table, tablePast, tableUpcoming);
});
