function complementary(target) {
    var rgb = Array(3);
    rgb[0] = target.substr(1, 2);
    rgb[1] = target.substr(3, 2);
    rgb[2] = target.substr(5, 2);

    for (var i = 0; i < rgb.length; i++) {
        rgb[i] = 255 - parseInt(rgb[i], 16);
    }

    var id = RGBtoHEX(rgb);
    return id;
}

function analogous(target, type) {
    var rgb = Array(3);
    rgb[0] = parseInt(target.substr(1, 2), 16);
    rgb[1] = parseInt(target.substr(3, 2), 16);
    rgb[2] = parseInt(target.substr(5, 2), 16);
    var hsl = RGBtoHSL(rgb[0], rgb[1], rgb[2]);

    hsl[0] = hsl[0] + (30 / 360 * type);
    rgb = HSLtoRGB(hsl[0], hsl[1], hsl[2]);
    var id = RGBtoHEX(rgb);
    return id;
}

