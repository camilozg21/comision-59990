// const AGENCIAS =[
//     {
//         departamento: "Amazonas",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Antioquia",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Arauca",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Atlántico",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Bogotá D.C.",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Bolívar",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Boyacá",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Caldas",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Caqueta",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Casanare",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Cauca",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Cesar",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Chocó",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Córdoba",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Cundinamarca",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Guainía",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Guaviare",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Huila",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "La Guajira",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Magdalena",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Meta",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Nariño",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Norte de Santander",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Putumayo",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Quindío",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Risaralda",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "San Andrés y Providencia",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Santander",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Sucre",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Tolima",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Valle del Cauca",
//         clasificacion:"Bajo"
//     },
//     {
//         departamento: "Vaupés",
//         clasificacion:"Alto"
//     },
//     {
//         departamento: "Vichada",
//         clasificacion:"Alto"
//     }
// ]

async function miJson(){
    const responseJson = await fetch('datos.json');
    const Data = await responseJson.json();

    return Data.AGENCIAS
}

const AGENCIAS = miJson()

let seleccion = document.getElementById("departamento");

let opcion = document.createElement("option");
opcion.innerText = "-Seleccione un departamento-";
opcion.value = null;
seleccion.appendChild(opcion);

for (const nombre of AGENCIAS) {
    opcion = document.createElement("option");
    opcion.innerText = nombre.departamento;
    opcion.value = nombre.departamento;
    seleccion.appendChild(opcion);
}

const CATEGORIAS = [
    {
        calificacion: "A",
        interes: 0.1955
    },
    {
        calificacion: "B",
        interes: 0.2385
    },
    {
        calificacion: "C",
        interes: 0.2815
    }
]

const otorgarCredito = document.getElementById('estudioCredito');

otorgarCredito.addEventListener('click', function(){

    const SMLMV = 1300000;
    let nombre = document.getElementById("nombre").value || "Falsy";
    let edad = parseInt(document.getElementById("edad").value) || "Falsy";
    let ubicacion = document.getElementById("departamento").value || "Falsy";
    let valorCredito = parseFloat(document.getElementById("credito").value) || "Falsy";
    let plazo = parseInt(document.getElementById("plazo").value) || "Falsy";
    let activos = parseFloat(document.getElementById("activos").value) || "Falsy";
    let genero = document.querySelector('input[name="sexo"]:checked') || "Falsy";
    let tipoDeVivienda = document.querySelector('input[name="civil"]:checked') || "Falsy";
    let estadoCivil = document.querySelector('input[name="civil"]:checked') || "Falsy ";

    if(nombre === "Falsy" || edad === "Falsy" || ubicacion === "Falsy" || valorCredito === "Falsy" || plazo === "Falsy" || activos === "Falsy" || genero === "Falsy" || tipoDeVivienda === "Falsy" || estadoCivil === "Falsy"){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha completado toda la información",
        });
    }
    else{
        let vaciarRespuesta = document.getElementById("respuesta-credito") || "Falsy";
        if (vaciarRespuesta != "Falsy"){
        vaciarRespuesta.remove()}
        localStorage.clear()

        let plazoR = plazo <= 6 ? 1 : plazo <= 12 ? 2 : plazo <= 18 ? 3 : plazo <= 24 ? 4 : 5;
        let activosR = activos/SMLMV <= 5 ? 1 : activos/SMLMV <= 10 ? 2 : activos/SMLMV <= 15 ? 3 : activos/SMLMV <= 20 ? 4 : 5
        let estadoCivilR = estadoCivil.value === "C" ? 1 : 0;
        let generoR = genero.value === "F" ? 1 : 0;
        let viviendaR = tipoDeVivienda.value === "P" ? 1 : 0;
        let creditoR = valorCredito < SMLMV ? 1 : valorCredito <= 1.5*SMLMV ? 2 : 3;
        let edadR = edad < 18 ? null : edad <= 30 ? 0 : edad <= 40 ? 1 : edad <= 50 ? 2 : 3;

        let agenciaCliente = AGENCIAS.find(altoRiesgo => altoRiesgo.departamento == ubicacion);
        let agenciaAR;
        let agenciaBR;

        switch (agenciaCliente.clasificacion){
            case "Alto":
                agenciaAR = 1
                agenciaBR = 0
                break;
            case "Bajo":
                agenciaAR = 0
                agenciaBR = 1
                break;
        }

        function scoring(agenciaAR, agenciaBR, generoR, estadoCivilR, viviendaR, edadR, activosR, creditoR, plazoR){
        let score;
        score = - 0.900 + 0.579 * agenciaAR - 0.731 * agenciaBR - 0.348 * generoR - 1.059 * estadoCivilR - 0.243 * viviendaR - 0.145 * edadR - 0.118 * activosR - 0.397 * creditoR + 0.293 * plazoR
        return Math.exp(score)/(1+Math.exp(score))
        }

        let probabilidadImpago = scoring(agenciaAR, agenciaBR, generoR, estadoCivilR, viviendaR, edadR, activosR, creditoR, plazoR);

        let estadoCredito;
        let calificacionCredito;

        if (probabilidadImpago < 0.0376){
            calificacionCredito = "A"
            estadoCredito = 1
        } else if(probabilidadImpago < 0.0616){
            calificacionCredito = "B"
            estadoCredito = 1
        } else if(probabilidadImpago < 0.0933){
            calificacionCredito = "C"
            estadoCredito = 1
        } else {
            calificacionCredito = "Default"
            estadoCredito = 0
        }
        let contenedor = document.getElementById("contenedor");
        let respuesta = document.createElement("p");
        let resultado;

        if(estadoCredito === 0){
            resultado = "Su crédito ha sido negado";
            
        }else{
            let aprobado = CATEGORIAS.find(tasa => tasa.calificacion === calificacionCredito);
            let tasaDeInteres = Math.pow((1 + parseFloat(aprobado.interes)),(1/12))-1;
            resultado = `Su crédito ha sido aprobado satisfactoriamente con un interés mensual de ${Number(tasaDeInteres.toFixed(4))*100}%`;
        }
        respuesta.innerText = resultado
        respuesta.id = "respuesta-credito"
        contenedor.appendChild(respuesta);

        let informacion = [
            {
                nombre: nombre,
                edad: edad,
                ubacion: ubicacion,
                valorCredito: valorCredito,
                plazo: plazo,
                activos: activos,
                genero: genero,
                tipoDeVivienda: tipoDeVivienda,
                estadoCivil: estadoCivil,
                respuesta: resultado
            }
        ]

        let informacionJSON = JSON.stringify(informacion)
        localStorage.setItem("ultimoSolicitante", informacionJSON);
    }
})


const historial = document.getElementById('solicitudAnterior');

historial.addEventListener('click', function(){
    let persona =JSON.parse(localStorage.getItem("ultimoSolicitante"));
    let sectionHistorial = document.getElementById("historial");
    if (persona && persona.length > 0) {
        let respuesta = document.createElement("p");
        respuesta.innerText = `La respuesta de la solicitud de ${persona[0].nombre} fue: ${persona[0].respuesta}`;
        sectionHistorial.appendChild(respuesta);
    } else {
        let respuesta = document.createElement("p");
        respuesta.innerText = "No hay información previa de solicitudes de crédito.";
        sectionHistorial.appendChild(respuesta);
    }
})