function HEXtoHSL(hex) {
    var rgb = HEXtoRGB(hex);
    var hsl = RGBtoHSL(rgb[0], rgb[1], rgb[2]);
    return hsl;
}

function HSLtoHEX(hsl) {
    var rgb = HSLtoRGB(hsl[0], hsl[1], hsl[2]);
    var hex = RGBtoHEX(rgb);
    return hex.toUpperCase();
}

function hslToString(h, s, l) {
    h = Math.round(h * 360) % 360; // degree
    s = Math.round(s * 100); // %
    l = Math.round(l * 100); // %
    var result = "hsl(" + h + "," + s + "%," + l + "%)";
    return result;
}

function HEXtoRGB (hex) {
    var rgb = Array(3);
    rgb[0] = parseInt(hex.substr(1, 2), 16);
    rgb[1] = parseInt(hex.substr(3, 2), 16);
    rgb[2] = parseInt(hex.substr(5, 2), 16);

    return rgb;
}

function RGBtoHSL(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h = (max + min) / 2;
    var s = (max + min) / 2;
    var l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h, s, l];
}

function HSLtoRGB(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function RGBtoHEX(rgb) {
    var id = "#"
    for (var i = 0; i < rgb.length; i++) {
        //rgb[i] = Math.round(rgb[i]);
        if (rgb[i] < 10) {
            rgb[i] = "0" + rgb[i].toString(16);
        }
        else {
            rgb[i] = rgb[i].toString(16);
        }

        id += rgb[i];
    }

    return id.toUpperCase();
}

