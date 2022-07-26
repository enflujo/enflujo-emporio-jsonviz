import './scss/estilos.scss';
import datosJson from '../json/reel11_0015.json';

const lienzo = document.getElementById('lienzo');
const ctx = lienzo.getContext('2d');

const datosPersonas = datosJson.person;
const datosCometas = datosJson.kite;
const datosAviones = datosJson.airplane;

lienzo.width = 640;
lienzo.height = 480;

function dibujar(datos) {
    const opacidad = 1 / datos.length;

    datos.forEach((a) => {
        const area = a.area;
        const [x, y, ancho, alto] = area;      
        dibujarRecuadros(x, y, ancho, alto, opacidad < 0.002 ? 0.002 : opacidad);
        // console.log('area aviones', area)
    })
}

dibujar(datosPersonas)
// dibujar(datosAviones)
// dibujar(datosPersonas)

function dibujarRecuadros(x, y, ancho, alto, opacidad){
    ctx.beginPath();
    ctx.lineWidth = "0.1";
    // ctx.strokeStyle = "white";
    ctx.fillStyle = `rgba(155, 89, 182, ${opacidad})`;
    ctx.fillRect(x, y, ancho, alto);
    // ctx.stroke();
}

console.log(datosJson)

