function getColorValues(color) {
    //color represented in a string of the form rgb(r, g, b) or rgba(r, g, b, a)
    //extract the values (except alpha)
    return color.match(/\d+/g).slice(0, 3);
}

function RGBtoHSV(r, g, b){
    r /= 255;
    g /= 255;
    b /= 255;

    let min = Math.min(r,g,b), max = Math.max(r,g,b), delta = max - min;
    let h = 0, s = 0, v = 0;

    if (delta == 0){
        h = 0;
    }else if (max == r){
        h = ((g - b) / delta) % 6;
    }else if (max == g){
        h = (b - r) / delta + 2;
    }else{
        h = (r - g) / delta + 4;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    if (max != 0){
        s = Math.round((delta / max)*100);
    }

    v = Math.round(max * 100);

    return [h, s, v];
}

function HSVtoRGB(h, s, v){
    let c = (v / 100) * (s / 100);
    let x = c * (1 - Math.abs((h / 60) % 2 -1));
    let m = (v / 100) - c;

    let r = 0, g = 0, b = 0;

    switch(true) {
        case (h < 60):
            r = c;
            g = x;
            break;
        case (h < 120):
            r = x;
            g = c;
            break;
        case (h < 180):
            g = c;
            b = x;
            break;
        case (h < 240):
            g = x;
            b = c;
            break;
        case (h < 300):
            r = x;
            b = c;
            break;
        case (h < 360):
            r = c;
            b = x;
            break;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
}

function isDark(color){
    //if res is positve color is light else dark
    let res = 0;
    //if values are above 122 they are considered light
    getColorValues(color).forEach(c => {
        res = parseInt(c) > 122 ? res + 1 : res - 1;
    });

    return res < 0 ? true : false;
}

//will return the same color but darker or lighter
function getOppositeColor(color){
    //convert to hsv
    let [h, s, v] = RGBtoHSV(...getColorValues(color));

    //mirror v around 50%
    v = 100 - v;

    let [r, g, b] = HSVtoRGB(h, s, v);
    
    return `rgb(${r}, ${g}, ${b})`
}

export {isDark, getOppositeColor};