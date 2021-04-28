function resetColor(opt) {
    switch (opt) {
        case 0:
            reset("03"); reset("04"); reset("05");
            break;
        case 1:
        case 4:
        case 5:
            reset("04"); reset("05");
            break;
        case 2:
        case 3:
        case 6:
            reset("03"); 
            break;
    }
    
}

function reset(num) {
    document.querySelector("#color" + num).style.background = "#FFFFFF";
    document.querySelector("#hex" + num).innerHTML = "";
    document.querySelector("#hsl" + num).innerHTML = "";
}