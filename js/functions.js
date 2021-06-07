jQuery(function($) {

  function modulo (divident, divisor) {
    var cDivident = '';
    var cRest = '';

    for (var i in divident ) {
        var cChar = divident[i];
        var cOperator = cRest + '' + cDivident + '' + cChar;

        if ( cOperator < parseInt(divisor) ) {
                cDivident += '' + cChar;
        } else {
                cRest = cOperator % divisor;
                if ( cRest == 0 ) {
                    cRest = '';
                }
                cDivident = '';
        }

    }
    cRest += '' + cDivident;
    if (cRest == '') {
        cRest = 0;
    }
    return cRest;
  }

  function calcularIBAN( codigoPais, ccc ){
    var pesos = {
      A:10,  		B:11,  		C:12,  		D:13,
  		E:14,  		F:15,  		G:16,  		H:17,
  		I:18,  		J:19,  		K:20,  		L:21,
  		M:22,  		N:23,  		O:24,  		P:25,
  		Q:26,  		R:27,  		S:28,  		T:29,
  		U:30,  		V:31,  		W:32,  		X:33,
  		Y:34,  		Z:35
    };

    var dividendo = ccc+''+pesos[codigoPais.substring(0,1)]+''+pesos[codigoPais.substring(1,2)]+'00';
    var resto = modulo(dividendo,97);
    var digitoControl =  (98 - resto);

    if( digitoControl < 10 ) {
      digitoControl = '0'+digitoControl;
    }

    return codigoPais+''+digitoControl+''+ccc;
  }

  function getProvince( postalcode ){

    var prefix = postalcode.substring(0,2);
    //console.log(prefix);

    var provinces = {};
    provinces['01'] = 'VI';
    provinces['02'] = 'AB';
    provinces['03'] = 'A';
    provinces['04'] = 'AL';
    provinces['05'] = 'AB';
    provinces['06'] = 'BA';
    provinces['07'] = 'PM';
    provinces['08'] = 'B';
    provinces['09'] = 'BU';
    provinces['10'] = 'CC';
    provinces['11'] = 'CA';
    provinces['12'] = 'CS';
    provinces['13'] = 'CR';
    provinces['14'] = 'CO';
    provinces['15'] = 'C';
    provinces['16'] = 'CU';
    provinces['17'] = 'GE';
    provinces['18'] = 'GR';
    provinces['19'] = 'GU';
    provinces['20'] = 'SS';
    provinces['21'] = 'H';
    provinces['22'] = 'HU';
    provinces['23'] = 'J';
    provinces['24'] = 'LE';
    provinces['25'] = 'L';
    provinces['26'] = 'LO';
    provinces['27'] = 'LU';
    provinces['28'] = 'M';
    provinces['29'] = 'MA';
    provinces['30'] = 'MU';
    provinces['31'] = 'NA';
    provinces['32'] = 'OR';
    provinces['33'] = 'O';
    provinces['34'] = 'P';
    provinces['35'] = 'GC';
    provinces['36'] = 'PO';
    provinces['37'] = 'SA';
    provinces['38'] = 'TF';
    provinces['39'] = 'S';
    provinces['40'] = 'SG';
    provinces['41'] = 'SE';
    provinces['42'] = 'SO';
    provinces['43'] = 'T';
    provinces['44'] = 'TE';
    provinces['45'] = 'TO';
    provinces['46'] = 'V';
    provinces['47'] = 'VA';
    provinces['48'] = 'BI';
    provinces['49'] = 'ZA';
    provinces['50'] = 'Z';
    provinces['51'] = 'CE';
    provinces['52'] = 'ML';

    var id = provinces[prefix];
    return id;
  }

	$(".iban").focusout( function(){

    var countryid = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_3]']");
    var country = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_4]']");
    var entity = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_5]']");
    var office = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_6]']");
    var check = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_7]']");
    var account = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_8]']");

    //quitamos espacios y símbolos
    if( $(this).val().length <= 30){
      $(this).val( $(this).val().replace(/\-/g,'').replace(/[ ]+/g,'') );
    }

    // si cumple con la medida de IBAN, lo separamos por - y rellenamos otros campos
		if( $(this).val().length == 24){

			var iban01 = $(this).val().substring(0,2);
			var iban02 = $(this).val().substring(2,4);
			var iban03 = $(this).val().substring(4,8);
			var iban04 = $(this).val().substring(8,12);
			var iban05 = $(this).val().substring(12,14);
			var iban06 = $(this).val().substring(14,24);

			$(".iban").val(iban01+""+iban02+"-"+iban03+"-"+iban04+"-"+iban05+"-"+iban06);

      countryid.val(iban01);
      country.val(iban02);
      entity.val(iban03);
      office.val(iban04);
      check.val(iban05);
      account.val(iban06);

		}

    // si cumple con la medida de CC español, calculamos el IBAN
    if( $(this).val().length == 20){

      var cc01 = $(this).val().substring(0,4);
      var cc02 = $(this).val().substring(4,8);
      var cc03 = $(this).val().substring(8,10);
      var cc04 = $(this).val().substring(10,20);

      var new_iban = calcularIBAN('ES',cc01+cc02+cc03+cc04);

      var iban01 = new_iban.substring(0,2);
      var iban02 = new_iban.substring(2,4);
      var iban03 = new_iban.substring(4,8);
      var iban04 = new_iban.substring(8,12);
      var iban05 = new_iban.substring(12,14);
      var iban06 = new_iban.substring(14,24);

      $(".iban").val(iban03+"-"+iban04+"-"+iban05+"-"+iban06);

      countryid.val(iban01);
      country.val(iban02);
      entity.val(iban03);
      office.val(iban04);
      check.val(iban05);
      account.val(iban06);
    }

	});

  /******** Volcamos el NIF en el apodo para que funcionen las reglas de deduplicación ******/
  $('.nickname').change( function(){
    $("[name='submitted[civicrm_1_contact_1_cg1_fieldset][caja3][civicrm_1_contact_1_cg1_custom_2]']").val($('.nickname').val());
  });


  // Esconder caja error correo
  if( $(".alert-danger").text().indexOf("No se pudo enviar el correo") > 0 ){
      //console.log(1)
      (".alert-danger").hide();
  }


  // Volcamos el origen en el campo source de contact
  $("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_contact_1_cg1_custom_100]']").change( function(){
    $("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_contact_1_contact_source]']").val( $("option:selected", this).text() );
  });

  // Cuando cambia el CP, calculamos la provincia
  $(".cp").focusout( function(){
    //console.log(getProvince( $(this).val() ));
    $("[name='submitted[direccion_postal][caja5][civicrm_1_contact_1_address_state_province_id]']").val( getProvince( $(this).val() ) );
  });


	/************ PRE-ORIGEN ****************/

  /*** Añadimos origen al inicio para facilitar ***/
  if( $("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_contact_1_cg1_custom_100]']").length > 0 ){
    $("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_contact_1_cg1_custom_100]'] > option").each( function(){
        $(this).text( $(this).val()+'# '+$(this).text() );
    });
    // Y ordenamos
	 reorder();
  }

  if(	$(".preorigen").length > 0 ){
  	$(".preorigen").keyup(function(){
    	reorder();
  	});
  }

	function reorder(){
    if(	$(".preorigen").length > 0 ){

			var prefix = $(".preorigen").val();
			var l = prefix.length;
      /******* Filtramos solo aquellos que coinciden con el prefijo PREORIGEN y es origen de DD ***************/
			$("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_contact_1_cg1_custom_100]'] > option").each( function() {
					var val = $(this).val();
					if( !val.includes(prefix) || !$(this).val().startsWith("0") ){
						$(this).hide();
					}
          else {
            $(this).show();
          }
			});
    }
	}

  // Fecha inicial de pagos
  if ( $(".capa-inicio-pagos").length > 0 ) {
    var d = new Date();

    var month = d.getMonth()+1; //va del 0-11
    var year = d.getFullYear();
    if(d.getDate() > 15){
        month = ((month%13)+1);
        if(month == 1){
          year = year+1;
        }
    }
    $("[name='submitted[inicio_de_pagos][civicrm_1_contact_1_cg15_custom_74][day]']").val("1");
    $("[name='submitted[inicio_de_pagos][civicrm_1_contact_1_cg15_custom_74][month]']").val(month);
    $("[name='submitted[inicio_de_pagos][civicrm_1_contact_1_cg15_custom_74][year]']").val(year);
  }

  // Make the IBAN fields to automatically move the cursor through when any field is filled in.
  $(".country").keyup( function(){
    if($(".country").val().length >= 2){
        $(".entity").focus();
    }
  });
  $(".entity").keyup( function(){
    if($(".entity").val().length >= 4){
        $(".office").focus();
    }
  });
  $(".office").keyup( function(){
    if($(".office").val().length >= 4){
        $(".check").focus();
    }
  });
  $(".check").keyup( function(){
    if($(".check").val().length >= 2){
        $(".account").focus();
    }
  });

});
