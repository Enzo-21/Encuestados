/*
 * Controlador
 */
var Controlador = function (modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function (pregunta, respuestas) {
    this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function (idPregunta) {
    this.modelo.borrarPregunta(idPregunta);
  },

  borrarTodas: function () {
    this.modelo.borrarTodas();
  },

  editarPregunta: function (idPregunta, preguntaNueva) {
    this.modelo.editarPregunta(idPregunta, preguntaNueva);
  },

  guardar: function () {
    this.modelo.guardar();
  },

  recuperar: function () {
    this.modelo.recuperar();
  },

  agregarVoto: function (nombrePregunta,respuestaSeleccionada) {
   
    this.modelo.agregarVotos(nombrePregunta,respuestaSeleccionada);
  }
};