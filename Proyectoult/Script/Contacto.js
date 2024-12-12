//Variables de envío correo
const KEY_PUBLICA = "WbWJf1Yar0IPGpQd1";
const SERVICE_ID = "service_tjfgu6v";
const TEMPLATE_ID = "template_au4ots6";

window.onload = function () {

  //Inicializamos el servicio
  emailjs.init(KEY_PUBLICA);

  document.getElementById("contact-form").addEventListener("submit", function (event) {
      event.preventDefault();
      //Enviamos la información del correo
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#contact-form").then(
        () => {
          //Si funciona, muestra un mensaje de confirmación
          console.log("SUCCESS!");
          
          //Sweet alert
          Swal.fire({
            //position: "top-end",
            icon: "success",
            title: "El correo se envió correctamente",
            showConfirmButton: false,
            timer: 1500
          });
          reestablecer();
        },
        (error) => {
          //Si no funciona, muestra un mensaje de error
          console.log("FAILED...", error);

          //Sweet alert error
          Swal.fire({
            title: 'Error!',
            text: 'No fue posible enviar el correo',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      );
    });
};

//Reestablece los valores de la modal
function reestablecer() {
    document.getElementById("nombre").value="";
    document.getElementById("correo").value="";
    document.getElementById("mensaje").value="";
  }
  
