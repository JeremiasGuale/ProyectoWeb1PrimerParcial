document.addEventListener("DOMContentLoaded", function() {
    const listaRegistros = document.getElementById('lista-registros');
  
    // Obtener registros completos
    const registrosCompletos = JSON.parse(localStorage.getItem('registrosCompletos')) || [];
    registrosCompletos.forEach((registro, index) => {
      agregarRegistro(registro, index);
    });
  
    // Función para agregar registro a la lista
    function agregarRegistro(registro, index) {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>Nombre:</strong> ${registro.nombre} ${registro.apellido}<br>
        <strong>Fecha y Hora de Entrada:</strong> ${new Date(registro.fechaHoraEntrada).toLocaleString()}<br>
        <strong>Fecha y Hora de Salida:</strong> ${new Date(registro.fechaHoraSalida).toLocaleString()}<br>
        <strong>ID de Usuario:</strong> ${registro.usuarioId}<br>
      `;
  
      // Botón para eliminar registro
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', function() {
        eliminarRegistro(index); // Pasamos el índice del registro a eliminar
        li.remove(); // Eliminar el elemento de la lista
      });
      li.appendChild(btnEliminar);
  
      listaRegistros.appendChild(li);
    }
  
    // Función para eliminar registro
    function eliminarRegistro(index) {
      const registrosCompletos = JSON.parse(localStorage.getItem('registrosCompletos')) || [];
      registrosCompletos.splice(index, 1); // Eliminamos el registro en el índice especificado
      localStorage.setItem('registrosCompletos', JSON.stringify(registrosCompletos));
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    const listaRegistros = document.getElementById('lista-registros');

    // Obtener registros completos
    const registrosCompletos = JSON.parse(localStorage.getItem('registrosCompletos')) || [];
    registrosCompletos.forEach((registro, index) => {
      agregarRegistro(registro, index);
    });

    // Botón para generar el PDF
    const btnGenerarPDF = document.createElement('button');
    btnGenerarPDF.textContent = 'Generar PDF';
    btnGenerarPDF.addEventListener('click', function() {
      generarPDF();
    });
    listaRegistros.parentNode.insertBefore(btnGenerarPDF, listaRegistros.nextSibling);

    // Función para agregar registro a la lista
    function agregarRegistro(registro, index) {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>---------------------------------</strong><br>
        <strong>Lista a imprimir</strong><br>
        <strong>Nombre:</strong> ${registro.nombre} ${registro.apellido}<br>
        <strong>Fecha y Hora de Entrada:</strong> ${new Date(registro.fechaHoraEntrada).toLocaleString()}<br>
        <strong>Fecha y Hora de Salida:</strong> ${new Date(registro.fechaHoraSalida).toLocaleString()}<br>
        <strong>ID de Usuario:</strong> ${registro.usuarioId}<br>
      `;

      listaRegistros.appendChild(li);
    }

    // Función para generar el PDF
    function generarPDF() {
      const doc = new jsPDF();

      // Iterar sobre los registros para agregarlos al PDF
      registrosCompletos.forEach((registro, index) => {
        const y = 10 + index * 60;
        doc.text(`Nombre: ${registro.nombre} ${registro.apellido}`, 10, y);
        doc.text(`Fecha y Hora de Entrada: ${new Date(registro.fechaHoraEntrada).toLocaleString()}`, 10, y + 10);
        doc.text(`Fecha y Hora de Salida: ${new Date(registro.fechaHoraSalida).toLocaleString()}`, 10, y + 20);
        doc.text(`ID de Usuario: ${registro.usuarioId}`, 10, y + 30);
        doc.text('----------------------------------------', 10, y + 40);
      });

      // Guardar el PDF
      doc.save('registros.pdf');
    }

    
});

  