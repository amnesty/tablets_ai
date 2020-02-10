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

	$(".iban").focusout( function(){

    var countryid = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_3]']");
    var country = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_4]']");
    var entity = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_5]']");
    var office = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_6]']");
    var check = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_7]']");
    var account = $("[name='submitted[civicrm_1_contact_1_cg2_fieldset][civicrm_1_contact_1_cg2_custom_8]']");

    //quitamos espacios y símbolos
    if( $(this).val().length <= 28){
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
      //console.log(new_iban);
      //21009649432923287171

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

});
