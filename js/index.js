const otorgarCredito = document.getElementById('estudioCredito');

otorgarCredito.addEventListener('click', function(){
    let agencias =[
        {
            departamento: "Amazonas",
            clasificacion:"Alto"
        },
        {
            departamento: "Antioquia",
            clasificacion:"Bajo"
        },
        {
            departamento: "Arauca",
            clasificacion:"Alto"
        },
        {
            departamento: "Atlántico",
            clasificacion:"Bajo"
        },
        {
            departamento: "Bogotá D.C.",
            clasificacion:"Bajo"
        },
        {
            departamento: "Bolívar",
            clasificacion:"Bajo"
        },
        {
            departamento: "Boyacá",
            clasificacion:"Bajo"
        },
        {
            departamento: "Caldas",
            clasificacion:"Bajo"
        },
        {
            departamento: "Caqueta",
            clasificacion:"Alto"
        },
        {
            departamento: "Casanare",
            clasificacion:"Alto"
        },
        {
            departamento: "Cauca",
            clasificacion:"Alto"
        },
        {
            departamento: "Cesar",
            clasificacion:"Alto"
        },
        {
            departamento: "Chocó",
            clasificacion:"Alto"
        },
        {
            departamento: "Córdoba",
            clasificacion:"Bajo"
        },
        {
            departamento: "Cundinamarca",
            clasificacion:"Bajo"
        },
        {
            departamento: "Guainía",
            clasificacion:"Alto"
        },
        {
            departamento: "Guaviare",
            clasificacion:"Alto"
        },
        {
            departamento: "Huila",
            clasificacion:"Bajo"
        },
        {
            departamento: "La Guajira",
            clasificacion:"Alto"
        },
        {
            departamento: "Magdalena",
            clasificacion:"Bajo"
        },
        {
            departamento: "Meta",
            clasificacion:"Alto"
        },
        {
            departamento: "Nariño",
            clasificacion:"Bajo"
        },
        {
            departamento: "Norte de Santander",
            clasificacion:"Alto"
        },
        {
            departamento: "Putumayo",
            clasificacion:"Alto"
        },
        {
            departamento: "Quindío",
            clasificacion:"Bajo"
        },
        {
            departamento: "Risaralda",
            clasificacion:"Bajo"
        },
        {
            departamento: "San Andrés y Providencia",
            clasificacion:"Alto"
        },
        {
            departamento: "Santander",
            clasificacion:"Bajo"
        },
        {
            departamento: "Sucre",
            clasificacion:"Alto"
        },
        {
            departamento: "Tolima",
            clasificacion:"Bajo"
        },
        {
            departamento: "Valle del Cauca",
            clasificacion:"Bajo"
        },
        {
            departamento: "Vaupés",
            clasificacion:"Alto"
        },
        {
            departamento: "Vichada",
            clasificacion:"Alto"
        }
    ]

    const SMLMV = 1300000;
    let ubicacion = prompt('¿En cuál departamento estás ubicado?');
    let valorCredito = parseInt(prompt('¿Cuánto es el valor del crédito que quieres solicitar?'));
    let plazo = parseInt(prompt('¿Cuántos meses estimas que tomarás en pagar el dinero?'));
    let edad = parseInt(prompt('Ingrese su edad'));
    let activos = parseInt(prompt('¿A cuánto ascienden sus activos?'));
    let genero = prompt('Ingrese su genero');
    let tipoDeVivienda = prompt('¿Vives en casa propia?');
    let estadoCivil = prompt('¿Eres casado?');
    let plazoR;
    let activosR;
    let estadoCivilR;
    let generoR;
    let viviendaR;
    let creditoR;
    let edadR;

    if (plazo <= 6){
        plazoR = 1
    }
    else if(plazo <= 12){
        plazoR = 2
    }
    else if(plazo <= 18){
        plazoR = 3
    }
    else if(plazo <= 24){
        plazoR = 4
    }
    else{
        plazoR = 5
    }

    if (edad < 18){
        
    }
    else if(edad <= 30){
        edadR = 0
    }
    else if(edad <= 40){
        edadR = 1
    }
    else if(edad <= 50){
        edadR = 2
    }
    else{
        edadR = 5
    }

    if ((activos/SMLMV) <= 5){
        activosR = 1
    }
    else if((activos/SMLMV) <= 10){
        activosR = 2
    }
    else if((activos/SMLMV) <= 15){
        activosR = 3
    }
    else if((activos/SMLMV) <= 20){
        activosR = 4
    }
    else{
        activosR = 5
    }

    if (valorCredito < SMLMV){
        creditoR = 1
    }
    else if(valorCredito <= 1.5*SMLMV){
        creditoR = 2
    }
    else{
        creditoR = 3
    }


    if (estadoCivil == 'Si' || estadoCivil == 'Sí'){
        estadoCivilR = 1
    }else{
        estadoCivilR = 0
    }

    if (tipoDeVivienda == 'Si' || tipoDeVivienda == 'Sí'){
        viviendaR = 1
    }else{
        viviendaR = 0
    }

    if (genero == 'Femenino' || genero == 'F'){
        generoR = 1
    }else{
        generoR = 0
    }

    let agenciaCliente = agencias.find(altoRiesgo => altoRiesgo.departamento == ubicacion);
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
    let z;
    z = - 0.900 + 0.579 * agenciaAR - 0.731 * agenciaBR - 0.348 * generoR - 1.059 * estadoCivilR - 0.243 * viviendaR - 0.145 * edadR - 0.118 * activosR - 0.397 * creditoR + 0.293 * plazoR
    return Math.exp(z)/(1+Math.exp(z))
    }

    let probabilidadImpago = scoring(agenciaAR, agenciaBR, generoR, estadoCivilR, viviendaR, edadR, activosR, creditoR, plazoR);

    let categorias = [
        {
            calificacion: "AA",
            interes: 0.1955
        },
        {
            calificacion: "A",
            pinteres: 0.2385
        },
        {
            calificacion: "B",
            interes: 0.2815
        }
    ]

    let estadoCredito;
    let calificacionCredito;

    if (probabilidadImpago < 0.0376){
        calificacionCredito = "AA"
        estadoCredito = 1
    } else if(probabilidadImpago < 0.0616){
        calificacionCredito = "A"
        estadoCredito = 1
    } else if(probabilidadImpago < 0.0933){
        calificacionCredito = "B"
        estadoCredito = 1
    } else {
        calificacionCredito = "Default"
        estadoCredito = 0
    }

    let aprobado = categorias.find(tasa => tasa.calificacion === calificacionCredito);

    let tasaDeInteres = Math.pow((1 + aprobado.interes),(1/12))-1;

    if(estadoCredito === 0){
        alert("Su crédito ha sido negado")
    }else{
        alert(`Su crédito ha sido aprobado satisfactoriamente con un interés mensual de ${Number(tasaDeInteres.toFixed(4))*100}%`)
    }


    // let deuda = valorCredito;
    // let valorCuota = parseInt(prompt('¿Cuánto puede pagar mensualmente?'));
    // let meses = 0;
    // let interes;
    // let interesMensual = Math.pow((1+tasaDeInteres),(1/12))-1;

    // function abono(cuota, valorinicial, interes){
    //     interes = valorinicial * interesMensual;
    //     return valorinicial + interes - cuota;
    // }


    // do{
    //     deuda = abono(valorCuota, deuda, interesMensual);
    //     meses ++;
    // }while(deuda>0)

    // console.log('Se tarda ' + meses + ' meses en pagar la deuda.');
})