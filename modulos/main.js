	var prompt       = require('prompt'),
		sys          = require('sys'),
		nodemailer   = require('nodemailer'),
		fs           = require('fs'),
		os           = require('os'),
		tiempoEspera = 150000,
		exec         = require('child_process').exec;

	function puts(error, stdout, stderr) { 
		sys.puts(stdout); 
	}

	function procedimiento(err){
		if(err){
			console.log(err);
		}
		console.log("Hola soy Anyela la alternativa a siri hecha con node.js");
				prompt.start();
				prompt.get([{
					name: "nombre",
					message: "¿Cual es tú nombre?"
				}], function(err, result){
					if(err){
						console.log(err);
					}else{
						var nombre = result.nombre;
						prompt.get([{
							name: 'necesidad',
							message: nombre+" ¿Cual es tu necesidad?"
						}], function(err, result){
							if(err){
								console.log(err);
							}else{
								so = os.platform();
								var necesidad = result.necesidad;
								switch(so){
									case "linux":
										switch(necesidad){
											case "que archivos hay aqui":
												console.log(nombre+" Los archivos que hay en esta carpeta son:");
												exec("ls", puts);
												break
											case "quiero administrar archivos":
												console.log(nombre+" el manejador de archivos está por abrir");
												exec("nautilus",puts) || exec("pcmanfm", puts) || exec("thunar", puts);
												break
											case "quiero programar":
													exec("subl", puts) || exec("emacs",puts);	
												break
											case "quiero navegar en internet":
												prompt.get([{
													name: "navegador",
													message: "Escribe el navegador a usar"
												}], function(err, result){
													if(err){
														console.log(err);
													}
														var navegador = result.navegador;
														console.log(nombre+" su navegador está cargando...");
														exec(navegador, puts);
												});
												break
											case "apagate":
												console.log("Hasta luego "+nombre+" su dispositivo está por apagarse");
												exec("poweroff", puts);
												break
											case "reiniciate":
												console.log(nombre+" su dispositivo esta por reiniciarse");
												exec("reboot", puts);
												break
											case "quiero escuchar musica" || "quiero escuchar una buena rola":
												console.log(nombre+" Tú reproductor está por cargar");
												exec("rhythmbox", puts) || exec("audacity", puts);
												break
											case "libera la ram":
												    exec("free",puts);

												    console.log("Limpiando la caché");

												    exec("sync ; echo 1 > /proc/sys/vm/drop_caches", puts);

    												exec("sync ; echo 2 > /proc/sys/vm/drop_caches", puts);

    												exec("sync ; echo 3 > /proc/sys/vm/drop_caches", puts);

												    console.log("Cache optimizada, disfrutelo :D",puts);

												    exec("free", puts);
												break
											case "configura el sistema":
												console.log("Hazlo tú flojo :D");
												exec("gnome-control-center", puts);
												break
											case "enviar un correo":
												global.tiempoEspera = 120000;
												console.log("Con gusto "+nombre);
												prompt.get([{
  													message: "¿Que correo Utiliza "+nombre,
  													name: "servicio"				
													}, {
														message: "Digite la dirección de correo electronico: ",
														name: "correo"														
													},{
														message: "Digite su contraseña(Tranquilo está escrbiendo pero por su seguridad no se muestra): ",
														name: "pass",
														hidden: true,
														conform: function (value) {
     													return true;
    }
													},{
														message: "¿A quien quiere enviar este correo?(En caso de ser 2 o más remitentes por favor separar con comas)",
														name: "remitente"
													},{
														message: "Titulo",
														name: "titulo"
													},{
														message: "Digite el contenido del correo",
														name: "contenido"
													}],function(err,result){
														if(err){
															console.log(err);
														}
														var servicio  = result.servicio,
															correo    = result.correo,
															pass      = result.pass,
															remitente = result.remitente,
															titulo    = result.titulo,
															contenido = result.contenido;
														switch(servicio){
															case "gmail":
																var smtpTransport = nodemailer.createTransport("SMTP", {
																	service: "Gmail",
																	auth: {
																		user: correo,
																		pass: pass
																	}
																});
																var mailOptions = {
																	from: nombre+" "+correo,
																	to: remitente,
																	subject: titulo,
																	text: contenido+"\n Enviado Desde Anyela.Js",
																	html: "<b> "+contenido+" </b>"
																}
																smtpTransport.sendMail(mailOptions, function(err, res){
																	if(err){
																		console.log(err);
																	}else{
																		console.log("Mensaje enviado: " + res.message);
																	}
																});
																break
															case "hotmail":
																var smtpTransport = nodemailer.createTransport("SMTP", {
																	service: "Hotmail",
																	auth: {
																		user: correo,
																		pass: pass
																	}
																});
																var mailOptions = {
																	from: nombre+" "+correo,
																	to: remitente,
																	subject: titulo,
																	text: contenido+"\n Enviado Desde Anyela.Js",
																	html: "<b> "+contenido+" </b>"
																}
																smtpTransport.sendMail(mailOptions, function(err, res){
																	if(err){
																		console.log(err);
																	}else{
																		console.log("Mensaje enviado: " + res.message);
																	}
																});
																break
															case "outlook":
																var smtpTransport = nodemailer.createTransport("SMTP", {
																	service: "outlook",
																	auth: {
																		user: correo,
																		pass: pass
																	}
																});
																var mailOptions = {
																	from: nombre+" "+correo,
																	to: remitente,
																	subject: titulo,
																	text: contenido+"\n Enviado Desde Anyela.Js",
																	html: "<b> "+contenido+" </b>"
																}
																smtpTransport.sendMail(mailOptions, function(err, res){
																	if(err){
																		console.log(err);
																	}else{
																		console.log("Mensaje enviado: " + res.message);
																	}
																});
																break
															default:
																console.log(nombre+" no puedo enviar un correo desde es plataforma, Disculpa :(")
																break
														}		
													});
												break
											case "manual":
												fs.readFile(__dirname+"/manual.txt", function(err, data){
													if (err) {
														console.log(err);
													}else{
														data = data.parse("utf8");
														console.log(data);
													}
												});
												break	
											default:
												console.log(nombre+" No entiendo que me pediste, por favor revisa mi manual");
												tiempoEspera = 1000;
												exports.tiempoEspera = global.tiempoEspera;
												break
										}
									break
									case "windows":
										console.log(nombre+" aun no estoy programada para está plataforma");
										break
									case "mac":
										console.log(nombre+" aun no estoy programada para está plataforma");
										break
									default:
										console.log("No se que plataforma utilizas loc@");
										break
								}
							}
						});
					}
				});
	}

	function anyela(){
		procedimiento();
		setInterval(function(err){
			if(err){
				console.log(err);
			}
			procedimiento();
		}, tiempoEspera);
	}

	var anyela = anyela();

	exports.anyela = anyela;