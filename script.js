var thisColor = -1;
var indexNow = -1;
var option = 0;
/*
    -1 Monochromatic
    0 Complementary
    1 Split-Complementary
    2 Tetradic-1
    3 Tetradic-2
    4 Analogous
    5 Triad
    6 Square
*/

document.write("<script src='./script/color_conversion.js'></script>");
document.write("<script src='./script/color_palette.js'></script>");

function colorSet(target) {
    thisColor = target.id;

    document.querySelector("#color01").style.background = thisColor;
    document.querySelector("#hex01").innerHTML = thisColor;

    switch (option) {
        case 0:
            setComplementary(); break;
        case 1:
            setSplitComplementary(); break;
        case 2:
            setTetradic(1); break;
        case 3:
            setTetradic(-1); break;
        case 4:
            setAnalogous(); break;
        case 5:
            setTriad(); break;
        case 6:
            setSquare(); break;
    }
}

function indexSet(target) {
    indexNow = target.id;
    indexNow = parseInt(indexNow.replace(/[^0-9]/g, ''));
    document.getElementById("indexIs").innerHTML = "----- " + indexNow + " -----";
}

function setPalette(type) {
    document.getElementById("warning").innerHTML = "";
    if (type === undefined) {
        createPalette(thisColor, option);
        return;
    }

    switch (type) {
        case 1: // 따뜻한 밝은색과 차가운 어두운색
        case 2: // 차가운 밝은색과 따뜻한 어두운색
            brightnessControl(thisColor, type); break;
        case 3: // 전체 채도 증가 (+10%)
        case 4: // 전체 채도 감소 (-10%)
        case 5: // 순차적 채도 감소 (중간색에서 멀어질수록 채도 감소)
            saturationControl(type - 3, indexNow);
            break;
        case 6: // 선택한 색 보색 변환
            if (indexNow == -1) {
                document.getElementById("warning").innerHTML = "※ 선택된 색이 없습니다.";
                break;
            }
            complementaryConvert(indexNow); break;
        case 7: // 선택한 색의 채도 증가
            if (indexNow == -1) {
                document.getElementById("warning").innerHTML = "※ 선택된 색이 없습니다.";
                break;
            }
            saturationUP(indexNow);
            break;
    }

    // clear color code
    document.getElementById("colorCode").innerHTML = "";
}

/* 단일색 */
function setOneColor() {
    reset("00"); reset("02"); reset("03"); reset("04"); reset("05");

    option = -1;
    document.querySelector("#opt").innerHTML = "단일색";
}

/* 보색 */
function setComplementary(target) {
    if (target === undefined) {
        var id = colorRotation(thisColor, 6); // 180dex : complementary color
        document.querySelector("#color02").style.background = id;
        document.querySelector("#hex02").innerHTML = id;

        option = 0;
        document.querySelector("#opt").innerHTML = "보색";
        resetColor(0);
    }
    else {
        var id = colorRotation(target, 6); // 180deg
        document.querySelector("#color05").style.background = id;
        document.querySelector("#hex05").innerHTML = id;
    }
}

/* 근접 보색 */
function setSplitComplementary() {
    var id = colorRotation(thisColor, 6); // 180dex : complementary color
    var id1 = colorRotation(id, 1); // 30deg : analogous color
    var id2 = colorRotation(id, -1); // 30deg : analogous color

    document.querySelector("#color02").style.background = id1;
    document.querySelector("#hex02").innerHTML = id1;
    document.querySelector("#color00").style.background = id2;
    document.querySelector("#hex00").innerHTML = id2;

    option = 1;
    document.querySelector("#opt").innerHTML = "근접 보색";
    resetColor(1);
}

/* 이중 보색 */
function setTetradic(type) {
    setComplementary(); // 2번칸

    var id = colorRotation(thisColor, 2 * type); // 60deg : 2칸 옆 색 찾기
    document.querySelector("#color04").style.background = id;
    document.querySelector("#hex04").innerHTML = id;
    setComplementary(id); // 5번칸

    if (type == 1) option = 2;
    else option = 3;
    document.querySelector("#opt").innerHTML = "이중 보색 " + type;
    resetColor(option);
}

/* 유사색 조화 */
function setAnalogous() {
    var id1 = colorRotation(thisColor, 1); // 30deg : analogous color
    var id2 = colorRotation(thisColor, -1); // 30deg : analogous color

    document.querySelector("#color02").style.background = id1;
    document.querySelector("#hex02").innerHTML = id1;
    document.querySelector("#color00").style.background = id2;
    document.querySelector("#hex00").innerHTML = id2;

    option = 4;
    document.querySelector("#opt").innerHTML = "유사색";
    resetColor(4);
}

/* 3색 조화 */
function setTriad() {
    var id1 = colorRotation(thisColor, 4); // 120deg
    var id2 = colorRotation(thisColor, -4); // 120deg

    document.querySelector("#color02").style.background = id1;
    document.querySelector("#hex02").innerHTML = id1;
    document.querySelector("#color00").style.background = id2;
    document.querySelector("#hex00").innerHTML = id2;

    option = 5;
    document.querySelector("#opt").innerHTML = "3색 조화";
    resetColor(5);
}

/* 4색 조화 */
function setSquare() {
    var id1 = colorRotation(thisColor, 3); // 90deg
    var id2 = colorRotation(id1, 3); // 90deg
    var id3 = colorRotation(id2, 3); // 90deg

    document.querySelector("#color02").style.background = id1;
    document.querySelector("#hex02").innerHTML = id1;
    document.querySelector("#color04").style.background = id2;
    document.querySelector("#hex04").innerHTML = id2;
    document.querySelector("#color05").style.background = id3;
    document.querySelector("#hex05").innerHTML = id3;

    option = 6;
    document.querySelector("#opt").innerHTML = "4색 조화";
    resetColor(6);
}

function colorRotation(target, x) {
    var hsl = HEXtoHSL(target);

    hsl[0] = hsl[0] + (30 / 360 * x);
    if (hsl[0] >= 1) hsl[0] - 1;

    return HSLtoHEX(hsl);
}

/* 사용하지 않는 칸 보이지 않게 */
function resetColor(opt) {
    switch (opt) {
        case 0:
            reset("00"); reset("03"); reset("04"); reset("05");
            break;
        case 1:
        case 4:
        case 5:
            reset("03"); reset("04"); reset("05");
            break;
        case 2:
        case 3:
        case 6:
            reset("00"); reset("03");
            break;
    }

}

function reset(num) {
    document.querySelector("#color" + num).style.background = "#FFFFFF";
    document.querySelector("#hex" + num).innerHTML = "";
}

function support() {
    document.getElementById("help").innerHTML = "사용법.(추가 예정...)";
}