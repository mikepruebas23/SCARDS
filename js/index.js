var iRage;
var dJugador;
var ronda;
var timer;
var iSegundos = 7;

//objetos
var uno = {
    shield: 3,
    smash: 3,
    porcentaje: 0,
    nB: 2,
    tilt: 1,
    rage: 0
}

var dos = {
    shield: 3,
    smash: 4,
    porcentaje: 0,
    nB: 2,
    tilt: 1,
    rage: 0
}

$(document).ready(function () {

    var dJugador = $("#c-uno")[0];



    uno.rage += rageRandom();
    dos.rage += rageRandom();

    $("#smash-value1").html(uno.smash);
    $("#shield-value1").html(uno.shield);

    $("#smash-value").html(dos.smash);
    $("#shield-value").html(dos.shield);

    $("#nb1-value").html(uno.nB);
    $("#nb-value").html(dos.nB);

    $("#tilt1-value").html(uno.tilt);
    $("#tilt-value").html(dos.tilt);

    $("#rage1").html("Rage: " + uno.rage);
    $("#rage2").html("Rage: " + dos.rage);

    $("#porcentaje1").html(uno.porcentaje + ' %');
    $("#porcentaje2").html(dos.porcentaje + ' %');
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

function rageRandom() {
    iRage = Math.floor(Math.random() * (4 - 1)) + 1;
    return iRage;
}

function selectM(e) {

    let nDiv = document.getElementById(e.id);
    $(nDiv).attr('onClick', 'dselectM(this);');

    $("#m-dos").append(e);
}

function dselectM(e) {

    let nDiv = document.getElementById(e.id);
    $(nDiv).attr('onClick', 'selectM(this);');

    $("#c-uno").append(e);
}

var allmove = document.getElementById("m-dos");
// allmove.addEventListener("DOMNodeInserted", handler, true);
$("body").on('DOMSubtreeModified', "#m-dos", handler);

function handler() {
    // Lo que se ejecuta cuando cambia un nodo div o span dentro de #chat
    if (allmove.childNodes.length >= 4) {
        $("#btn-ready").attr("disabled", false);
        $("#btn-ready").removeClass("btn-ready-disabled");

    } else {
        $("#btn-ready").attr("disabled", true);
        $("#btn-ready").addClass("btn-ready-disabled");
    }
}
$("#btn-ready").click(function () {
    $("#btn-ready").attr("disabled", true);
    let mDOS = $("#m-dos")[0];
    let cUno = $("#c-uno")[0];

    for (i = 0; i < mDOS.childNodes.length; i++) {

        let x = document.getElementById(mDOS.childNodes[i].id);
        $(x).attr('onClick', 'selectM(this);');
        cUno.append(x);
        i--;
    }
    stageOut();
});

function compararSmash() {

    compararValorUno();
    compararValorDos();
    compararValorTres();
    compararValorCuatro();
    // compararValorCinco();
    // let mov = $("#movimientos");
    //tercero valor de ambos elementos
    // console.log(mov[0].childNodes[1].childNodes[5].childNodes[3].innerText)
    // console.log(mov[0].childNodes[3].childNodes[2].childNodes[3].innerText)
    icreaseRage();
    stageOut();
}

function compararValorUno() {

    let mov = $("#movimientos");

    let iValorUnoCPU = mov[0].childNodes[1].childNodes[1].childNodes[3].innerText;
    let iValorUnoJ = mov[0].childNodes[3].childNodes[0].childNodes[3].innerText;

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

function compararValorDos() {

    let mov = $("#movimientos");

    let iValorUnoCPU = mov[0].childNodes[1].childNodes[3].childNodes[3].innerText;
    let iValorUnoJ = mov[0].childNodes[3].childNodes[1].childNodes[3].innerText;

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

function compararValorTres() {

    let mov = $("#movimientos");

    let iValorUnoCPU = mov[0].childNodes[1].childNodes[5].childNodes[3].innerText;
    let iValorUnoJ = mov[0].childNodes[3].childNodes[2].childNodes[3].innerText;

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

function compararValorCuatro() {

    let mov = $("#movimientos");

    let iValorUnoCPU = mov[0].childNodes[1].childNodes[7].childNodes[3].innerText;
    let iValorUnoJ = mov[0].childNodes[3].childNodes[3].childNodes[3].innerText;

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

    }

    let x = $("#porcentaje2");
    if(dos.porcentaje >= 7){ x.addClass("cero-7")}
    if(dos.porcentaje >= 14){ x.addClass("cero-14")} 
    if(dos.porcentaje >= 21){ x.addClass("cero-21")} 
    if(dos.porcentaje >= 28){ x.addClass("cero-28")}
    if(dos.porcentaje >= 35){ x.addClass("cero-35")}
    if(dos.porcentaje >= 42){ x.addClass("cero-42")}
    if(dos.porcentaje >= 49){ x.addClass("cero-49")}
    if(dos.porcentaje >= 56){ x.addClass("cero-56")}
    if(dos.porcentaje >= 63){ x.addClass("cero-63")}
    if(dos.porcentaje >= 70){ x.addClass("cero-70")}
    if(dos.porcentaje >= 77){ x.addClass("cero-77")}
    if(dos.porcentaje >= 84){ x.addClass("cero-84")}
    if(dos.porcentaje >= 91){ x.addClass("cero-91")}
    if(dos.porcentaje >= 98){ x.addClass("cero-98")}
    
}


function icreaseRage() {
    if (uno.porcentaje > dos.porcentaje) {
        dos.rage += 3;
        uno.rage += 1;
        $("#rage1").html("Rage: " + uno.rage);
        $("#rage2").html("Rage: " + dos.rage);

    } else if (dos.porcentaje > uno.porcentaje) {
        uno.rage += 3;
        dos.rage += 1;
        $("#rage1").html("Rage: " + uno.rage);
        $("#rage2").html("Rage: " + dos.rage);
    }
}

//355 LINEAS