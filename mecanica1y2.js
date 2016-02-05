/*
	valor1 --> donde guardamos la primera casilla escogida por el usuario
	valor2 --> donde guardamos la segunda casilla escogida por el usuario
	turno --> nos indica cuantas casillas ha destapado el usuario
				0 --> no ha destapado casillas
				1 --> ya ha destapado una casilla
*/

var valor1="";
var valor2="";
var turno=0;


// function mecanicaGame()
// {	
// 	//obtenemos el id de la casilla a la que se le hizo clic
// 	var valor=this.id;
	
// 	//varible para mostrar la casilla.
// 	var casilla;
// 	var destapada=false;

// 	/*preguntamos si el valor del numero, en la casilla, es diferente a "-1"
// 		esto con el fin de asegurarnos que no se haga nada si es una casilla ya
// 		adivinada
// 	*/
// 	if ( vectorCasillas[valor].numero != -1) 
// 	{

		

// 		//si turno=0 --> entonces no habia otra casilla destapada
// 		if (turno == 0 && destapada==false) 
// 		{
// 			valor1=valor;
// 			console.log("el valor1 es: "+valor1);
// 			turno=1;
// 			/*
// 				llamamos a la funcion crearContenidoCasilla, que dependiendo del
// 				tipo de casilla (imagen-texto), nos devuelve el tag html listo para mostrarlo en la casilla
// 			*/
// 			casilla=crearContenidoCasilla(valor1);
// 			//en nuestro div, mostramos el texto o la imagen devuelta
// 			this.appendChild(casilla);	
// 			destapada=true;	
// 		}
// 		else
// 		{	
// 			turno=0;
// 			/*Preguntamos que la nueva casilla donde el usuario hizo click sea diferente de la primera
// 				si no se hace esto, el usuario acierta al hacer otra vez click en la misma casilla
// 			*/
// 			if(valor != valor1)
// 			{
			
// 				valor2=valor;
// 				console.log("el valor2 es: "+valor2);
				

// 				casilla=crearContenidoCasilla(valor2);
// 				//en nuestro div, mostramos el texto o la imagen devuelta
// 				this.appendChild(casilla);
				
				
// 				//Preguntamos si los numeros de las casillas son iguales y si no se han adivinado
// 				if(vectorCasillas[valor1].numero == vectorCasillas[valor2].numero)
// 				{
// 					//iguales

					
// 					/*en el numero, le damos el valor -1, con eso en el momento de 
// 						ocultar las casillas si el usurio falla, refrescamos todo el tablero
// 						con la excepcion de las casillas que ya se adivinaron
// 					*/
// 					vectorCasillas[valor1].numero=-1;
// 					vectorCasillas[valor2].numero=-1;
// 				}
// 				else
// 				{
// 					//diferentes
// 					/*si son diferentes se limpian todas las casillas despues de 650 milisegundos				
// 						es necesario hacerlo así, porque sino esto es tan rapido, que simplemente 
// 						al hacer clic en otra casilla que no es pareja de la que se habia seleccionado,
// 						el programa oculta las dos casillas, y ni se alcanza a ver la segunda.

// 						Tambien toca limpiar todas las casillas, ya que si se limpian solamente donde el usuario hace click,
// 						el usuario puede hacer trampa, y hacer clic en varias casillas a la vez, y como en esta funcion se manejan
// 						solo las variables valor1, y valor2, entonces se ocultarian solo las 2 ultimas casillas donde se hizo click,
// 						dejando visibles las primeras en donde se hizo click
// 					*/

// 					valor1=-2;
// 					valor2=-3;
// 					setTimeout(function(){
// 						limpiarCasillas();
// 					},650);
// 				}
// 				destapada=false;
// 			}
// 		}
// 	}	
// }


function limpiarCasillas()
{
	for (var i = 0; i < vectorCasillas.length; i++) {

		//Si el numero de la casilla es diferente a "-1" significa que no se ha adivinado
		if(vectorCasillas[i].numero != -1)
		{
			document.getElementById(i).innerHTML="";
		}
	}
}



//si turno=0 --> entonces no habia otra casilla destapada
		if (turno == 0) 
		{
			valor1=valor;			
			turno=1;
			contenido=$(this).children().fadeToggle();
			console.log("El hijo es: "+$(this).children());
					
		}
		else
		{	
			turno=0;
						
				valor2=valor;				
				contenido=$(this).children().fadeToggle();
				console.log("El hijo es: "+$(this).children());				
					
				if(vectorCasillas[valor1].numero != vectorCasillas[valor2].numero)
				{
					//diferentes
				}
				else
				{
					
					//iguales					
					vectorCasillas[valor1].numero=-1;
					vectorCasillas[valor2].numero=-1;
					
				}				
			
		}		