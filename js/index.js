let valorCredito = parseInt(prompt('¿Cuánto es el valor del crédito que quieres solicitar?'));
let tasaDeInteres;

if(valorCredito<1000000){
    tasaDeInteres=0.12
}
else if(valorCredito<5000000){
    tasaDeInteres=0.15
}
else if(valorCredito<20000000){
    tasaDeInteres=0.20
}
else{
    tasaDeInteres=0.25
}

let deuda = valorCredito;
let valorCuota = parseInt(prompt('¿Cuánto puede pagar mensualmente?'));
let meses = 0;
let interes;
let interesMensual = Math.pow((1+tasaDeInteres),(1/12))-1;

function abono(cuota, valorinicial, interes){
    interes = valorinicial * interesMensual;
    return valorinicial + interes - cuota;
}


do{
    deuda = abono(valorCuota, deuda, interesMensual);
    meses ++;
}while(deuda>0)

console.log('Se tarda ' + meses + ' meses en pagar la deuda.');