const btnImprimirPDF = document.createElement('button');
btnImprimirPDF.textContent = 'Imprimir como PDF';
btnImprimirPDF.addEventListener('click', function() {
  const pdf = new pdf();
  doc.text('Registros de Entrada y Salida', 10, 10);

  const registrosEntrada = JSON.parse(localStorage.getItem('registrosEntrada')) || [];
  const registrosSalida = JSON.parse(localStorage.getItem('registrosSalida')) || [];

  let y = 30;
  registrosEntrada.forEach(registro => {
    doc.text(`Nombre: ${registro.nombre} ${registro.apellido}, Fecha y Hora: ${registro.fechaHora}`, 10, y);
    y += 10;
  });

  registrosSalida.forEach(registro => {
    doc.text(`Nombre: ${registro.nombre} ${registro.apellido}, Fecha y Hora: ${registro.fechaHora}`, 10, y);
    y += 10;
  });

  doc.save('registros.pdf');
});

document.body.appendChild(btnImprimirPDF);
