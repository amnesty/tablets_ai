/* JS especifico para la ponderación de las cantidades de las cuotas en función de la periodicidad */

jQuery(function($) {

  function valores_mensuales(){
    $('.cuota-1').show();
    $('.cuota-2').show();
    $('.cuota-3').show();
    $('.cuota-4').hide();
    $('.cuota-5').hide();
    $('.cuota-6').hide();
    $('.cuota-7').hide();
    $('.cuota-8').hide();
    $('.cuota-9').hide();
    $('.cuota-10').hide();
    $('.cuota-11').hide();
    $('.cuota-12').hide();
  }

  function valores_trimestrales(){
    $('.cuota-1').hide();
    $('.cuota-2').hide();
    $('.cuota-3').hide();
    $('.cuota-4').show();
    $('.cuota-5').show();
    $('.cuota-6').show();
    $('.cuota-7').hide();
    $('.cuota-8').hide();
    $('.cuota-9').hide();
    $('.cuota-10').hide();
    $('.cuota-11').hide();
    $('.cuota-12').hide();
  }

  function valores_semestrales(){
    $('.cuota-1').hide();
    $('.cuota-2').hide();
    $('.cuota-3').hide();
    $('.cuota-4').hide();
    $('.cuota-5').hide();
    $('.cuota-6').hide();
    $('.cuota-7').show();
    $('.cuota-8').show();
    $('.cuota-9').show();
    $('.cuota-10').hide();
    $('.cuota-11').hide();
    $('.cuota-12').hide();
  }

  function valores_anuales(){
    $('.cuota-1').hide();
    $('.cuota-2').hide();
    $('.cuota-3').hide();
    $('.cuota-4').hide();
    $('.cuota-5').hide();
    $('.cuota-6').hide();
    $('.cuota-7').hide();
    $('.cuota-8').hide();
    $('.cuota-9').hide();
    $('.cuota-10').show();
    $('.cuota-11').show();
    $('.cuota-12').show();
  }

  // Al inicializar, añadimos a cada cuota con un identificador cuota-x
  var class_id = 1;
  var cuotas = $(".form-item-submitted-civicrm-1-contact-1-cg15-fieldset-civicrm-1-contact-1-cg15-custom-48").filter( function(){
    return $(this).hasClass("form-type-radio");
  });
  var num_cuotas = cuotas.length;
  cuotas.each(function(){
     //marcamos todas las cuotas con un class específico menos la última que es "otra cantidad" que siempre se tiene que mostrar
     if ( class_id < num_cuotas ){
        $(this).addClass("cuota-"+class_id);
        $(this).find(".cuota").addClass("cuota-"+class_id);
     }
     class_id++;
  });

  // Al inicializar, vemos qué valores hay que poner según la periodicidad
  switch( $(".frecuencia").val() ) {
    case '12': //Mensual
    valores_mensuales();
    break;

    case '4': //Trimestral
    valores_trimestrales();
    break;

    case '2': //Semestral
    valores_semestrales();
    break;

    case '1': //Anual
    valores_anuales();
    break;
  }

  /***** Cada vez que cambia la periodicidad, revisamos los valores *****/
  $(".frecuencia").change( function() {

    // Escondemos "otra cantidad" por si acaso porque por defecto marcamos la opción del medio
    $('.capa-other-quant').hide();

    switch( $(".frecuencia").val() ) {
      case '12': //Mensual
      //Valor por defecto
      $(".cuota-2").prop("checked",true);
      valores_mensuales();
      break;

      case '4': //Trimestral
      //Valor por defecto
      $(".cuota-5").prop("checked",true);
      valores_trimestrales();
      break;

      case '2': //Semestral
      //Valor por defecto
      $(".cuota-8").prop("checked",true);
      valores_semestrales();
      break;

      case '1': //Anual
      //Valor por defecto
      $(".cuota-11").prop("checked",true);
      valores_anuales();
      break;
    }

  });

});
