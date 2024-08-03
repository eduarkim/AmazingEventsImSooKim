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