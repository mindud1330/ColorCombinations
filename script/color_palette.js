var palette = Array(7);
var hue = Array(7);
var saturation = Array(7);
var lightness = Array(7);
/*  HSL Hue-색상(색 온도) Saturation-채도 Lightness-명도
    기본색: hsl(30n, 100%, 50%)
*/

/*
    -1 One Color
    0 Complementary
    1 Split-Complementary
    2 Tetradic-1
    3 Tetradic-2
    4 Analogous
    5 Triad
    6 Square
*/
function createPalette(baseColor, opt) {
    var point = -1;
    var point2 = -1;

    switch (opt) {
        case -1: // 단일색 배색
            brightnessControl(baseColor, 3);
            point = Math.floor(Math.random() * 3) + 2; // 포인트색
            point2 = Math.floor(Math.random() * 4) + 1;
            break;
        case 0: // 보색 배색 (Complementary)
            brightnessControl(baseColor, Math.floor(Math.random() * 2) + 1);
            complementaryPalette();
            break;
        case 1: // 근접 보색 배색 (Split-Complementary)
            brightnessControl(baseColor);
            point = splitComplementaryPalette();
            break;
        case 2: // 이중 보색 배색 (Tetradic1)
            brightnessControl(baseColor);
            tetradicPalette(1);
            break;
        case 3: // 이중 보색 배색 (Tetradic2)
            brightnessControl(baseColor);
            tetradicPalette(-1);
            break;
        case 4: // 유사색 배색 (Analogous)
            // brightnessControl(baseColor, Math.floor(Math.random() * 2) + 1);
            brightnessControl(baseColor);
            analogousPalette();
            break;
        case 5: // 3색 배색 (Triad)
        case 6: // 4색 배색 (Square)
            brightnessControl(baseColor);
            polygonPalette(opt - 2);
            break;
    }

    /* 채도 조절 */
    if (point == -1) {
        var count = Math.floor(Math.random() * 10);
        for (; count > 0; count--) {
            var type = Math.floor(Math.random() * 2) + 1; // 1: 전체 조절 / 2: 순차적 조절
            saturationControl(type);

            if (saturation[0] <= 10) break; // 가장 낮은 채도
        }
    }
    else {
        var count = Math.floor(Math.random() * 2) + 5;
        for (; count > 0; count--) saturationControl(1);

        if (point2 != -1) {
            saturationControl(1); saturationControl(1);
            if (point2 != point) {
                // 서브 포인트 칼라를 중간 채도로
                saturation[point2] = (Math.floor(Math.random() * 31) + 40) / 100;
                palette[point2] = hslToString(hue[point2], saturation[point2], lightness[point2]);
                document.querySelector("#p" + point2).style.background = palette[point2];
            }
        }

        // 포인트 칼라를 높은 채도로
        saturation[point] = (Math.floor(Math.random() * 31) + 70) / 100;
        palette[point] = hslToString(hue[point], saturation[point], lightness[point]);
        document.querySelector("#p" + point).style.background = palette[point];
    }

    // clear color code
    document.getElementById("colorCode").innerHTML = "";
}

function printPalette(type) {
    var text = "";

    var hsl = Array(3);
    var rgb;
    for (var i = 0; i < 7; i++) {
        hsl[0] = hue[i];
        hsl[1] = saturation[i];
        hsl[2] = lightness[i];

        if (type == 1) {
            text += HSLtoHEX(hsl);
            text += "<br>"
        }
        else if (type == 2) {
            text += "rgb(";
            text += HSLtoRGB(hsl[0], hsl[1], hsl[2]).join();
            text += ")<br>";
        }
    }

    document.getElementById("colorCode").innerHTML = text;
}

function complementaryPalette() {
    var min = Math.floor(Math.random() * 3) + 2;
    var max = whichNum(1, 5);

    if (min > max) {
        var tmp = min;
        min = max;
        max = tmp;
    }

    for (var i = min; i <= max; i++) {
        complementaryConvert(i);
    }
}

function splitComplementaryPalette() {
    var point = Math.floor(Math.random() * 4) + 1; // 포인트색
    var degree;

    for (var i = 0; i < 7; i++) {
        if (i == point) continue;

        degree = Math.floor(Math.random() * 91) + 135; // 135~225deg
        hue[i] = hue[i] + degree / 360;

        palette[i] = hslToString(hue[i], saturation[i], lightness[i]);
        document.querySelector("#p" + i).style.background = palette[i];
    }

    return point;
}

function tetradicPalette(type) {
    var count = Array(4); // 각 색상의 갯수
    for (var i = 0; i < 4; i++) {
        count[i] = Math.floor(Math.random() * 2) + 1; // 1 or 2
    }

    var distance = Array(4);
    distance[0] = 0; // 기본색
    distance[1] = 180; // 기본색 보색
    distance[2] = 60 * type; // 기본색2
    distance[3] = 180 + distance[2]; // 기본색2 보색

    var colorNum;
    for (var i = 0; i < 7; i++) {
        do {
            colorNum = Math.floor(Math.random() * 4);
        } while (count[colorNum] == 0);

        degree = Math.floor(Math.random() * 31) - 15 + distance[colorNum];
        hue[i] = hue[i] + degree / 360;

        palette[i] = hslToString(hue[i], saturation[i], lightness[i]);
        document.querySelector("#p" + i).style.background = palette[i];
    }

}

function analogousPalette() {
    var degree;

    for (var i = 0; i < 7; i++) {
        degree = Math.floor(Math.random() * 91) - 45; // -45~450deg
        hue[i] = hue[i] + degree / 360;

        palette[i] = hslToString(hue[i], saturation[i], lightness[i]);
        document.querySelector("#p" + i).style.background = palette[i];
    }
}

function polygonPalette(type) {
    /*  type3 Triad 3색 보색 120deg
        type4 Square 4색 보색 90deg   */
    var count = Array(type); // 각 색상의 갯수
    var distance = 360 / type;
    var degree;

    count[0] = 7;
    for (var i = 1; i < type; i++) {
        count[i] = Math.floor(Math.random() * 2) + 1; // 1 or 2
        count[0] -= count[i];
    }
    if (count[0] < 0) count[0] = 0;

    var colorNum;
    for (var i = 0; i < 7; i++) {
        do {
            colorNum = Math.floor(Math.random() * type);
        } while (count[colorNum] == 0);

        degree = Math.floor(Math.random() * 61) - 30 + distance * colorNum;
        hue[i] = hue[i] + degree / 360;

        palette[i] = hslToString(hue[i], saturation[i], lightness[i]);
        document.querySelector("#p" + i).style.background = palette[i];
    }
}

/*  *** 7단계 명도 조절 ***
    색 온도도 함께 변화 (hue:10 Lightness:15% 변화)
    type undefined 명도만 조절
    type1 따뜻한 밝은색과 차가운 어두운색
    type2 차가운 밝은색과 따뜻한 어두운색               */
function brightnessControl(baseColor, type) {
    var hsl = HEXtoHSL(baseColor);
    var x = 1; // 1: 밝기와 명도 변화가 비례 / -1: 밝기와 명도 변화가 반비례

    if (type === undefined) x = 0;
    else if (type == 3) x = Math.floor(Math.random() * 2) - 0.5;
    else {
        if (type == 2) x = -1;
        if (hsl[0] >= 30 / 360 && hsl[0] <= 210 / 360) x *= -1;
    }

    hue[3] = hsl[0];
    lightness[3] = hsl[2];
    for (var i = 1; i <= 3; i++) {
        hue[3 - i] = hsl[0] + x * 10 / 360 * i;
        hue[3 + i] = hsl[0] - x * 10 / 360 * i;

        lightness[3 - i] = hsl[2] + 0.15 * i;
        lightness[3 + i] = hsl[2] - 0.15 * i;
    }

    for (var i = 0; i < 7; i++) {
        saturation[i] = hsl[1];
        palette[i] = hslToString(hue[i], saturation[i], lightness[i]);
        document.querySelector("#p" + i).style.background = palette[i];
    }
}

/*  *** 채도 조절 ***
    0,1-type3, 4 전체 채도 조절: 행마다 10% 증가/감소
    2-type5 순차적 채도 조절: 중간색은 높은 채도 / 밖으로 갈수록 낮은 채도 */
function saturationControl(type) {
    if (type == 2) {
        for (var i = 1; i <= 3; i++) {
            saturation[3 - i] = saturation[3 - i] - 0.1 * i;
            saturation[3 + i] = saturation[3 + i] - 0.1 * i;
        }
        for (var i = 0; i < 7; i++) {
            palette[i] = hslToString(hue[i], saturation[i], lightness[i]);
            document.querySelector("#p" + i).style.background = palette[i];
        }
    }
    else {
        var x = 1;
        if (type) {
            x = -1;
            if (saturation[3] < 0.1) {
                document.getElementById("warning").innerHTML = "더이상 낮출 수 없어요.";
                return;
            }
        }
        for (var i = 0; i < 7; i++) {
            saturation[i] += 0.1 * x;
            palette[i] = hslToString(hue[i], saturation[i], lightness[i]);
            document.querySelector("#p" + i).style.background = palette[i];
        }
    }
}

/*  *** 보색 변환 ***
    선택한 색을 보색으로 변환   */
function complementaryConvert(index) {
    hue[index] += 0.5;

    palette[index] = hslToString(hue[index], saturation[index], lightness[index]);
    document.querySelector("#p" + index).style.background = palette[index];
}

function whichNum(a, b) {
    if (Math.floor(Math.random() + 0.5)) return a;
    else return b;
}