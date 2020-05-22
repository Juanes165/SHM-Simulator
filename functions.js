var masa = document.getElementById("masa");
var masaPolea = document.getElementById("masaPolea");
var constanteElastica = document.getElementById("constanteElastica");
var desplazamientoInicial = -5;
var velocidadInicial = 1;

var w;
var frecuencia;
var periodo;
var amplitud;
var phi;
var tiempo = 3;

var velocidad;
var desplazamiento;
var energiaCinetica;
var energiaCineticaRotativa;
var energiaPotencial;


w = Math.sqrt(2*k/(2*masa + masaPolea));
frecuencia = w/(2*Math.PI);
periodo = 1/frecuencia;
phi = Math.atan(w*desplazamientoInicial/velocidadInicial);


if(phi != 0)
{
    amplitud = desplazamientoInicial/Math.sin(phi);
}
else
{
    amplitud = velocidadInicial/(w*Math.cos(phi));
}

desplazamiento = amplitud*Math.sin(w*tiempo + phi);
velocidad = w*amplitud*Math.cos(w*tiempo + phi);


energiaCinetica = masa*(Math.pow(velocidad,2))/2 + (masaPolea*Math.pow(velocidad,2))/4;
energiaPotencial = k*(Math.pow(desplazamiento,2))/2;


masa = Math.round(masa*1000)/1000;
k = Math.round(k*1000)/1000;
desplazamientoInicial = Math.round(desplazamientoInicial*1000)/1000;
velocidadInicial = Math.round(velocidadInicial*1000)/1000;
w = Math.round(w*1000)/1000;
frecuencia = Math.round(frecuencia*1000)/1000;
periodo = Math.round(periodo*1000)/1000;
amplitud = Math.round(amplitud*1000)/1000;
phi = Math.round(phi*1000)/1000;
tiempo = Math.round(tiempo*1000)/1000;
velocidad = Math.round(velocidad*1000)/1000;
desplazamiento = Math.round(desplazamiento*1000)/1000;
energiaCinetica = Math.round(energiaCinetica*1000)/1000;
energiaPotencial = Math.round(energiaPotencial*1000)/1000;



document.write("Masa: ", masa, " kg" ,"<br>")
document.write("Masa Polea: ", masaPolea, " kg", "<br>")
document.write("Constante elastica: ", k, " N/m", "<br>")
document.write("Frecuencia(rad): ", w, " Rad/s", "<br>")
document.write("Frecuencia(Hz): ", frecuencia, " Hz", "<br>")
document.write("Periodo: ", periodo, " seg", "<br>")
document.write("Amplitud: ", amplitud, "<br>")
document.write(String.fromCharCode(934) + ":", phi, " Rad", "<br>")
document.write("Tiempo: ", tiempo, " seg", "<br>")
document.write("Desplazamiento: ", desplazamiento, " mts" , "<br>")
document.write("Velocidad: ", velocidad, " m/s", "<br>")
document.write("Energia cinetica: ", energiaCinetica, " J", "<br>")
document.write("Energia potencial: ", energiaPotencial, " J", "<br>")

/*
console.log("W:", w);
console.log("frecuencia:", frecuencia);
console.log("periodo:", periodo);
console.log("amplitud:", amplitud);
console.log(String.fromCharCode(966) + ":", phi);
console.log("tiempo:", tiempo);
console.log("velocidad:", velocidad);
console.log("desplazamiento:", desplazamiento);
console.log("energia cinetica:", energiaCinetica);
console.log("energia potencial:", energiaPotencial);

//console.log(String.fromCharCode(934));*/