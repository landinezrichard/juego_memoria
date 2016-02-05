
/*Variables globales que usamos para guardar:
	idPrimera --> el id del div, que tiene el contenido de una casilla.
	casillaAbierta --> guardamos un numero, que es igual en las casillas que son parejas.
						este numero nos servira para determinar cuando el usuario acierta.
	contenidoPrimera --> guardamos el contenido de la primera casilla destapada.
 	totalEncontradas --> para saber cuando gana la persona.
 	reloj --> el identificador del intervalo, para parar el reloj.
 */
var idPrimera="";
var casillaAbierta="";
var contenidoPrimera="";
var totalEncontradas=0;
var reloj;

/*
	Casilla, es un objeto(molde) que nos servira para crear varias casillas
	y luego poderles cambiar valores a los atributos, sin que se cambien en todas las casillas

	Para crear una casilla recibe como parametros la url, un texto y un numero.
	
	Sus atributos son:
	
	imagenURL --> se usa para indicar el nombre y la extencion de la imagen. Ej. "gato.png"
		
	texto --> Se usa para indicar el texto que es pareja de la imagen (esto es si se quiere en el juego, 
			por ej. buscar la imagen del "gato.png" en una casilla, y en otra casilla, el texto de "El Gato Cosmico")
	
	numero --> Este numero es el que vamos a comparar para saber que casillas son parejas.	
			es importante que se le asignen numeros despues del 1, ya que el 0 puede poner
			 problema en la funcion mecanicaGame, al compararse con un string vacio ("")			

	esImagen --> indica el tipo de casilla: 
			true --> es una imagen 
			false --> es un texto

			Por defecto todas las casillas son imagenes, pero más adelante con la variable
			tipoPareja, se le puede indicar que lo cambie.		
*/

var Casilla = function (url,texto,num)
{ 
	this.imagenURL = url;
 	this.texto = texto;
 	this.numero = num;
 	this.esImagen = true; 
};


/*
	Informacion es un objeto, que por dentro tiene un array de objetos en formato JSON.

	Este se modifica de la siguiente forma:
		-En "imagenURL:" --> le colocamos el nombre y la extension de la imagen Ej. "gato.png"
		-En "texto:" --> le escribimos el texto que se muestre en otra casilla al destaparla, 
						esto para armar parejas (imagen|texto)
	NOTA IMPORTANTE: las imagenes deben estar en una carpeta llamada "imagenes"			
*/

var informacion = [
	{
  		imagenURL: "1.png",
  		texto: "Bulbasaur"  		  
	},
	{
  		imagenURL: "2.png",
  		texto: "Charmander"  		   
	},
	{
  		imagenURL: "3.png",
  		texto: "Wartortle"  		    
	},
	{
  		imagenURL: "4.png",
  		texto: "Pidgeotto"  		    
	},
	{
  		imagenURL: "5.png",
  		texto: "Pidgeot"  		   
	},
	{
  		imagenURL: "6.png",
  		texto: "Pikachu"  		    
	},
	{
  		imagenURL: "7.png",
  		texto: "Clefairy"  		   
	},
	{
  		imagenURL: "8.png",
  		texto: "Clefable"  		    
	},
	{
  		imagenURL: "9.png",
  		texto: "Cloyster"  		   
	},
	{
  		imagenURL: "10.png",
  		texto: "Gastly"  		    
	},
	{
  		imagenURL: "11.png",
  		texto: "Chikorita"  		    
	},
	{
  		imagenURL: "12.png",
  		texto: "Cyndaquil"  		   
	},
	{
  		imagenURL: "13.png",
  		texto: "Totodile"  		    
	},
	{
  		imagenURL: "14.png",
  		texto: "Marill"  		    
	},
	{
  		imagenURL: "15.png",
  		texto: "Politoed"  		    
	}
];

/*
	tipoPareja --> determina el tipo de parejas a buscar en nuestro juego de memoria
					Si es= 0 --> se buscan las parejas en el juego, donde una casilla es 
									una imagen y la otra es texto
						   1 --> las parejas son "texto-texto"

						   2 o cualquier otro valor diferente a 1 y 2 --> las parejas son
						   			"imagen-imagen", es decir, en el juego se
						   			busca una imagen, y luego en otra casilla la misma imagen
*/

var tipoPareja=2;


/*
	En este vector se crean las casillas del concentrese.
	Si el array Informacion tiene 15 cajones con objetos, 
	este vectorCasillas tiene el doble de cajones (30), 
	ya que en un juego de memoria se repiten las imagenes o los textos
	porque vienen de a parejas
*/
var vectorCasillas=new Array(informacion.length*2);

function inicio()
{		
	cargaAleatorio();
	crearCasillasHtml();
	$("#contenedor div").click(mecanicaGame);
	$("#reinicio").click(reiniciarJuego);
	iniciarDialogos();
		
}

function iniciarDialogos()
{
	//instrucciones del juego
	$( "#dialogo" ).dialog({ 
		width: 495,
		modal: true,
		hide: {
			effect: "explode",
			duration: 1000
		},
		buttons: {
			Ok: function() {
				$( this ).dialog( "close" );				
			}
		},
		close: function( event, ui ) {
			iniciarReloj();
		} 

	});

	//mensaje cuando gana	

	$( "#gano" ).dialog({ 
		width: 495,
		modal: true,
		autoOpen: false,
		hide: {
			effect: "explode",
			duration: 1000
		},
		buttons: {
			"Reiniciar Juego": function() {
				$( this ).dialog( "close" );
				reiniciarJuego();				
			},
			Ok: function() {
				$( this ).dialog( "close" );				
			}

		}

	});
}

function iniciarReloj()
{
	
	reloj=setInterval("actualizarReloj()",1000);
}

function crearCasillasHtml()
{	
	//Esta Funcion crea Las casillas en codigo html

	//obtenemos el div donde se van a poner las casillas
	var tablero=document.getElementById('contenedor');
	

	for (var i = 0; i < vectorCasillas.length; i++) 
	{
		//creamos un elemento <div>
		var tagHtml=document.createElement("div");
		/*Al div creado le asignamos el atributo id
			ponemos una c (de la palabra casilla)
			antes del numero, esto con el fin de que
			los id no pongan problema
		*/
		tagHtml.id="c"+i;
		/*	al div se le asigna el atributo class="cuadro"
			para que tome un estilo CSS, y se vea bien
		*/
		tagHtml.setAttribute("class","cuadro");
		
		//Al div tablero, le asignamos como ultimo hijo el div creado para la casilla
		tablero.appendChild(tagHtml);
		//llamamos a la funcion que nos crea el contenido de la casilla (etiqueta <img> o <p>)
		var contenido=crearContenidoCasilla(i);
		//agregamos el contenido al div de casilla correspondiente
		tagHtml.appendChild(contenido);
	}
	
}

function cargaAleatorio()
{
	var datos="";
	//Calcula el total de la informacion
	var totalInfo=informacion.length;

	/*
		En este ciclo cargamos en nuestro vectorCasillas las casillas correspondientes:
		Si por ejemplo son 15 objetos en el vector "informacion", se cargan en las posiciones de 0 a 14
		los 15 objetos, y en las posiciones de 15 a 29 la copia de esos 15 objetos
	*/
	for (var i = 0; i < totalInfo; i++) 
	{	
		//vamos guardando el objeto en el array "vectorCasillas"			
		vectorCasillas[i]=new Casilla(informacion[i].imagenURL,informacion[i].texto,i+1);
		
		//El mismo objeto lo guardamos en otra casilla del "vectorCasillas", es como si hicieramos una copia del objeto		
		vectorCasillas[totalInfo+i]=new Casilla(informacion[i].imagenURL,informacion[i].texto,i+1);
		
		//Si se quieren buscar parejas (imagen-texto)
		if(tipoPareja == 0)	
		{
			/*A la copia del objeto, le cambiamos el valor de la variable "esImagen" a false
				con eso indicamos que la pareja es un texto
			*/
			vectorCasillas[totalInfo+i].esImagen=false;
		}
		//Si se quieren buscar parejas (texto-texto)
		if(tipoPareja == 1)	
		{
			//Al objeto y la copia del objeto, le cambiamos el valor de la variable "esImagen" a false
			vectorCasillas[i].esImagen=false;
			vectorCasillas[totalInfo+i].esImagen=false;
		}			
	}	
	
	/*
		Intercambio o Mezcla Aleatoria
	
		Creamos una variable auxiliar, que nos va a servir para hacer una mezcla aleatoria
		(es como cojer una baraja de cartas y mezclarlas)
	*/
	var aux="";
	
	var totalCasillas=vectorCasillas.length-1;

	//como tenemos 30 casillas, vamos a hacer 30 mezclas
	for(var i = 0; i <= totalCasillas; i++)
	{
		//creamos un numero aleatorio entre 0 y 29
		var aleatorio=numero_aleatorio(0, totalCasillas);
		//en la variable auxiliar guardamos la casilla que se saco
		aux=vectorCasillas[i];
		//en donde se saco la casilla, guardamos otra casilla que se saco de una posicion X
		vectorCasillas[i]=vectorCasillas[aleatorio];
		//donde estaba la segunda casilla que se saco, metemos la que habiamos sacado antes
		vectorCasillas[aleatorio]=aux;
	}	
}


function numero_aleatorio(minimo, maximo)
{
	//Genera un número aleatorio entre un rango de enteros
    var numero = Math.floor( Math.random() * (maximo - minimo + 1) + minimo );
    return numero;
}


function mecanicaGame()
{	
	//obtenemos el id de la casilla a la que se le hizo clic
	var valor=this.id;
	/*como el id es: "cXX", donde XX es un numero, 
	partimos el id desde la posicion 1 en el string
	*/
	valor=valor.substring(1);
	
	//Sacamos el contenido del div de la casilla
	var contenidoCasilla=$(this).children();	
	
	//si ese contenido esta oculto, hay que mostrarlo
	if ($(contenidoCasilla).is(":hidden")) 
	{
		/*le quitamos la posibilidad de hacer clic, 
		esto para que el usuario no haga trampa haciendo clic en la misma casilla
		*/
		$("#contenedor div").unbind("click",mecanicaGame);

		/*Mostramos el contenido de la casilla con un efecto de opacidad*/
		$(contenidoCasilla).fadeIn('fast');

		//si casillaAbierta == "" --> entonces no habia otra casilla destapada
		if (casillaAbierta == "") 
		{
			//buscamos en nuestro vector de casillas el numero y lo guardamos			
			casillaAbierta=vectorCasillas[valor].numero;			
			//guardamos el id del div de la casilla
			idPrimera=valor;
			//guardamos el contenido de la casilla
			contenidoPrimera=contenidoCasilla;
			//despues de un tiempo hacemos que a la casilla se le pueda volver ha hacer clic
			setTimeout(function() {
                $("#contenedor div").bind("click",mecanicaGame);
            }, 300);
		}
		else
		{	
			//si entra aca ya habia otra casilla abierta
			//guardamos en la casillaActual, la que se destapo de segundas		
			casillaActual=vectorCasillas[valor].numero;						
			
			//Preguntamos Si los numeros de las casillas abiertas son diferentes		
			if(casillaAbierta != casillaActual)
			{
				//diferentes

				setTimeout(function() {
					//ocultamos el contenido de la segunda casilla
                    $(contenidoCasilla).fadeOut("fast");
                    //ocultamos el contenido de la primera casilla
                    $(contenidoPrimera).fadeOut("fast");
                    //vaciamos nuestras variables para indicar que no se ha destapado nada
                    idPrimera = "";
                    casillaAbierta="";
                    contenidoPrimera="";                                                
                }, 400);
			}
			else
			{					
				//iguales

				//Añadimos una clase CSS al contenido, para que se vea opaca				
				$(contenidoCasilla).addClass('opaco');                
                $(contenidoPrimera).addClass('opaco');
                //vaciamos nuestras variables para indicar que no se ha destapado nada
                idPrimera = "";                    
                casillaAbierta="";
                contenidoPrimera="";
                //aumentamos en 1 el total de casillas encontradas. 
                totalEncontradas++;                   					
			}

			//despues de un tiempo hacemos que a la casilla se le pueda volver ha hacer clic
			setTimeout(function() {
                $("#contenedor div").bind("click", mecanicaGame)
            }, 400);			
		}
		
		//el total de encontradas debe ser igual al total de informacion
		if (totalEncontradas == informacion.length) 
		{
			//Ya gano el usuario
			clearInterval(reloj);
            //alert("Ganaste!!!");
            mostrarGano();
        }
	}			
}



function crearContenidoCasilla(indice)
{	
	//Recibimos el indice para buscar la casilla en nuestro array de casillas
	var casilla=vectorCasillas[indice];
	
	//variable para despues crear una etiqueta imagen o parrafo, segun sea la casilla
	var tagHtml;
	
	//preguntamos si la casilla es una imagen	
	if(casilla.esImagen)
	{
		//creamos un elemento <img>
		tagHtml=document.createElement("img");
		//A la imagen creada le asignamos el atributo src		
		tagHtml.setAttribute("src","imagenes/"+casilla.imagenURL);
		//escondemos la imagen		
		$(tagHtml).hide();
		//devolvemos la casilla lista para añadir
		return tagHtml;		
	}
	else
	{
		//creamos un elemento <p>
		tagHtml=document.createElement("p");
		//cremos el texto del parrafo
		var contenido=document.createTextNode(casilla.texto);
		//Al parrafo creado le asignamos el texto
		tagHtml.appendChild(contenido);
		//escondemos el parrafo
		$(tagHtml).hide();		

		return tagHtml;
	}
}

function reiniciarJuego()
{
	for (var i = 0; i < vectorCasillas.length; i++) 
	{
		/*empezamosd a remover las casillas del contenedor, 
		empezando desde la ultima
		*/
		$("#contenedor div:last").remove();		
	}
	cargaAleatorio();
	crearCasillasHtml();
	$("#contenedor div").click(mecanicaGame);
	//reiniciamos variables globales en blanco
	idPrimera="";
	casillaAbierta="";
	contenidoPrimera="";
	totalEncontradas=0;
	clearInterval(reloj);
	$("#reloj").html("0");
	reloj=setInterval("actualizarReloj()",1000);
}

function actualizarReloj()
{
	var segundos=$("#reloj").html();
	segundos++;
	$("#reloj").html("" + segundos);
}

function mostrarGano()
{
	var segundos=$("#reloj").html();
	$( "#gano p:last" ).html("Y tan solo tardaste "+segundos+" segundos");
	$("#gano").dialog( "open" );
}