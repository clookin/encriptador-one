let inputTexto = document.getElementById('input-encriptador'); // Obtiene el elemento input
const mensajeDiv = document.getElementById('mensaje');

document.addEventListener('DOMContentLoaded', (event) => {
  const cerrarBtn = document.getElementById('cerrar-instrucciones');
  const instruccionesDiv = document.getElementById('instrucciones');

  cerrarBtn.addEventListener('click', () => {
    instruccionesDiv.style.display = 'none';
  });
});

function mostrarMensaje(texto, tipo) {
  mensajeDiv.textContent = texto; // Contenido del texto
  mensajeDiv.className = `mensaje ${tipo}`; // Modificador de estilos segun el segundo argumento Success o error
  mensajeDiv.style.display = 'block'; //modificador de apariencia
}

function validarTexto(texto){
  const validacion = /^[a-z-\s]*$/; //Expresion regular para validar caracteres especiales
  return validacion.test(texto)
}

function encriptar() {
  const texto = inputTexto.value.trim().toLowerCase(); // Obtiene y recorta el texto del input tambien lo hace minuscula
  if (texto !== "") {
    if (validarTexto(texto)){
      const textoSeparado = separadorTexto(texto); // Separa el texto en caracteres
      inputTexto.value = codificadortexto(textoSeparado); // Encripta el texto y lo asigna al input
      mostrarMensaje('Texto encriptado correctamente.', 'success');
      setTimeout(() => {
        mensajeDiv.style.display = 'none';
      }, 3000);
    } else {
      mostrarMensaje('El texto contiene caracteres no permitidos: Mayusculas y caracteres especiales.', 'error');
      setTimeout(() => {
        mensajeDiv.style.display = 'none';
      }, 4000);
    }
  } else {
    mostrarMensaje('Debes ingresar un texto para encriptar.', 'error') // Mensaje si el input está vacío
    setTimeout(() => {
      mensajeDiv.style.display = 'none';
    }, 3000);
  }
}

function separadorTexto(texto) {
  let textoSeparado = texto.split(''); // Convierte el texto en un array de caracteres
  return textoSeparado;
}

function codificadortexto(textoSeparado) {
  let textoEncriptado = "";
  let textoCodificado = [];
  let vocales = ["a", "e", "i", "o", "u"];
  let codigos = { a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat" };
  for (let i = 0; i < textoSeparado.length; i++) {
    if (!vocales.includes(textoSeparado[i])) {
      textoCodificado.push(textoSeparado[i]); // Mantiene consonantes sin cambios
    } else {
      textoCodificado.push(codigos[textoSeparado[i]]); // Reemplaza vocales por códigos
    }
  }
  textoEncriptado = textoCodificado.join(''); // Une el array en una cadena
  return textoEncriptado;
}

function desencriptar() {
  const texto = inputTexto.value.trim().toLowerCase(); // Obtiene y recorta el texto del input
  if (texto !== "") {
    const textoDescencriptado = decodificadorTexto(texto); // Desencripta el texto
    inputTexto.value = textoDescencriptado; // Asigna el texto desencriptado al input
    return textoDescencriptado;
  }
}
function decodificadorTexto(texto) {
  let codigos = { ai: "a", enter: "e", imes: "i", ober: "o", ufat: "u" };
  let textoDescencriptado = texto;
  for (let codigo in codigos) {
    textoDescencriptado = textoDescencriptado.replaceAll(codigo, codigos[codigo]); // Reemplaza códigos por vocales
  }
  mostrarMensaje('Texto desencriptado correctamente.','success');
  setTimeout(() => {
    mensajeDiv.style.display = 'none';
  }, 3000);
  return textoDescencriptado;
}

function copiarTexto (){
  const texto = inputTexto.value.trim();
  navigator.clipboard.writeText(texto).then(function() { //Funcion nativa para copiar texto del textarea en el portapapeles
    mostrarMensaje('Texto copiado en el portapapeles.','success');
    setTimeout(() => {
      mensajeDiv.style.display = 'none';
    }, 3000);
}).catch(function(err) {
    mostrarMensaje('Error al copiar texto: ', 'error');
    setTimeout(() => {
      mensajeDiv.style.display = 'none';
    }, 3000);
});
}