/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.todasBorradas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntasLocal = new Evento(this);
  this.preguntasRecuperadas = new Evento(this);
  this.preguntaVotada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    idMasAlto = 0;
    
    this.preguntas.forEach(pregunta => {
      idMasAlto = pregunta.id;
    });

    return(idMasAlto);
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.preguntaAgregada.notificar();
    this.guardar();
  },

  borrarPregunta: function (idPregunta) {
    this.preguntas = this.preguntas.filter(preguntas => preguntas.id !== idPregunta);
    this.preguntaBorrada.notificar();
    this.guardar();
  },

  borrarTodas: function() {
    this.preguntas = [];
    this.todasBorradas.notificar();
    this.guardar();
  },

  editarPregunta: function (idPregunta, preguntaNueva) {
    this.pregunta = this.preguntas.filter(preguntas => preguntas.id === idPregunta);
    preguntaNueva = prompt('Ingrese nueva pregunta:');
    this.pregunta[0].textoPregunta = preguntaNueva;
    this.preguntaEditada.notificar();
    this.guardar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  recuperar: function() {
    let preguntasParse = JSON.parse(localStorage.getItem('preguntas'));

    for (const pregunta of preguntasParse) {
      this.preguntas.push(pregunta)
    };

    this.preguntasRecuperadas.notificar();
  },


  
  agregarVotos: function (nombrePregunta, respuestaSeleccionada) {

    this.preguntas.forEach(pregunta => {
      if (pregunta.textoPregunta === nombrePregunta) {
        for (const respuesta of pregunta.cantidadPorRespuesta) {
         if (respuesta.textoRespuesta === respuestaSeleccionada) { 
        ++respuesta.cantidad
        //console.log('La respuesta '+ respuesta.textoRespuesta + ' tiene ' + respuesta.cantidad + ' votos.')
         }
       }
      }
    });
    this.guardar();
    this.preguntaVotada.notificar(); 
        
  }

};
