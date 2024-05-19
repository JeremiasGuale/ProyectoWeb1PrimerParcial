// Función para cargar y mostrar los registros completos
function mostrarRegistrosCompletos() {
    const listaRegistrosCompletos = document.getElementById('lista-registros-completos');

    // Obtener los registros completos desde el Local Storage
    const registrosCompletos = JSON.parse(localStorage.getItem('registrosCompletos')) || [];

    // Limpiar la lista antes de mostrar los registros
    listaRegistrosCompletos.innerHTML = '';

    // Iterar sobre los registros completos y agregarlos a la lista
    registrosCompletos.forEach(registro => {
      const li = document.createElement('li');
      li.textContent = `Nombre: ${registro.nombre} ${registro.apellido}, Hora de Entrada: ${registro.fechaHoraEntrada}, Hora de Salida: ${registro.fechaHoraSalida}`;
      listaRegistrosCompletos.appendChild(li);
    });
  }
  // Función para mostrar el perfil del usuario
  // Función para mostrar el perfil del usuario
  function mostrarPerfil(usuario) {
    const perfilContainer = document.getElementById('perfil-container');
    perfilContainer.innerHTML = `
      <h2>Perfil de ${usuario.nombre} ${usuario.apellido}</h2>
      <p>Nombre: ${usuario.nombre}</p>
      <p>Apellido: ${usuario.apellido}</p>
      <p>Facultad: ${usuario.facultad}</p>
      <p>Cédula: ${usuario.cedula}</p>
      <p>Correo: ${usuario.correo}</p>
    `;

    // Mostrar la sección de perfil
    const seccionPerfil = document.getElementById('seccion-perfil');
    seccionPerfil.style.display = 'block';

    // Ocultar la sección de inicio de sesión
    const seccionInicioSesion = document.getElementById('seccion-inicio-sesion');
    seccionInicioSesion.style.display = 'none';

    // Mostrar la sección de registros completos
    const seccionRegistrosCompletos = document.getElementById('registros-completos');
    seccionRegistrosCompletos.style.display = 'block';

    // Mostrar los registros completos
    mostrarRegistrosCompletos();
  }


  // Función para registrar la hora de entrada del vehículo
  function registrarHoraEntrada() {
      const usuarioId = localStorage.getItem('userId'); // Obtener el ID del usuario almacenado
console.log("ID de usuario (almacenado como string):", usuarioId); // Agregar para depuración
console.log("Tipo de usuarioId:", typeof usuarioId); // Agregar para depuración

// Convertir el ID de usuario a un entero para comparación
const usuarioIdEntero = parseInt(usuarioId);
console.log("ID de usuario (convertido a entero):", usuarioIdEntero); // Agregar para depuración

// Obtener los datos del usuario desde el Local Storage
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
console.log("Usuarios almacenados:", usuarios); // Agregar para depuración

const usuario = usuarios.find(usuario => usuario.id === usuarioIdEntero);
console.log("Usuario encontrado:", usuario); // Agregar para depuración
    // Verificar que el usuario esté definido antes de usar sus propiedades
    if (usuario) {
      const fechaHoraEntrada = new Date(); // Obtener la fecha y hora actual
      
      // Guardar los datos de entrada en un arreglo en el Local Storage
      const registroEntrada = {
        usuarioId: usuarioId,
        fechaHoraEntrada: fechaHoraEntrada.toISOString(), // Convertir la fecha a un formato de cadena para almacenarla
        nombre: usuario.nombre,
        apellido: usuario.apellido
      };

      // Obtener los registros existentes o inicializar un nuevo arreglo si no hay ninguno
      const registrosEntrada = JSON.parse(localStorage.getItem('registrosEntrada')) || [];
      
      // Agregar el nuevo registro al arreglo
      registrosEntrada.push(registroEntrada);
      
      // Guardar los registros en el Local Storage
      localStorage.setItem('registrosEntrada', JSON.stringify(registrosEntrada));
      
      alert('Hora de entrada registrada correctamente.');
    } else {
      alert('No se encontró el usuario.');
    }
  }

  // Función para registrar la fecha de salida
  function registrarFechaSalida() {
const usuarioId = localStorage.getItem('userId'); // Obtener el ID del usuario almacenado
const fechaHoraSalida = new Date(); // Obtener la fecha y hora actual

// Obtener los registros de entrada desde el Local Storage
const registrosEntrada = JSON.parse(localStorage.getItem('registrosEntrada')) || [];

// Buscar el registro de entrada del usuario actual
      const registroEntrada = registrosEntrada.find(registro => registro.usuarioId === usuarioId);
      
      // Verificar si se encontró un registro de entrada para este usuario
      if (registroEntrada) {
          // Calcular la duración de la visita
          const fechaHoraEntrada = new Date(registroEntrada.fechaHoraEntrada);
          const duracionVisitaMs = fechaHoraSalida - fechaHoraEntrada;
          const duracionVisitaMin = duracionVisitaMs / (1000 * 60);
          
          alert(`Su visita duró ${duracionVisitaMin} minutos.`);
          
          // Crear un nuevo registro con la información de entrada y salida
          const registroCompleto = {
          usuarioId: registroEntrada.usuarioId,
          fechaHoraEntrada: registroEntrada.fechaHoraEntrada,
          fechaHoraSalida: fechaHoraSalida.toISOString(), // Convertir la fecha a un formato de cadena para almacenarla
          nombre: registroEntrada.nombre,
          apellido: registroEntrada.apellido
          };

          // Obtener los registros completos existentes o inicializar un nuevo arreglo si no hay ninguno
          const registrosCompletos = JSON.parse(localStorage.getItem('registrosCompletos')) || [];
          
          // Agregar el nuevo registro completo al arreglo
          registrosCompletos.push(registroCompleto);
          
          // Guardar los registros completos en el Local Storage
          localStorage.setItem('registrosCompletos', JSON.stringify(registrosCompletos));
      } else {
          alert('No se encontró registro de entrada para este usuario.');
      }
  }


  const formularioInicioSesion = document.getElementById('inicio-sesion-form');
  const seccionInicioSesion = document.getElementById('seccion-inicio-sesion');
  const seccionPerfil = document.getElementById('seccion-perfil');

  // Manejo del inicio de sesión
  formularioInicioSesion.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    // Validación de inicio de sesión
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(usuario => usuario.correo === correo && usuario.contrasena === contrasena);

    if (usuario) {
      localStorage.setItem('userId', usuario.id); // Guardar el ID del usuario en el Local Storage
      mostrarPerfil(usuario); // Mostrar el perfil del usuario
      seccionInicioSesion.style.display = 'none';
      seccionPerfil.style.display = 'block';
    } else {
      alert('Correo electrónico o contraseña incorrectos.');
    }
  });
  // Mostrar la sección de registros completos
  const seccionRegistrosCompletos = document.getElementById('registros-completos');
    seccionRegistrosCompletos.style.display = 'block';


  registroBtn.addEventListener('click', function() {
      window.open('registroUsuario.html', '_blank' );
  });
  adminBtn.addEventListener('click', function() {
      window.open('inicioSesionAdministrador.html', '_blank' );
  });