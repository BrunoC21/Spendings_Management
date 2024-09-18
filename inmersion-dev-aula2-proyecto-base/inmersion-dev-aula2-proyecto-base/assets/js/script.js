let namesGastos = [];
let gastos = [];
let descripciones = [];
let alertaGasto = false;
let posicionActual = null;

function clickBoton(){
    let nameGasto = document.getElementById('nombreGasto').value;
    let gasto = document.getElementById('valorGasto').value;
    let descripcion = document.getElementById('descripcionGasto').value;

    namesGastos.push(nameGasto);
    gastos.push(gasto);
    descripciones.push(descripcion);

    actualizarGastos();
}

function actualizarGastos(){
    const elementList = document.getElementById('listaDeGastos');
    const elementTotal = document.getElementById('totalGastos');
    let list = '';
    let totalGasto = 0;

    namesGastos.forEach((nombre, posicion) => {
        const valor = gastos[posicion];
        const detalle = descripciones[posicion];
        
        if (posicion === posicionActual) {
            
            list += `<li>${nombre}: ${detalle} - CLP <input type="number" id="nuevoValor${posicion}" value="${valor}">
                    <button onclick="guardarCambios(${posicion})">Guardar</button>
                    <button onclick="cancelarModificacion()">Cancelar</button>
                    </li>`;
        } else {
            
            list += `<li>${nombre}: ${detalle} - CLP ${valor} 
                    <button onclick="modificarGasto(${posicion})">Modificar</button>
                    <button onclick="eliminarGasto(${posicion});">Eliminar</button>
                    </li>`;
        }

        totalGasto += Number(valor);
    });

    if (totalGasto > 150000 && !alertaGasto) {
        alert("Aviso: Tu gasto total tiene un valor muy elevado, se cuidadoso con lo que compras.");
        alertaGasto = true;
    }

    elementList.innerHTML = list;
    elementTotal.innerHTML = totalGasto;
    limpiar();
}

function limpiar(){
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
}

function eliminarGasto(posicion){
    namesGastos.splice(posicion, 1);
    gastos.splice(posicion, 1);
    descripciones.splice(posicion, 1);
    actualizarGastos();
}

function modificarGasto(posicion){
    posicionActual = posicion;
    actualizarGastos(); 
}

function guardarCambios(posicion){
    const nuevoValor = document.getElementById(`nuevoValor${posicion}`).value;
    gastos[posicion] = nuevoValor;
    posicionActual = null;
    actualizarGastos();
}

function cancelarModificacion(){
    posicionActual = null;
    actualizarGastos();
}
