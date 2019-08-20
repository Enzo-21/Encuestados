/*
 * Vista administrador
 */
var VistaAdministrador = function (modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaBorrada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.todasBorradas.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntaEditada.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntasLocal.suscribir(function () {
    contexto.reconstruirLista();
  });

  this.modelo.preguntasRecuperadas.suscribir(function () {
    contexto.reconstruirLista();
  });
  
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function () {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
    
  },

  construirElementoPregunta: function (pregunta) {
    var contexto = this;
    var nuevoItem;
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"

    nuevoItem = $(`<li class='list-group-item' id=${pregunta.id}>${pregunta.textoPregunta}</li>`);

    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function (resp) {
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;
  },


  reconstruirLista: function () {
    ``
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i) {
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function () {
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function () {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function () {
        respuesta = $(this).val(); // Este es el texto de cada respuesta
        cantVotos = 0; // Cantidad de votos seteado en 0
        respuestas.push({'textoRespuesta': respuesta, 'cantidad': cantVotos}) // Se pushea al arreglo de respuestas cada respuesta como un objeto.
      })
      respuestas.pop(); // Borra la coma de más (borra un elemento innecesario del array)
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos

    e.botonBorrarPregunta.click( function () {
      var id = parseInt($('.list-group-item.active').attr('id'));
      id ? contexto.controlador.borrarPregunta(id) : alert('No hay pregunta seleccionada');
    });

    e.borrarTodo.click( function () {
      contexto.controlador.borrarTodas();
    })

    e.botonEditarPregunta.click( function() {  
      var idPregunta = parseInt($('.list-group-item.active').attr('id'));
      idPregunta ? contexto.controlador.editarPregunta(idPregunta) : alert('No hay pregunta seleccionada');
    });
  },

  limpiarFormulario: function () {
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
