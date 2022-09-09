import './scss/estilos.scss';
import datosJson from '../json/0013_50.json';

const lienzo = document.getElementById('lienzo');
const ctx = lienzo.getContext('2d');

var selector1 = document.getElementById('selector1');
var selector2 = document.getElementById('selector2');
var selector1texto = document.getElementById('selector1texto');
var selector2texto = document.getElementById('selector2texto');

var selectorNombre = document.getElementById('selectorNombre');
var selectorConfianza = document.getElementById('selectorConfianza');
var confianzaTexto = document.getElementById('confianzaTexto');

lienzo.width = 640;
lienzo.height = 480;

inicializar(datosJson);

function dibujar(datosJson) {
    ctx.clearRect(0, 0, lienzo.width, lienzo.height);

    const datos = datosJson[selectorNombre.value];

    var contar = 0;
    datos.forEach((a) => {
        if (a.tiempo >= parseFloat(selector1.value) &&
             a.tiempo <= parseFloat(selector2.value) &&
             a.confianza * 100 >= selectorConfianza.value){
            contar += 1;
        }
    });

    const opacidad = 1 / (contar + 50);
    datos.forEach((a) => {
        if (a.tiempo >= parseFloat(selector1.value) &&
             a.tiempo <= parseFloat(selector2.value) &&
             a.confianza * 100 >= selectorConfianza.value){
            const area = a.area;
            const [x, y, ancho, alto] = area;      
            dibujarRecuadros(x, y, ancho, alto, opacidad < 0.002 ? 0.002 : opacidad);
            // console.log('area aviones', area)
        }
    });
}

dibujar(datosJson);

selector1.oninput = function () {
    selector1texto.innerHTML = `Min: ${new Date(this.value * 1000).toISOString().substr(14, 5)}`;
    dibujar(datosJson);
}

selector2.oninput = function () {
    selector2texto.innerHTML = `Max: ${new Date(this.value * 1000).toISOString().substr(14, 5)}`;
    dibujar(datosJson);
}

selectorNombre.oninput = function () {
    dibujar(datosJson);
}

selectorConfianza.oninput = function () {
    confianzaTexto.innerHTML = `Confidence: ${selectorConfianza.value}%`;
    dibujar(datosJson);
}

function dibujarRecuadros(x, y, ancho, alto, opacidad){
    ctx.beginPath();
    ctx.lineWidth = "0.1";
    // ctx.strokeStyle = "white";
    ctx.fillStyle = `rgba(155, 89, 182, ${opacidad})`;
    ctx.fillRect(x, y, ancho, alto);
    // ctx.stroke();
}

function inicializar(datos) {
    // Go through all detections and set video length
    let tiempoMaximo = -1;
    for (let nombre in datos){
        const n = document.createElement('option')
        n.setAttribute('value', nombre)
        n.innerHTML = nombre;
        selectorNombre.appendChild(n);

        for (let deteccion of datos[nombre]) {
            if (deteccion['tiempo'] > tiempoMaximo){
                tiempoMaximo = deteccion['tiempo'];
            }
        }
    }
    selector1.setAttribute('max', `${Math.ceil(tiempoMaximo)}`);
    selector2.setAttribute('max', `${Math.ceil(tiempoMaximo)}`);
    selector2.setAttribute('value', `${Math.ceil(tiempoMaximo)}`);
    selector2texto.innerHTML = `Max: ${new Date(Math.ceil(tiempoMaximo) * 1000).toISOString().substr(14, 5)}`;
}

console.log(datosJson)

