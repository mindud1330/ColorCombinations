var thisColor;
var option = 0;
/*
    0 Complementary
    1 Split-Complementary
    2 Tetradic-1
    3 Tetradic-2
    4 Analogous
    5 Triad
    6 Square
*/

document.write("<script src='./script/reset.js'></script>");
document.write("<script src='./script/color_conversion.js'></script>");
document.write("<script src='./script/color_harmony.js'></script>");

function colorSet(target) {
    thisColor = target.id;

    document.querySelector("#color01").style.background = thisColor;
    document.querySelector("#hex01").innerHTML = thisColor;

    switch (option) {
        case 0:
            setComplementary();
            break;
        case 1:
            setSplitComplementary();
            break;
        case 2:
            setTetradic(1);
            break;
        case 3:
            setTetradic(2);
            break;
        case 4:
            setAnalogous();
            break;
        case 5:
            setTriad();
            break;
        case 6:
            setSquare();
            break;
    }
}

function setComplementary(target) {
    if (target === undefined) {
        var id = complementary(thisColor);
        document.querySelector("#color02").style.background = id;
        document.querySelector("#hex02").innerHTML = id;

        option = 0;
        document.querySelector("#opt").innerHTML = "보색";
        resetColor(0);
    }
    else {
        var id = complementary(target);
        document.querySelector("#color05").style.background = id;
        document.querySelector("#hex05").innerHTML = id;
    }
}

function setSplitComplementary() {
    var id = complementary(thisColor);
    var id1 = analogous(id, 1);
    var id2 = analogous(id, -1);

    document.querySelector("#color02").style.background = id1;
    document.querySelector("#hex02").innerHTML = id1;
    document.querySelector("#color03").style.background = id2;
    document.querySelector("#hex03").innerHTML = id2;

    option = 1;
    document.querySelector("#opt").innerHTML = "근접 보색";
    resetColor(1);
}

function setTetradic(type) {
    setComplementary();

    // 2칸 옆 색 찾기
    var rgb = Array(3);
    rgb[0] = parseInt(thisColor.substr(1, 2), 16);
    rgb[1] = parseInt(thisColor.substr(3, 2), 16);
    rgb[2] = parseInt(thisColor.substr(5, 2), 16);
    var hsl = RGBtoHSL(rgb[0], rgb[1], rgb[2]);

    if (type == 1) {
        hsl[0] = hsl[0] + (30 / 360 * 2);
    }
    else {
        hsl[0] = hsl[0] + (30 / 360 * -2);
    }
    rgb = HSLtoRGB(hsl[0], hsl[1], hsl[2]);
    var id = RGBtoHEX(rgb);
    document.querySelector("#color04").style.background = id;
    document.querySelector("#hex04").innerHTML = id;

    setComplementary(id);

    option = 1 + type;
    document.querySelector("#opt").innerHTML = "이중 보색 " + type;
    resetColor(option);
}

function setAnalogous() {
    var id1 = analogous(thisColor, 1);
    var id2 = analogous(thisColor, -1);

    document.querySelector("#color02").style.background = id1;
    document.querySelector("#hex02").innerHTML = id1;
    document.querySelector("#color03").style.background = id2;
    document.querySelector("#hex03").innerHTML = id2;

    option = 4;
    document.querySelector("#opt").innerHTML = "유사색";
    resetColor(4);
}

function setTriad() {
    var id = complementary(thisColor);

    var id1 = analogous(id, 2);
    var id2 = analogous(id, -2);

    document.querySelector("#color02").style.background = id1;
    document.querySelector("#hex02").innerHTML = id1;
    document.querySelector("#color03").style.background = id2;
    document.querySelector("#hex03").innerHTML = id2;

    option = 5;
    document.querySelector("#opt").innerHTML = "3색 조화";
    resetColor(5);
}

function setSquare() {
    var id1 = analogous(thisColor, 3);
    var id2 = analogous(id1, 3);
    var id3 = analogous(id2, 3);


    document.querySelector("#color02").style.background = id1;
    document.querySelector("#hex02").innerHTML = id1;
    document.querySelector("#color04").style.background = id2;
    document.querySelector("#hex04").innerHTML = id2;
    document.querySelector("#color05").style.background = id2;
    document.querySelector("#hex05").innerHTML = id2;

    option = 6;
    document.querySelector("#opt").innerHTML = "4색 조화";
    resetColor(6);
}