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
    jab: 0,
    jump: 0,
    counter: 10
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
    jab: 0,
    jump: 0,
    counter: 10
}

var cupAllCards = 
[
    id = ["shield1","smash1","nb1"],
    name = ["shield","smash","neutral B"],
    value = ["shield-value1","smash-value1","nb1-value"],
    pay = [4,2,4]
]

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
    $("#energia1").html(uno.energia);
    $("#energia2").html(dos.energia);
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

function randomCPUSelect() {
    let randomMove = Math.floor(Math.random() * (2 + 1));
    return randomMove;
}

function selectM(e) {

    let x = e.children[0].children[1].innerText;
    
    if (dos.energia < x)
        return;
    
    x <= dos.energia ? null : false; 

    let nDiv = document.getElementById(e.id);

    $(nDiv).attr('onClick', 'dselectM(this);');
    $("#m-dos").append(e);
    x = parseInt(x, 10);
    medirEnergia("restar", x);

    //select cpu move
    let  valueRandomSelect = randomCPUSelect();
    putCPUMove(valueRandomSelect);

}

function dselectM(e) {

    let nDiv = document.getElementById(e.id);
    $(nDiv).attr('onClick', 'selectM(this);');
    $("#c-uno").append(e);
  
    let x = parseInt(e.children[0].children[1].innerText);
    // x = parseInt(x, 10);
    medirEnergia("sumar", x);

    //deselectCpu
    dropCPUMove();
}

var allmove = document.getElementById("m-dos");
// allmove.addEventListener("DOMNodeInserted", handler, true);
$("body").on('DOMSubtreeModified', "#m-dos", handler);
$('#m-dos').bind('DOMNodeRemoved', function () {

    let x = $("#m-dos")[0];
    // console.log("dom lenght: ",x.children.length);
    if (x.children.length <= 3) {
        bloquearCRestantes("no");
    }
});

function handler() {

      // Lo que se ejecuta cuando cambia un nodo div o span dentro de #chat
      if (allmove.childNodes.length == 3) {

        bloquearCRestantes("si");

        $("#btn-ready").attr("disabled", false);
        $("#btn-ready").removeClass("btn-ready-disabled");

    } else if (allmove.childNodes.length > 3) {
        console.log("mayor a 3");
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

    for (i = 0; i < mDOS.childNodes.length; i++) {
        let x = document.getElementById(mDOS.childNodes[i].id);
        $(x).prop("onclick", null).off("click");
        // i = i - 3;
    }

    setTimeout(function () {
        for (i = 0; i < mDOS.childNodes.length; i = 0) {
            let x = document.getElementById(mDOS.childNodes[i].id);
            $(x).attr('onClick', 'selectM(this);');
            i = i - 3;
            
            cUno.append(x);
            i = i - 3;
        }
        $("#m-uno")[0].childNodes[0].remove();
        $("#m-uno")[0].childNodes[1].remove();
        $("#m-uno")[0].childNodes[0].remove();
        
        uno.energia += 20;
        $("#energia1").html(uno.energia);

        dos.energia += 2;
        $("#energia2").html(dos.energia);


    }, 3000);
    stageOut();

    setTimeout(function () {
        disponibles();
        returnDosValues();
    }, 3005);

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

    // dos.energia += 10;
    // $("#energia2").html(dos.energia);
}

function compararValorUno() {

    let mov = $("#movimientos")[0];

    let iValorUnoCPU = mov.childNodes[1].childNodes[0].childNodes[1].innerText;
    let iValorUnoJ = mov.childNodes[3].childNodes[0].childNodes[5].innerText;
    let sValorUnoJ = mov.childNodes[3].childNodes[0].childNodes[5].childNodes[1].id;

    iValorUnoJ = parseInt(iValorUnoJ, 10);
    iValorUnoCPU = parseInt(iValorUnoCPU, 10);

    if (sValorUnoJ == 'counter-value') {
        iValorUnoJ = iValorUnoCPU * 3;
    }

    if (iValorUnoJ > iValorUnoCPU) {

        uno.porcentaje += iValorUnoJ - iValorUnoCPU;
        $("#porcentaje1").html(uno.porcentaje + ' %');

    } else if (iValorUnoJ == iValorUnoCPU) {

        uno.porcentaje += 2;
        dos.porcentaje += 2;
        dos.energia += 2;

        $("#porcentaje1").html(uno.porcentaje + ' %');
        $("#porcentaje2").html(dos.porcentaje + ' %');
        $("#energia2").html(dos.energia);


    } else {
        dos.porcentaje += iValorUnoCPU - iValorUnoJ;;
        $("#porcentaje2").html(dos.porcentaje + ' %');
        dos.energia += 1;
        $("#energia2").html(dos.energia);
    }
}

function compararValorDos() {

    let mov = $("#movimientos")[0];

    let iValorUnoCPU = mov.childNodes[1].childNodes[1].childNodes[1].innerText;
    let iValorUnoJ = mov.childNodes[3].childNodes[1].childNodes[5].innerText;
    let sValorUnoJ = mov.childNodes[3].childNodes[1].childNodes[5].childNodes[1].id;

    iValorUnoJ = parseInt(iValorUnoJ, 10);
    iValorUnoCPU = parseInt(iValorUnoCPU, 10);

    if (sValorUnoJ == 'counter-value') {
        iValorUnoJ = iValorUnoCPU * 3;
    }

    if (iValorUnoJ > iValorUnoCPU) {

        uno.porcentaje += iValorUnoJ - iValorUnoCPU;
        $("#porcentaje1").html(uno.porcentaje + ' %');

    } else if (iValorUnoJ == iValorUnoCPU) {

        uno.porcentaje += 2;
        dos.porcentaje += 2;
        dos.energia += 2;

        $("#porcentaje1").html(uno.porcentaje + ' %');
        $("#porcentaje2").html(dos.porcentaje + ' %');
        $("#energia2").html(dos.energia);

    } else {

        dos.porcentaje += iValorUnoCPU - iValorUnoJ;;
        $("#porcentaje2").html(dos.porcentaje + ' %');
        dos.energia += 1;
        $("#energia2").html(dos.energia);
    }
}

function compararValorTres() {

    let mov = $("#movimientos")[0];

    let iValorUnoCPU = mov.childNodes[1].childNodes[2].childNodes[1].innerText;
    let iValorUnoJ = mov.childNodes[3].childNodes[2].childNodes[5].innerText;
    let sValorUnoJ = mov.childNodes[3].childNodes[2].childNodes[5].childNodes[1].id;

    iValorUnoJ = parseInt(iValorUnoJ, 10);
    iValorUnoCPU = parseInt(iValorUnoCPU, 10);

    if (sValorUnoJ == 'counter-value') {
        iValorUnoJ = iValorUnoCPU * 3;
    }

    if (iValorUnoJ > iValorUnoCPU) {

        uno.porcentaje += iValorUnoJ - iValorUnoCPU;
        $("#porcentaje1").html(uno.porcentaje + ' %');

    } else if (iValorUnoJ == iValorUnoCPU) {

        uno.porcentaje += 2;
        dos.porcentaje += 2;
        dos.energia += 2;

        $("#porcentaje1").html(uno.porcentaje + ' %');
        $("#porcentaje2").html(dos.porcentaje + ' %');
        $("#energia2").html(dos.energia);

    } else {

        dos.porcentaje += iValorUnoCPU - iValorUnoJ;;
        $("#porcentaje2").html(dos.porcentaje + ' %');
        dos.energia += 1;
        $("#energia2").html(dos.energia);
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
    (uno.porcentaje >= 5)  ? y.addClass("cero-7")  : null;
    (uno.porcentaje >= 14) ? y.addClass("cero-14") : null;
    (uno.porcentaje >= 21) ? y.addClass("cero-21") : null;
    (uno.porcentaje >= 28) ? y.addClass("cero-28") : null;
    (uno.porcentaje >= 35) ? y.addClass("cero-35") : null;
    (uno.porcentaje >= 42) ? y.addClass("cero-42") : null;
    (uno.porcentaje >= 49) ? y.addClass("cero-49") : null;
    (uno.porcentaje >= 56) ? y.addClass("cero-56") : null;
    (uno.porcentaje >= 63) ? y.addClass("cero-63") : null;
    (uno.porcentaje >= 70) ? y.addClass("cero-70") : null;
    (uno.porcentaje >= 77) ? y.addClass("cero-77") : null;
    (uno.porcentaje >= 84) ? y.addClass("cero-84") : null;
    (uno.porcentaje >= 91) ? y.addClass("cero-91") : null;
    (uno.porcentaje >= 98) ? y.addClass("cero-98") : null;

    let x = $("#porcentaje2");
    (dos.porcentaje >= 5)  ? x.addClass("cero-7")  : null;
    (dos.porcentaje >= 14) ? x.addClass("cero-14") : null;
    (dos.porcentaje >= 21) ? x.addClass("cero-21") : null;
    (dos.porcentaje >= 28) ? x.addClass("cero-28") : null;
    (dos.porcentaje >= 35) ? x.addClass("cero-35") : null;
    (dos.porcentaje >= 42) ? x.addClass("cero-42") : null;
    (dos.porcentaje >= 49) ? x.addClass("cero-49") : null;
    (dos.porcentaje >= 56) ? x.addClass("cero-56") : null;
    (dos.porcentaje >= 63) ? x.addClass("cero-63") : null;
    (dos.porcentaje >= 70) ? x.addClass("cero-70") : null;
    (dos.porcentaje >= 77) ? x.addClass("cero-77") : null;
    (dos.porcentaje >= 84) ? x.addClass("cero-84") : null;
    (dos.porcentaje >= 91) ? x.addClass("cero-91") : null;
    (dos.porcentaje >= 98) ? x.addClass("cero-98") : null;
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
        // console.log(x);
        let y = document.getElementById(x);

        for (j = 0; j < CUNO.children[i].children.length; j++) {

            let z = CUNO.children[i].children[j].id;
            if (z.includes('img-')) {

                switch (bloquear) {
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

    $("#upb-value").html(dos.upB);
    $("#sideB-value").html(dos.sideB);
    $("#jab-value").html(dos.jab);
    $("#jump-value").html(dos.jump);
    $("#counter-value").html(dos.counter);

    // let mDOS = $("#m-dos")[0];

    // for (i = 0; i < mDOS.childNodes.length; i++) {
        // let x = document.getElementById(mDOS.childNodes[i].id);
        // console.log("iDS: ", x.id);
        // for(j = 0){
        //     console.log("dos values: ",);
        // }
        // $(x).prop("onclick", null).off("click");
        // i = i - 3;
    // }
}

function returnDosValues() {

    $("#shield-value").html('shield');
    $("#smash-value").html('smash');
    $("#nb-value").html('nB');
    $("#tilt-value").html('tilt');
    // $("#rage2").html("Rage: " + 'rage);

    $("#upb-value").html('upB');
    $("#sideB-value").html('sideB');
    $("#jab-value").html('jab');
    $("#jump-value").html('jump');
    $("#counter-value").html('counter');
}

function medirEnergia(action, cost) {

    switch (action) {
        case "restar":
            dos.energia -= cost;
            $("#energia2").html(dos.energia);
            disponibles();
            if (dos.energia == 0) {
                bloquearCRestantes("si");
                //desbloquear los que si se pueden
                let MDOS = $("#m-dos")[0];
                if (MDOS.children.length <= 2) {
                    desbloquearDisponibles();
                }
            }
            break;
        case "sumar":
            dos.energia += cost;
            $("#energia2").html(dos.energia);
            disponibles();
            break;
    }
}

function disponibles() {

    let CUNO = $("#c-uno")[0];
    for (i = 0; i < CUNO.children.length; i++) {
        let x = CUNO.children[i];
        let y = CUNO.children[i].id;
        let yy = document.getElementById(y);
     
        let costo = parseInt(x.children[0].children[1].innerText);
        (dos.energia >= costo) ? null: $(yy).addClass('oscurecer');
    }
}

function desbloquearDisponibles() {

    let CUNO = $("#c-uno")[0];
    for (i = 0; i < CUNO.children.length; i++) {
        let x = CUNO.children[i].id;
        let y = document.getElementById(x);
        // console.log(x);
        if (x == 'jab' || x == 'jump') {
            $(y).attr('onClick', 'selectM(this);').removeClass('oscurecer');
        }
    }
}

function putCPUMove(valueRandomSelect) {

    let newDCard = document.createElement("div");
    let newDNombre = document.createElement("div");
    let newDValue = document.createElement("div");
    let id, name, idCard, value;

    
    if (cupAllCards[3][valueRandomSelect] <= uno.energia) 
    {
        idCard = cupAllCards[0][valueRandomSelect];
        // console.log("idCard: ", idCard);
        if (compararCardCpu(idCard)) 
        {
            let rndmValue = randomCPUSelect();
            putCPUMove(rndmValue);
            return;
        }
        medirEnergiaCPU("restar", cupAllCards[3][valueRandomSelect]);
        // console.log('cupAllCards[3][valueRandomSelect]:',cupAllCards[3][valueRandomSelect], "uno.energia: ", uno.energia);

        id = cupAllCards[0][valueRandomSelect];
        name = cupAllCards[1][valueRandomSelect];
        value = cupAllCards[2][valueRandomSelect];
    } 
    else 
    {
        // console.log("no tienes suficiente enegia: " ,uno.energia);
        let  rndmValue = randomCPUSelect();
        putCPUMove(rndmValue);

        //recordar qie se cicla al quitar carta y poner de neuvo cae en energia = 0;
        return;
    }

    newDCard.setAttribute("id", id);
    newDValue.setAttribute("id", value);
  
    newDCard.classList.add("item");
    newDCard.classList.add("pieza");

    let newContent = document.createTextNode(name); 
    newDNombre.appendChild(newContent);

    let currentDiv = document.getElementById("m-uno"); 
    currentDiv.appendChild(newDCard);
    newDCard.appendChild(newDNombre);
    newDCard.appendChild(newDValue);

}

function dropCPUMove() {


//     id = ["shield1","smash1","nb1"],
//     name = ["shield","smash","neutral B"],
//     value = ["shield-value1","smash-value1","nb1-value"],
//     pay = [4,2,4]

let oCPUMoves = {
    "shield1": 4,
    "smash1": 2,
    "nb1": 4,
}

    let x = $("#m-uno")[0];
    let  rndmValue = randomCPUSelect();
    // console.log("rndmValue: ",rndmValue);

    // --------------medirEnergiaCPU("sumar");
    let cont = 0;
    for( i = 0; i < x.children.length; i++){
        cont +=1;
        // console.log("id: ",x.children[i].id);
        let divNode = document.getElementById(x.children[i].id);
        let moveValue = oCPUMoves[divNode.id];

        (cont == 1) ?  (
            divNode.remove(),
            medirEnergiaCPU("sumar", moveValue)
            ) : null;
    }
    cont = 0;
}

function compararCardCpu(idRndmCpu){
    let x = $("#m-uno")[0];
    // console.log( x.children.length );
    // console.log("id del cpu: ", idRndmCpu);
    for( i = 0; i < x.children.length; i++){
        // console.log("id: ",x.children[i].id);
        if(idRndmCpu == x.children[i].id){
            // console.log("id repetido", idRndmCpu);
            return true;
        }
    // console.log("tamaño: ",x.children[i]);
    }
}

function medirEnergiaCPU(action, cost) {

    switch (action) {
        case "restar":
            uno.energia -= cost;
            $("#energia1").html(uno.energia);
            // console.log("UNO VIDA", uno.energia);
            // disponibles();
            if (uno.energia == 0) {
               return;
            }
            break;
        case "sumar":
            uno.energia += cost;
            $("#energia1").html(uno.energia);
            // console.log("UNO VIDA", uno.energia);
            // disponibles();
            break;
    }
}
//355 LINEAS minimo
// 614 lineas maximo