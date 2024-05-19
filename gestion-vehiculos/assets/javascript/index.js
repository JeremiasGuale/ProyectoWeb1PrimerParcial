document.addEventListener("DOMContentLoaded", function() {
    const userBtn = document.getElementById('user-btn');
    const adminBtn = document.getElementById('admin-btn');
    const registroBtn = document.getElementById('regitro-btn');
  
    userBtn.addEventListener('click', function() {
        window.open('sesionPerfil.html', '_blank' );
    });
  
    adminBtn.addEventListener('click', function() {
        window.open('inicioSesionAdministrador.html', '_blank' );
    });
    registroBtn.addEventListener('click', function() {
        window.open('registroUsuario.html', '_blank' );
    });
  });
  