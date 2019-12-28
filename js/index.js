var iRage;
var dJugador;
var ronda;
var iSR;
var nbAtk;

//objetos
var uno = {
    energia: 10,
    shield: 5,
    smash: 5,
    porcentaje: 0,
    nB: 3,
    tilt: 2,
    rage: 1,
    upB: 4,
    sideB: 3,
    jab: 0
}

var dos = {
    energia: 10,
    shield: 5,
    smash: 5,
    porcentaje: 0,
    nB: 3,
    tilt: 2,
    rage: 1,
    upB: 4,
    sideB: 3,
    jab: 0
}

$(document).ready(function () {

    var dJugador = $("#c-uno")[0];
    uno.shield += sRandom();
    uno.smash += nBRandom();
    uno.nB += sRandom();
    uno.tilt += sRandom();
    uno.rage += rageRandom();
    uno.upB += sRandom();
    uno.sideB += sRandom();

    dos.shield += sRandom();
    dos.smash += nBRandom();
    dos.nB += sRandom();
    dos.tilt += sRandom();
    dos.rage += rageRandom();
    dos.upB += sRandom();
    dos.sideB += sRandom();

    $("#porcentaje1").html(uno.porcentaje + ' %');
    $("#porcentaje2").html(dos.porcentaje + ' %');
    $("#energia2").html("E: " + dos.energia);
    $("#btn-ready").addClass("btn-ready-disabled");
});

function pasarTurno() {
    //actualizar reloj
    clearInterval(timer);
    $("#countdown").html('Tiempo!');
    $("#reloj").removeClass('relojOn').addClass('relojOff');

    //atributos
    dos.energia++;
    $("#ener-j").html(dos.energia);

    //desabilitar botones
    $("#dos,#j-defender,#j-passT").attr("disabled", true).addClass("btn-disabled-def");
    $("#uno").attr("disabled", false);

    //agregando defensa al final
    uno.def = uno.def + randomD();
    $("#def-r").html(uno.def);

    //hacer que el cpu haga algo al azar
    setTimeout(function () {
        cpuSeleccionAccion();
    }, 3000);
}

function nBRandom() {
    nbAtk = Math.floor(Math.random() * (4 - 1)) + 1;
    return nbAtk;
}

function sRandom() {
    iSR = Math.floor(Math.random() * (6 - 1)) + 1;
    return iSR;
}

function rageRandom() {
    iRage = Math.floor(Math.random() * (4 - 1)) + 1;
    return iRage;
}

function selectM(e) {

    let x = e.children[1].children[1].innerText;
  
    // console.log(dos.energia);
    if(x <= dos.energia){
        
    }
    else{
        return;
    }
  
    let nDiv = document.getElementById(e.id);
    $(nDiv).attr('onClick', 'dselectM(this);');
    $("#m-dos").append(e);
    x = parseInt(x, 10);
    medirEnergia("restar",x);
   
}

function dselectM(e) {

    let nDiv = document.getElementById(e.id);
    $(nDiv).attr('onClick', 'selectM(this);');
    $("#c-uno").append(e);
    let x = e.children[1].children[1].innerText;
    x = parseInt(x, 10);
    medirEnergia("sumar",x);
}

var allmove = document.getElementById("m-dos");
// allmove.addEventListener("DOMNodeInserted", handler, true);
$("body").on('DOMSubtreeModified', "#m-dos", handler);
$('#m-dos').bind('DOMNodeRemoved', function() {

    let x = $("#m-dos")[0];
    // console.log("dom lenght: ",x.children.length);
    if(x.children.length <= 3){
        bloquearCRestantes("no"); 
    }
});

function handler() {
    // Lo que se ejecuta cuando cambia un nodo div o span dentro de #chat
    if (allmove.childNodes.length >= 3) {

        bloquearCRestantes("si");

        $("#btn-ready").attr("disabled", false);
        $("#btn-ready").removeClass("btn-ready-disabled");

    } else {

        $("#btn-ready").attr("disabled", true);
        $("#btn-ready").addClass("btn-ready-disabled");
    }
}
$("#btn-ready").click(function () {


    $("#btn-ready").attr("disabled", true);
    $("#btn-ready").addClass("btn-ready-disabled");
    let mDOS = $("#m-dos")[0];
    let cUno = $("#c-uno")[0];

    for (i = 0; i < mDOS.childNodes.length;i++) {
        let x = document.getElementById(mDOS.childNodes[i].id);
        $(x).prop("onclick", null).off("click");
        // i = i - 3;
    }

    setTimeout(function () {
        for (i = 0; i < mDOS.childNodes.length;i = 0) {
            let x = document.getElementById(mDOS.childNodes[i].id);
            // console.log(x);
            $(x).attr('onClick', 'selectM(this);');
            i = i - 3;
            cUno.append(x);
            i = i - 3;
        }
        dos.energia+= 2;
        $("#energia2").html("E: " + dos.energia);
    }, 3000);
    stageOut();
    
    setTimeout(function(){disponibles()},3005);
    
});

function compararSmash() {
    randomizarValoresXTurno();
    showUnoValues();
    showDosValues();

    compararValorUno();
    compararValorDos();
    compararValorTres();
    // compararValorCuatro();
    // icreaseRage();
    evaluarPorcentaje();
    stageOut();

    // dos.energia+= 10;
    // $("#energia2").html("E: " + dos.energia);
}

function compararValorUno() {

    let mov = $("#movimientos")[0];
    
    let iValorUnoCPU = mov.childNodes[1].childNodes[1].childNodes[3].innerText;
    let iValorUnoJ = mov.childNodes[3].childNodes[0].childNodes[3].innerText;
    // console.log(mov.childNodes[3].childNodes[0].childNodes[3].innerText);

    iValorUnoJ = parseInt(iValorUnoJ, 10);
    iValorUnoCPU = parseInt(iValorUnoCPU, 10);

    if (iValorUnoJ > iValorUnoCPU) {

        uno.porcentaje += iValorUnoJ - iValorUnoCPU;
        $("#porcentaje1").html(uno.porcentaje + ' %');

    } else if (iValorUnoJ == iValorUnoCPU) {

        uno.porcentaje += 2;
        dos.porcentaje += 2;
        dos.energia += 2;

        $("#porcentaje1").html(uno.porcentaje + ' %');
        $("#porcentaje2").html(dos.porcentaje + ' %');
        $("#energia2").html("E: " + dos.energia);


    } else {
        dos.porcentaje += iValorUnoCPU - iValorUnoJ;;
        $("#porcentaje2").html(dos.porcentaje + ' %');
        dos.energia += 1;
        $("#energia2").html("E: " + dos.energia);
    }
}

function compararValorDos() {

    let mov = $("#movimientos");

    let iValorUnoCPU = mov[0].childNodes[1].childNodes[3].childNodes[3].innerText;
    let iValorUnoJ = mov[0].childNodes[3].childNodes[1].childNodes[3].innerText;

    iValorUnoJ = parseInt(iValorUnoJ, 10);
    iValorUnoCPU = parseInt(iValorUnoCPU, 10);

    if (iValorUnoJ > iValorUnoCPU) {

        uno.porcentaje += iValorUnoJ - iValorUnoCPU;
        $("#porcentaje1").html(uno.porcentaje + ' %');

    } else if (iValorUnoJ == iValorUnoCPU) {

        uno.porcentaje += 2;
        dos.porcentaje += 2;
        dos.energia+= 2;

        $("#porcentaje1").html(uno.porcentaje + ' %');
        $("#porcentaje2").html(dos.porcentaje + ' %');
        $("#energia2").html("E: " + dos.energia);

    } else {

        dos.porcentaje += iValorUnoCPU - iValorUnoJ;;
        $("#porcentaje2").html(dos.porcentaje + ' %');
        dos.energia += 1;
        $("#energia2").html("E: " + dos.energia);
    }
}

function compararValorTres() {

    let mov = $("#movimientos");

    let iValorUnoCPU = mov[0].childNodes[1].childNodes[5].childNodes[3].innerText;
    let iValorUnoJ = mov[0].childNodes[3].childNodes[2].childNodes[3].innerText;

    iValorUnoJ = parseInt(iValorUnoJ, 10);
    iValorUnoCPU = parseInt(iValorUnoCPU, 10);

    if (iValorUnoJ > iValorUnoCPU) {

        uno.porcentaje += iValorUnoJ - iValorUnoCPU;
        $("#porcentaje1").html(uno.porcentaje + ' %');

    } else if (iValorUnoJ == iValorUnoCPU) {

        uno.porcentaje += 2;
        dos.porcentaje += 2;
        dos.energia += 2;

        $("#porcentaje1").html(uno.porcentaje + ' %');
        $("#porcentaje2").html(dos.porcentaje + ' %');
        $("#energia2").html("E: " + dos.energia);

    } else {

        dos.porcentaje += iValorUnoCPU - iValorUnoJ;;
        $("#porcentaje2").html(dos.porcentaje + ' %');
        dos.energia += 1;
        $("#energia2").html("E: " + dos.energia);
    }
}

function compararValorCuatro() {

    let mov = $("#movimientos");

    let iValorUnoCPU = mov[0].childNodes[1].childNodes[7].childNodes[3].innerText;
    let iValorUnoJ = mov[0].childNodes[3].childNodes[3].childNodes[3].innerText;

    iValorUnoJ = parseInt(iValorUnoJ, 10);
    iValorUnoCPU = parseInt(iValorUnoCPU, 10);

    if (iValorUnoJ > iValorUnoCPU) {

        uno.porcentaje += iValorUnoJ - iValorUnoCPU;
        $("#porcentaje1").html(uno.porcentaje + ' %');

    } else if (iValorUnoJ == iValorUnoCPU) {

        uno.porcentaje += 2;
        dos.porcentaje += 2;

        $("#porcentaje1").html(uno.porcentaje + ' %');
        $("#porcentaje2").html(dos.porcentaje + ' %');

    } else {

        dos.porcentaje += iValorUnoCPU - iValorUnoJ;;
        $("#porcentaje2").html(dos.porcentaje + ' %');
    }
}

function stageOut() {
    // console.log(uno.porcentaje)
    if (uno.porcentaje >= 150) {
        $("#resultado").html("Ganador: Jugador")
        $("#btn-ready").attr("disabled", true);

        // let mDOS = $("#m-dos")[0];
        let cUno = $("#c-uno")[0];

        $("#shield").prop("onclick", null).off("click");
        $("#smash").prop("onclick", null).off("click");
        $("#nb").prop("onclick", null).off("click");
        $("#tilt").prop("onclick", null).off("click");
        $("#upB").prop("onclick", null).off("click");
        $("#sideB").prop("onclick", null).off("click");
    }

    let y = $("#porcentaje1");
    (uno.porcentaje >= 5) ? y.addClass("cero-7"): null;
    if (uno.porcentaje >= 14) {
        y.addClass("cero-14")
    }
    if (uno.porcentaje >= 21) {
        y.addClass("cero-21")
    }
    if (uno.porcentaje >= 28) {
        y.addClass("cero-28")
    }
    if (uno.porcentaje >= 35) {
        y.addClass("cero-35")
    }
    if (uno.porcentaje >= 42) {
        y.addClass("cero-42")
    }
    if (uno.porcentaje >= 49) {
        y.addClass("cero-49")
    }
    if (uno.porcentaje >= 56) {
        y.addClass("cero-56")
    }
    if (uno.porcentaje >= 63) {
        y.addClass("cero-63")
    }
    if (uno.porcentaje >= 70) {
        y.addClass("cero-70")
    }
    if (uno.porcentaje >= 77) {
        y.addClass("cero-77")
    }
    if (uno.porcentaje >= 84) {
        y.addClass("cero-84")
    }
    if (uno.porcentaje >= 91) {
        y.addClass("cero-91")
    }
    if (uno.porcentaje >= 98) {
        y.addClass("cero-98")
    }

    let x = $("#porcentaje2");
    if (dos.porcentaje >= 5) {
        x.addClass("cero-7")
    }
    if (dos.porcentaje >= 14) {
        x.addClass("cero-14")
    }
    if (dos.porcentaje >= 21) {
        x.addClass("cero-21")
    }
    if (dos.porcentaje >= 28) {
        x.addClass("cero-28")
    }
    if (dos.porcentaje >= 35) {
        x.addClass("cero-35")
    }
    if (dos.porcentaje >= 42) {
        x.addClass("cero-42")
    }
    if (dos.porcentaje >= 49) {
        x.addClass("cero-49")
    }
    if (dos.porcentaje >= 56) {
        x.addClass("cero-56")
    }
    if (dos.porcentaje >= 63) {
        x.addClass("cero-63")
    }
    if (dos.porcentaje >= 70) {
        x.addClass("cero-70")
    }
    if (dos.porcentaje >= 77) {
        x.addClass("cero-77")
    }
    if (dos.porcentaje >= 84) {
        x.addClass("cero-84")
    }
    if (dos.porcentaje >= 91) {
        x.addClass("cero-91")
    }
    if (dos.porcentaje >= 98) {
        x.addClass("cero-98")
    }
}

function icreaseRage() {
    if (uno.porcentaje > dos.porcentaje) {
        dos.rage += 1;
        // uno.rage += 1;
        // $("#rage1").html("Rage: " + uno.rage);
        $("#rage2").html("Rage: " + dos.rage);

    } else if (dos.porcentaje > uno.porcentaje) {
        uno.rage += 1;
        // dos.rage += 1;
        $("#rage1").html("Rage: " + uno.rage);
        // $("#rage2").html("Rage: " + dos.rage);
    }
}

function evaluarPorcentaje() {

    uno.porcentaje += dos.rage;
    dos.porcentaje += uno.rage;

    $("#porcentaje1").html(uno.porcentaje + ' %');
    $("#porcentaje2").html(dos.porcentaje + ' %');
}

function randomizarValoresXTurno() {
    uno.shield += sRandom();
    uno.smash += nBRandom();
    uno.nB += sRandom();
    uno.tilt += sRandom();
    uno.rage += rageRandom();
    uno.upB += sRandom();
    uno.sideB += sRandom();

    dos.shield += sRandom();
    dos.smash += nBRandom();
    dos.nB += sRandom();
    dos.tilt += sRandom();
    dos.rage += rageRandom();
    dos.upB += sRandom();
    dos.sideB += sRandom();
}

function bloquearCRestantes(bloquear) {

    let CUNO = $("#c-uno")[0];
    for (i = 0; i < CUNO.children.length; i++) {
        let x = CUNO.children[i].id;
        let y = document.getElementById(x);
       
        for (j = 0; j < CUNO.children[i].children.length; j++) {

            let z = CUNO.children[i].children[j].id;
            if (z.includes('img-')) {

                switch(bloquear){
                    case "si":
                        $(y).prop("onclick", null).off("click").addClass('oscurecer');
                    break;
                    case "no":
                        $(y).attr('onClick', 'selectM(this);').removeClass('oscurecer');
                    break;
                }
            }
        }
    }
}

function showUnoValues() {
    $("#shield-value1").html(uno.shield);
    $("#smash-value1").html(uno.smash);
    $("#nb1-value").html(uno.nB);
    $("#tilt1-value").html(uno.tilt);
    $("#rage1").html("Rage: " + uno.rage);
    $("#upb-value1").html(uno.upB);
    $("#sideB-value1").html(uno.sideB);
}

function showDosValues() {

    $("#shield-value").html(dos.shield);
    $("#smash-value").html(dos.smash);
    $("#nb-value").html(dos.nB);
    $("#tilt-value").html(dos.tilt);
    $("#rage2").html("Rage: " + dos.rage);
    // $("#energia2").html("E: " + dos.energia);
    $("#upb-value").html(dos.upB);
    $("#sideB-value").html(dos.sideB);
    $("#jab-value").html(dos.jab);
}

function medirEnergia(accion,costo){

    switch(accion){
        case "restar":
            dos.energia -= costo;
            // console.log(dos.energia);
            $("#energia2").html("E: " + dos.energia);
            disponibles();
            if(dos.energia == 0){
                bloquearCRestantes("si");
                console.log("detecto energia igual a cero");

            }else if(dos.energia == 0){
                bloquearCRestantes("no");
            }
        break;
        case "sumar":
            dos.energia += costo;
            $("#energia2").html("E: " + dos.energia);
            disponibles();
            // if(dos.energia == 0){
            //     bloquearCRestantes("si");

            // }else if(dos.energia == 0){
            //     bloquearCRestantes("no");
            // }
        break;
    }
    console.log("e actual: ", dos.energia);
}
function disponibles(){

    let CUNO = $("#c-uno")[0];
    for (i = 0; i < CUNO.children.length; i++) {
        let x = CUNO.children[i];
        let y = CUNO.children[i].id;
        let yy = document.getElementById(y);
        
        let costo = x.children[1].children[1].innerText;
        (dos.energia >= costo) ?  null : $(yy).addClass('oscurecer');
    }
}

//355 LINEAS minimo
// 461 lineas maximo