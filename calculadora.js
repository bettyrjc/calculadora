window.onload= function(){ //acciones tras cargar la pagina
  pantalla = document.getElementById('text'); //elemento pantalla de salida
  document.onkeydown= teclado;
}
x="0";//guardar el numero en la pantalla
xi="1";// iniciar el numero en la pantalla 1=si; 0=no;
coma=0;// estado de coma decimal 0=no; 1=si;
ni=0;// numero oculto en espera
op="no";//operaciones en curso; no=sin operacion.

//para visualizar el numero//
function numero(xx){ // recoge el numero pulsado en el argunmento
  if (x=="0" || xi=="1"){ //inicializar un numero
    pantalla.innerHTML=xx; //mostrar en pantalla
    x=xx;
    if(xx==" . "){ //si escribimos una coma al principio del numero
      pantalla.innerHTML="0.";
      x=xx;// guardar el numero
      coma=1; //cambia el estado de la coma
    }
  }
  else{//continuar escribiendo un numero
    if (xx=="."  && coma==0){
      //si se escribe la coma decimal por primera vez
      pantalla.innerHTML+=xx;
      x+=xx;
      coma=1; //cambiar el estado de la coma
    }
    //para que no se escriban dos comas
    else if (xx=="." && coma==1){}
    //resto de casos: escribir un numero del 0 al9:
    else {
      pantalla.innerHTML+=xx;
      x+=xx;
          }
  }
    xi=0// el numero esta iniciado y podemos ampliarlo
  }

  function operar(s){
    igualar();// si hay operaciones pendientes se realizan primero
    ni=x;//ponemos el numero en espera.
    op=s; //guardamos el tipo de operacion
    xi=1;//inicializarlapantalla
  }
  function igualar(){
    if (op=="no"){//no hay operaciones pendiente
      pantalla.innerHTML=x;
    }
    else {//con operacion pendiente resolvemos.
      sl=ni+op+x//escribimos la operacion en una cadena.
      sol=eval(sl)// convertimos la cadena a codigo y resolvemos
      pantalla.innerHTML=sol //mostramos la solucion
      x=sol; //guardamos la solucion
      op="no"; //ya no hay operaciones pendietes
      xi=1; //se puede reiniciar la pantalla
    }
  }
function raizc(){
  x=Math.sqrt(x)//resolver raiz cuadrada
  pantalla.innerHTML=x; //mostrar en pantalla resultado
  op="no"//quitar operaciones pendientes
  xi=1; //se puede reiniciarla pantalla
}
function porcent() {
  x=x/100 // dividir por 100 el numero
  pantalla.innerHTML=x;// mostrar en pantalla
  igualar() //resuelve y muestra operaciones pendiente
  xi=1; //reiniciar la pantalla
}
function opuest(){
  nx=Number(x);//convertir  en numero
  nx=-nx;// cambiar de signo
  x=String(nx); // volver a convertir en cadena
  pantalla.innerHTML=x; //mostrar en pantalla
}

function inve() {
nx=Number(x);
nx=(1/nx);
x= String(nx);
pantalla.innerHTML=x;
xi=1;
}
function retro() {// borrar solo el ultimo caracter
  cifras=x.length// los caracteres de la pantalla
  br = x.substr(cifras-1, cifras); //info del ultmo caracter
  x=x.substr(0,cifras-1)// quitar el ultimo caracter
  if (x=="")
  {x="0";}// si yano quedan numero colocas cero.
  if(br==".")
  {
    coma=0; //escribir de nuevo la coma
  }
  pantalla.innerHTML=x;//mostrar el numero.
}
function borradoParcial() {
    pantalla.innerHTML=0; //Borrado de pantalla;
    x=0; //Borrado indicador número pantalla.
    coma=0; //reiniciamos también la coma
}
function borradoTotal() {
pantalla.innerHTML=0; //poner pantalla a 0
x="0"; //reiniciar número en pantalla
coma=0; //reiniciar estado coma decimal
ni=0 //indicador de número oculto a 0;
op="no" //borrar operación en curso.
}
function teclado(elEvento) {
  evento = elEvento || window.event;
  k=evento.keyCode;

  if (k>47&&k<58){//teclado alfanumerico
    p=k-48; //buscar el numero a mostrar;
    p=String(p);//convertir en cadena para pasar a la pantalla.
    numero(p); //enviar para mostrarla pantalla
  }
  //del teclado de numeros.
  if(k>95 && k<106){
    p=k-96;
    p=String(p);
    numero(p);
  }
  if (k==110 || k==190) {numero(".")} //teclas de coma decimal
  if (k==106) {operar('*')} //tecla multiplicación
  if (k==107) {operar('+')} //tecla suma
  if (k==109) {operar('-')} //tecla resta
  if (k==111) {operar('/')} //tecla división
  if (k==32 || k==13) {igualar()} //Tecla igual: intro o barra espaciadora
  if (k==46) {borradoTotal()} //Tecla borrado total: "supr"
  if (k==8) {retro()} //Retroceso en escritura : tecla retroceso.
 if (k==36) {borradoParcial()} //Tecla borrado parcial: tecla de inicio.
}
