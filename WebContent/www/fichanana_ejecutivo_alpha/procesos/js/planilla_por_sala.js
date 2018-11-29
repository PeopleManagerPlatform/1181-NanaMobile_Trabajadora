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

var objAnywhere = null;
var quiebreSaveInit = false;

var nombreModulo = "Ficha Personal";

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
							cotizacionAfp.push(val4[12].value);
							monedaCotizacionAfp.push(val4[13].value);
							cotizacionIsapre.push(val4[15].value);
							monedaCotizacionIsapre.push(val4[16].value);
							correo.push(val4[17].value);
							nacionalidad.push(val4[18].value);
							sexo.push(val4[19].value);
							tipoContrato.push(val4[20].value);
							formaPago.push(val4[21].value);
							cuentaBancaria.push(val4[22].value);
							banco.push(val4[23].value);
							nombreAfp.push(val4[26].value);
							nombreIsapre.push(val4[27].value);
						});
					});
					
					$( document ).ready(function() {
						console.log(data);
						document.getElementById('ficha_nombre').value = nombres[0] + ' ' + apellidoPaterno[0] + ' ' + apellidoMaterno[0];
						document.getElementById('ficha_RUT').value = rut[0] + '-' + digitoVerificador[0];
						document.getElementById('ficha_fechaNacimiento').value = fechaNacimiento[0];
						document.getElementById('ficha_domicilio').value = domicilio[0];
						document.getElementById('ficha_comuna').value = comuna[0];
						document.getElementById('ficha_telefonoFijo').value = telefonoFijo[0];
						document.getElementById('ficha_telefonoMovil').value = telefonoMovil[0];
						document.getElementById('ficha_fechaInicio').value = fechaIngreso[0];
						document.getElementById('ficha_tipoContrato').value = tipoContrato[0];
						document.getElementById('ficha_formaPago').value = formaPago[0];
						document.getElementById('ficha_banco').value = banco[0];
						document.getElementById('ficha_cuentaBancaria').value = cuentaBancaria[0];
						document.getElementById('ficha_nombreAFP').value = nombreAfp[0];
						document.getElementById('ficha_cotizacionAfpMoneda').value = monedaCotizacionAfp[0];
						document.getElementById('ficha_cotizacionAfpMonto').value = cotizacionAfp[0];
						document.getElementById('ficha_nombreIsapre').value = nombreIsapre[0];
						document.getElementById('ficha_cotizacionIsapreMoneda').value = monedaCotizacionIsapre[0];
						document.getElementById('ficha_cotizacionIsapreMonto').value = cotizacionIsapre[0];
					});
					
				}, 
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					console.log("error : " + textStatus + "," + errorThrown);
			    }
			});	
	
		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error : " + textStatus + "," + errorThrown);
	    }
	});	
	
	
	/*
	var any = new Anywhere();
	$.ajax({ 
		type: "GET",
		dataType:"json",
		url: any.getWSAnywhere_context() + "services/p2s/querys/infoultimavisita/" + sessionStorage.getItem("rutT") ,
		dataType:"json",
		crossDomain : true,
		success: function(data,status,jqXHR) {
			$.each(data, function(key, val) {
				$.each(val, function(key2, val2) {
					idCliente.push(val2[0].value);
					idCadena.push(val2[1].value);
					idLocal.push(val2[2].value);					
				});
			});
			
			$( document ).ready(function() {
				console.log(data);
				document.getElementById('selectClientes_1000').options[document.getElementById('selectClientes_1000').selectedIndex].value = idCliente[0];
				document.getElementById('selectCadenas_1000').options[document.getElementById('selectCadenas_1000').selectedIndex].value   = idCadena[0];
				document.getElementById('selectLocales_1000').options[document.getElementById('selectLocales_1000').selectedIndex].value   = idLocal[0];
								
			});
		}, 
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("error : " + textStatus + "," + errorThrown);
	    }
	});
	
	var geo = new GeoGlobal();
	geo.refreshGeo(function(lat, lo) {
		posLatitud = lat;
		posLongitud = lo;

	}, function(point) {
		pointAddress = point;
	});
	*/
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
		var mensajeSave = "Liquidaci&oacute;n generada correctamente";
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
		 formularioID: "LIQ",
		 formName : "formSend",
		 objAnywhere: objAnywhere,
		 silent: false,
		 success : success
	});

}
 /*

function internalSave_ModoSimple() {
	
		
		var saveUtil = new SaveUtils();
		var params = saveUtil.serializePage("formSend", objAnywhere);
		params["formulario_id"]    = "A-003";
		params["formulario_alias"] = nombreModulo;
		params["latitud"]     = posLatitud;
		params["longitud"]    = posLongitud;
		params["point"]   	  = pointAddress;
		params["fotoUno"] = varFotoUno;
		params["fotoDos"] = varFotoDos;
		params["fotoTres"] = varFotoTres;
		params["fotoCuatro"] = varFotoCuatro;
		
		var success = function(data,status,jqXHR) { 
			var mensajeSave = "Información enviada correctamente";
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
		
		var anySave = new AnywhereManager();
		anySave.saveClaseWeb(true, "anywhere_movil_restanywhere", "AnySave", "	", params, success);
		guardaProtocolo();
	
 
}*/

 


function DisOrEnable(radio,id) {
	if(radio.value == "si") {
		$("#"+id).closest('tr').hide();	
	}
	else {
		$("#"+id).closest('tr').show();
	}
	
}
