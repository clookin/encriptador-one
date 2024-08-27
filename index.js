let inputTexto = document.getElementById('input-encriptador'); // Obtiene el elemento input

function mostrarMensaje(texto, tipo) {
  mensajeDiv.textContent = texto;
  mensajeDiv.className = `mensaje ${tipo}`;
  mensajeDiv.style.display = 'block';
}

function validarTexto(texto){
  const validacion = /^[a-zA-Z\s]*$/; //Expresion regular para validar caracteres especiales
  return validacion.test(texto)
}

function encriptar() {
  const texto = inputTexto.value.trim(); // Obtiene y recorta el texto del input
  if (texto !== "") {
    if (validarTexto(texto)){
      const textoSeparado = separadorTexto(texto); // Separa el texto en caracteres
      inputTexto.value = codificadortexto(textoSeparado); // Encripta el texto y lo asigna al input
      mostrarMensaje('Texto encriptado correctamente.', 'success');
    } else {
      mostrarMensaje('El texto contiene caracteres no permitidos.', 'error');
      
    }
  } else {
    console.log('ingresa un texto'); // Mensaje si el input está vacío
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
  console.log(textoEncriptado); // Muestra el texto encriptado en la consola
  return textoEncriptado;
}

function desencriptar() {
  const texto = inputTexto.value.trim(); // Obtiene y recorta el texto del input
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
  return textoDescencriptado;
}

function copiarTexto (){
  const texto = inputTexto.value.trim();
  navigator.clipboard.writeText(texto).then(function() {
    console.log('Texto copiado al portapapeles');
}).catch(function(err) {
    console.error('Error al copiar texto: ', err);
});
}