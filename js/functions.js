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
    provinces['01'] = 2423;
    provinces['02'] = 2424;
    provinces['03'] = 2425;
    provinces['04'] = 2426;
    provinces['05'] = 2428;
    provinces['06'] = 2429;
    provinces['07'] = 2430;
    provinces['08'] = 2431;
    provinces['09'] = 2432;
    provinces['10'] = 2433;
    provinces['11'] = 2434;
    provinces['12'] = 2436;
    provinces['13'] = 2437;
    provinces['14'] = 10056;
    provinces['15'] = 2446;
    provinces['16'] = 2438;
    provinces['17'] = 2439;
    provinces['18'] = 2440;
    provinces['19'] = 2441;
    provinces['20'] = 2442;
    provinces['21'] = 2443;
    provinces['22'] = 2444;
    provinces['23'] = 2445;
    provinces['24'] = 2449;
    provinces['25'] = 2450;
    provinces['26'] = 2447;
    provinces['27'] = 2451;
    provinces['28'] = 2452;
    provinces['29'] = 2453;
    provinces['30'] = 2454;
    provinces['31'] = 2455;
    provinces['32'] = 2456;
    provinces['33'] = 2427;
    provinces['34'] = 2457;
    provinces['35'] = 2448;
    provinces['36'] = 2458;
    provinces['37'] = 2459;
    provinces['38'] = 2460;
    provinces['39'] = 2435;
    provinces['40'] = 2461;
    provinces['41'] = 2462;
    provinces['42'] = 2463;
    provinces['43'] = 2464;
    provinces['44'] = 2465;
    provinces['45'] = 10055;
    provinces['46'] = 2466;
    provinces['47'] = 2467;
    provinces['48'] = 2468;
    provinces['49'] = 2469;
    provinces['50'] = 2470;
    provinces['51'] = 2471;
    provinces['52'] = 2472;

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
  $("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_membership_1_membership_custom_147]']").change( function(){
    $("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_contact_1_contact_source]']").val( $("option:selected", this).text() );
  });

  // Cuando cambia el CP, calculamos la provincia
  $(".cp").focusout( function(){
    //console.log(getProvince( $(this).val() ));
    $("[name='submitted[direccion_postal][caja5][civicrm_1_contact_1_address_state_province_id]']").val( getProvince( $(this).val() ) );
  });


	/************ PRE-ORIGEN ****************/

  /*** Añadimos origen al inicio para facilitar ***/
  if( $("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_membership_1_membership_custom_147]']").length > 0 ){
    $("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_membership_1_membership_custom_147]'] > option").each( function(){
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
			$("[name='submitted[civicrm_1_membership_1_membership_fieldset][caja_origenes][civicrm_1_membership_1_membership_custom_147]'] > option").each( function() {
					var val = $(this).val();
					if( !val.includes(prefix) || !$(this).val().startsWith("080") ){
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

});
