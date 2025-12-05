document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const emailInput = document.getElementById('email').value.trim();
  const passwordInput = document.getElementById('password').value.trim();

  // Credenciales predefinidas
  const validEmail = "admin@ecopulse.com";
  const validPassword = "Eco1234";

  if (emailInput === validEmail && passwordInput === validPassword) {
    alert("Inicio de sesión exitoso");
    // Aquí podrías redirigir a otra página si lo deseas
    // window.location.href = "dashboard.html";
  } else {
    alert("Correo o contraseña incorrectos");
  }
});
