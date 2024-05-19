//definir cosas
const formularioRegistro = document.getElementById('registro-form');

document.addEventListener("DOMContentLoaded", function() {
    const volverBtn = document.getElementById('volver-btn');

    volverBtn.addEventListener('click', function() {
        window.open('sesionPerfil.html'  );
    });
  });
  

formularioRegistro.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Evita la recarga automática del formulario

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;
    const tipoVehiculo = document.getElementById('tipoVehiculo').value;
    const placaVehiculo = document.getElementById('placaVehiculo').value;
    const colorVehiculo = document.getElementById('colorVehiculo').value;
    const facultad = document.getElementById('facultad').value;
    const cedula = document.getElementById('cedula').value;

    // Validación de formato de nombre y apellido
    const nombreApellidoVali = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const correoVali = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cedulaVali = /^\d{10}$/; 
    //--------------------------------------------

    // Validación de datos
    if (nombre === '' || apellido === '' || correo === '' || contrasena === '' || confirmarContrasena === '' || tipoVehiculo === '' || placaVehiculo === '' || colorVehiculo === '' || facultad === '' || cedula === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }
    if (!nombreApellidoVali.test(nombre)) {
        alert('El nombre solo puede contener letras, espacios y vocales con acentos.');
        return;
    }
    if (!nombreApellidoVali.test(apellido)) {
        alert('El apellido solo puede contener letras, espacios y vocales con acentos.');
        return;
    }
    // Validación de formato de color de vehículo
    if (!nombreApellidoVali.test(colorVehiculo)) {
        alert('El color del vehículo solo puede contener letras, espacios y vocales con acentos.');
        return;
    }
    // Validación de formato de correo electrónico
    
    if (!correoVali.test(correo)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return;
    }
    // Validación de longitud de contraseña
    if (contrasena.length < 4 || contrasena.length >10) {
        alert('La contraseña debe tener al menos 8 caracteres.');
        return;
    }
    //confirmar contra
    if (contrasena !== confirmarContrasena) {
        alert('Las contraseñas no coinciden.');
        return;
    }
    // Validación de cédula (por ejemplo, solo números y longitud exacta)
    
    if (!cedulaVali.test(cedula)) {
        alert('Por favor, ingrese una cédula válida de 10 dígitos.');
        return;
    }
    // Validación de placa de vehículo (por ejemplo, formato alfanumérico)
    if (!placaVehiculo.length == 4 ) {
        alert('Por favor, ingrese una placa de vehículo válida de 4 caracteres.');
        return;
    }
    // Guardar datos en el Local Storage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const nuevoUsuario = {
        id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
        nombre,
        apellido,
        correo,
        contrasena,
        tipoVehiculo,
        placaVehiculo,
        colorVehiculo,
        facultad,
        cedula
    };
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mensaje de éxito y redirección
    alert('Usuario registrado correctamente, cargando inicio de sesión...');
    window.location.href = 'sesionPerfil.html'; // Redirigir a la página principal
});
