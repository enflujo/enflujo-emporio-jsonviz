import noUiSlider from "noUiSlider";

export default class rangoTiempo {
    constructor() {
        this.duracion = 0;

        this.selector1 = document.getElementById('selector1');
        this.selector2 = document.getElementById('selector2');
        this.selector1texto = document.getElementById('selector1texto');
        this.selector2texto = document.getElementById('selector2texto');

        this.selector1.oninput = function () {
            this.selector1texto.innerHTML = `Min: ${this.value}`;
        }
    }

    establecerDuracion(datos) {
        // Go through all detections and set video length
        let tiempoMaximo = -1;
        for (let nombre in datos){
            for (let deteccion of datos[nombre]) {
                if (deteccion['tiempo'] > tiempoMaximo){
                    tiempoMaximo = deteccion['tiempo'];
                }
            }
        }
        this.duracion = tiempoMaximo;
        this.selector1.setAttribute('max', `${Math.ceil(this.duracion)}`);
        this.selector2.setAttribute('max', `${Math.ceil(this.duracion)}`);
    }

    min() {
        return parseInt(this.selector1)
    }
}