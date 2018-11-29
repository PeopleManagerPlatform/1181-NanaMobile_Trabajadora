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

var periodo = [];
var periodoAno = [];
var periodoMes = [];

var objAnywhere = null;
var quiebreSaveInit = false;

var nombreModulo = "Ingreso de Liquidacion";

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
			
			$( document ).ready(function() {
				console.log(data);
				document.getElementById('gato_rutJefe').value = sessionStorage.getItem("rutT");
				document.getElementById('gato_rutNana').value = rutNana[0];
			});
			
			$.ajax({ 
				type: "GET",
				dataType:"json",
				url: any.getWSAnywhere_context() + "services/p2s/querys/periodoapagar/" + rutNana[0] ,
				dataType:"json",
				crossDomain : true,
				success: function(data,status,jqXHR) {
					$.each(data, function(key3, val3) {
						$.each(val3, function(key4, val4) {
							periodo.push(val4[0].value);
							periodoAno.push(val4[1].value);
							periodoMes.push(val4[2].value);
						});
					});
					
					$( document ).ready(function() {
						console.log(data);
						document.getElementById('gato_periodoMes').value = periodoMes[0];
						document.getElementById('gato_periodoAno').value = periodoAno[0];
						document.getElementById('gato_periodo').value 	 = periodo[0];
						if (periodoMes[0] = 1) {
							document.getElementById('dato_periodo').value = 'Enero de ' + periodoAno[0] ;
						} else if (periodoMes[0] = 2 ) {
							document.getElementById('dato_periodo').value = 'Febrero de ' + periodoAno[0];
						} else if (periodoMes[0] = 3 ) {
							document.getElementById('dato_periodo').value = 'Marzo de ' + periodoAno[0]
						} else if (periodoMes[0] = 4 ) {
							document.getElementById('dato_periodo').value = 'Abril de ' + periodoAno[0]
						} else if (periodoMes[0] = 5 ) {
							document.getElementById('dato_periodo').value = 'Mayo de ' + periodoAno[0]
						} else if (periodoMes[0] = 6 ) {
							document.getElementById('dato_periodo').value = 'Junio de ' + periodoAno[0]
						} else if (periodoMes[0] = 7 ) {
							document.getElementById('dato_periodo').value = 'Julio de ' + periodoAno[0]
						} else if (periodoMes[0] = 8 ) {
							document.getElementById('dato_periodo').value = 'Agosto de ' + periodoAno[0]
						} else if (periodoMes[0] = 9 ) {
							document.getElementById('dato_periodo').value = 'Septiembre de ' + periodoAno[0]
						} else if (periodoMes[0] = 10 ) {
							document.getElementById('dato_periodo').value = 'Octubre de ' + periodoAno[0]
						} else if (periodoMes[0] = 11 ) {
							document.getElementById('dato_periodo').value = 'Noviembre de ' + periodoAno[0]
						} else if (periodoMes[0] = 12 ) {
							document.getElementById('dato_periodo').value = 'Diciembre de ' + periodoAno[0]
						}
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
