/**
 * 2015-05-11
 * (A-003) Tipo, Categoría, Comentario, FOTO (máx. 3)
 * VERSIÓN 2
 * 
 * */



var stockImage = 'Sin Imagen';
var posLatitud = null;
var posLongitud = null;
var pointAddress = null;

var idCliente = [];
var idCadena = [];
var idLocal = [];

var rutNana = [];

var rut = [];
var digitoVerificador = [];
var nombres = [];
var apellidoPaterno = [];
var apellidoMaterno = [];
var fechaNacimiento = [];
var fechaIngreso = [];
var domicilio = [];
var comuna = [];
var telefonoFijo = [];
var telefonoMovil = [];
var nombreAfp = [];
var cotizacionAfp = [];
var monedaCotizacionAfp = [];
var nombreIsapre = [];
var cotizacionIsapre = [];
var monedaCotizacionIsapre = [];
var correo = [];
var nacionalidad = [];
var sexo = [];
var tipoContrato = [];
var formaPago = [];
var cuentaBancaria = [];
var banco = [];
var sueldoBase = [];
var tipoSueldo = [];

var objAnywhere = null;
var quiebreSaveInit = false;

var nombreModulo = "Documentos";

$(".titleTag").each(function() {
	$(this).html(nombreModulo);
});

reiniciaFotos();
createPhotoButton(1,true, true, "Foto.");
createPhotoButton(2,true, false, "Foto.");
createPhotoButton(3,true, false, "Foto.");
createPhotoButton(4,false);

//var anySaveObject = new AnySave();




$('#quiebrestock_principal').bind( 'pagebeforecreate',function(event) {
	if(objAnywhere == null) {
		objAnywhere = new ObjAnyWhereCCL_CP({

											 "hide1":true,
											 "hide2":true,
											 "hide3":true,
			 
											 "disabled1":"no",
											 "disabled2":"no",
											 "disabled3":"no",
											 
											 "getCache1":"yes",
											 "getCache2":"yes",
											 "getCache3":"yes",
											 
											 "system.producto.class":"required",
											 "system.producto.class":"required",
											 
											 //"categorias.only":[428,429,430,431,432,433,434],
											 
											 "omit4":"yes",
											 "omit5":"yes"});
		
		$("#combos").html(objAnywhere.getHtml());
	}
});


$('#quiebrestock_principal').bind( 'pageshow',function(event) {
	console.log("[pageshow] quiebrestock_promocion.js");
	objAnywhere.loadClients();

	var any = new Anywhere();
	
	document.getElementById('gato_rutJefe').value = sessionStorage.getItem("rutT");
	
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: any.getWSAnywhere_context() + "services/p2s/querys/listabancos"  ,
		dataType:"json",
		crossDomain : true,
		success: function(data,status,jqXHR) {
			$.each(data, function(key5, val5) {
				$.each(val5, function(key6, val6) {
					$('#gato_banco').append($("<option/>", {value: val6[0].value,text: val6[1].value}));
					
				});
			});
			$('#gato_banco').selectmenu("refresh", true);
		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error : " + textStatus + "," + errorThrown);
	    }
	});	
	
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: any.getWSAnywhere_context() + "services/p2s/querys/listaafps"  ,
		dataType:"json",
		crossDomain : true,
		success: function(data,status,jqXHR) {
			$.each(data, function(key7, val7) {
				$.each(val7, function(key8, val8) {
					$('#gato_nombreAFP').append($("<option/>", {value: val8[0].value,text: val8[1].value}));
					
				});
			});
			$('#gato_nombreAFP').selectmenu("refresh", true);
		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error : " + textStatus + "," + errorThrown);
	    }
	});	
	
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: any.getWSAnywhere_context() + "services/p2s/querys/listaisapres"  ,
		dataType:"json",
		crossDomain : true,
		success: function(data,status,jqXHR) {
			$.each(data, function(key9, val9) {
				$.each(val9, function(key10, val10) {
					$('#gato_nombreIsapre').append($("<option/>", {value: val10[0].value,text: val10[1].value}));
					
				});
			});
			$('#gato_nombreIsapre').selectmenu("refresh", true);
		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error : " + textStatus + "," + errorThrown);
	    }
	});	
	
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: any.getWSAnywhere_context() + "services/p2s/querys/identificanana/" + sessionStorage.getItem("rutT") ,
		dataType:"json",
		crossDomain : true,
		success: function(data,status,jqXHR) {
			$.each(data, function(key, val) {
				$.each(val, function(key2, val2) {
					rutNana.push(val2[0].value);					
				});
			});
			
			document.getElementById('gato_rutNana').value = rutNana[0];
			
			if (rutNana[0] == 1 ) {
				document.getElementById('label_instrucciones').innerHTML  = '<p class="text_size_110"><strong>Ingresa los datos de tu nana:</strong></p>';
				document.getElementById('gato_nombre').value = '';
				document.getElementById('gato_RUT').value = '';
				document.getElementById('gato_DV').value = '';
				document.getElementById('gato_fechaNacimiento').value = '';
				document.getElementById('gato_domicilio').value = '';
				document.getElementById('gato_telefonoFijo').value = '';
				document.getElementById('gato_telefonoMovil').value = '';
				document.getElementById('gato_fechaInicio').value = '';
				$("#gato_tipoContrato").val(0);
				$("#gato_formaPago").val(0);
				$("#gato_banco").val(0);
				document.getElementById('gato_cuentaBancaria').value = '';
				$("#gato_nombreAFP").val(0);
				$("#gato_nombreIsapre").val(0);
				document.getElementById('gato_sueldoBase').value = '';
				$("#gato_tipoSueldo").val(0);
			} else {
				$.ajax({ 
					type: "GET",
					dataType:"json",
					url: any.getWSAnywhere_context() + "services/p2s/querys/fichanana/" + rutNana[0] ,
					dataType:"json",
					crossDomain : true,
					success: function(data,status,jqXHR) {
						$.each(data, function(key3, val3) {
							$.each(val3, function(key4, val4) {
								rut.push(val4[0].value);
								digitoVerificador.push(val4[1].value);
								nombres.push(val4[2].value);
								apellidoPaterno.push(val4[3].value);
								apellidoMaterno.push(val4[4].value);
								fechaNacimiento.push(val4[5].value);
								fechaIngreso.push(val4[6].value);
								domicilio.push(val4[7].value);
								comuna.push(val4[8].value);
								telefonoFijo.push(val4[9].value);
								telefonoMovil.push(val4[10].value);
								nombreAfp.push(val4[11].value);
								cotizacionAfp.push(val4[12].value);
								monedaCotizacionAfp.push(val4[13].value);
								nombreIsapre.push(val4[14].value);
								cotizacionIsapre.push(val4[15].value);
								monedaCotizacionIsapre.push(val4[16].value);
								correo.push(val4[17].value);
								nacionalidad.push(val4[18].value);
								sexo.push(val4[19].value);
								tipoContrato.push(val4[20].value);
								formaPago.push(val4[21].value);
								cuentaBancaria.push(val4[22].value);
								banco.push(val4[23].value);	
								sueldoBase.push(val4[24].value);
								tipoSueldo.push(val4[25].value);
							});
						});
						
						$( document ).ready(function() {
							console.log(data);
							document.getElementById('label_instrucciones').innerHTML  = '<p class="text_size_110"><strong>Actualiza los datos de tu nana:</strong></p>';
							document.getElementById('gato_nombre').value = nombres[0] + ' ' + apellidoPaterno[0] + ' ' + apellidoMaterno[0];
							document.getElementById('gato_RUT').value = rut[0];
							document.getElementById('gato_DV').value = digitoVerificador[0];
							document.getElementById('gato_fechaNacimiento').value = fechaNacimiento[0];
							document.getElementById('gato_domicilio').value = domicilio[0];
							document.getElementById('gato_telefonoFijo').value = telefonoFijo[0];
							document.getElementById('gato_telefonoMovil').value = telefonoMovil[0];
							document.getElementById('gato_fechaInicio').value = fechaIngreso[0];
							
							$('select[name="gato_tipoContrato"]').find('option[value="'+tipoContrato[0]+'"]').attr("selected",true);
							$('#gato_tipoContrato').selectmenu("refresh", true);
							
							$('select[name="gato_formaPago"]').find('option[value="'+formaPago[0]+'"]').attr("selected",true);
							$('#gato_formaPago').selectmenu("refresh", true);
							
							$('select[name="gato_banco"]').find('option[value="'+banco[0]+'"]').attr("selected",true);
							$('#gato_banco').selectmenu("refresh", true);
							
							document.getElementById('gato_cuentaBancaria').value = cuentaBancaria[0];
							
							$('select[name="gato_nombreAFP"]').find('option[value="'+nombreAfp[0]+'"]').attr("selected",true);
							$('#gato_nombreAFP').selectmenu("refresh", true);
							
							$('select[name="gato_nombreIsapre"]').find('option[value="'+nombreIsapre[0]+'"]').attr("selected",true);
							$('#gato_nombreIsapre').selectmenu("refresh", true);
							
							document.getElementById('gato_sueldoBase').value = sueldoBase[0];
							
							$('select[name="gato_tipoSueldo"]').find('option[value="'+tipoSueldo[0]+'"]').attr("selected",true);
							$('#gato_tipoSueldo').selectmenu("refresh", true);
							
						});
						
					}, 
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						console.log("error : " + textStatus + "," + errorThrown);
				    }
				});	
			}

		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error : " + textStatus + "," + errorThrown);
	    }
	});	
	
});


$("#tipo").live("click",function() {
	
});

function test() {
	console.log(".testSerialize");
	
	var su = new SaveUtils();
	var p = su.serializePage("formSend", objAnywhere);
	console.log(p);
}

function saveQuiebre() {
	var success = function(data) {
		var mensajeSave = "Registro guardado correctamente";
		if(data != null) {
			if(data.dataFalsa == "dataFalsa") {
				mensajeSave = "Alerta sin conexion a Internet. Su informaci&oacute;n ser&aacute; guardada en el celular y apenas cuente con Internet usted debe reenviarla (ir al men&uacute; principal)";
			}
		}
		var popup = new MasterPopup();
		popup.alertPopup(nombreModulo, mensajeSave, {"funcYes":  function() {
		    $.mobile.changePage( "../../menu.html", { transition: "flip"} );
		}});
	}
	
	anySaveObject.save({
		 nombreModulo: nombreModulo,
		 formularioID: "REG_NANA",
		 formName : "formSend",
		 objAnywhere: objAnywhere,
		 silent: false,
		 success : success
	});

}

function DisOrEnable(radio,id) {
	if(radio.value == "si") {
		$("#"+id).closest('tr').hide();	
	}
	else {
		$("#"+id).closest('tr').show();
	}
	
}
