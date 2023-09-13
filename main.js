let width = 4,
    height = 3;

let posx = 0,
    posy = 0;

document.body.onload = loadExample;

document.addEventListener("keydown", e => {
    if (!e.ctrlKey) {
        switch (e.key) {
            case "ArrowUp":
                if (posy > 0) posy--;
                myfocus();
                break;
            case "ArrowDown":
                if (posy < height - 1) posy++;
                myfocus();
                break;
            case "ArrowRight":
                if (posx < width - 1) posx++;
                myfocus();
                break;
            case "ArrowLeft":
                if (posx > 0) posx--;
                myfocus();
                break;
            case "Enter":
                wolframize();
                break;
        }
    }
});

function myfocus() {
    document.getElementById("cell-" + posx + "-" + posy).focus();
}

function makeNewCell(x, y) {
    const newInput = document.createElement("input");
    const filling = document.getElementById("filling").value;

    newInput.setAttribute("id", "cell" + "-" + x + "-" + y);
    newInput.setAttribute("size", 2);
    newInput.setAttribute("value", filling);
    newInput.addEventListener("click", _ => {
        //closure-style
        posx = x;
        posy = y;
    });
    return newInput;
}

function loadExample() {
    const matrix = document.getElementById("matrix");

    for (let i = 0; i < height; i++) {
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", "div" + i);

        for (let j = 0; j < width; j++) {
            const newInput = makeNewCell(j, i);

            newDiv.appendChild(newInput);
        }
        matrix.appendChild(newDiv);
    }

    let aux = 0;
    for (let i = 0; i < height; i++)
        for (let j = 0; j < width; j++) {
            document.getElementById("cell-" + j + "-" + i).setAttribute("value", aux);
            aux++;
        }

    updateDimensions();
    wolframize();
    myfocus();
}

function newRow() {
    const matrix = document.getElementById("matrix");

    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "div" + height);

    for (let i = 0; i < width; i++) {
        const newInput = makeNewCell(i, height);
        newDiv.appendChild(newInput);
    }
    matrix.appendChild(newDiv);
    height++;

    updateDimensions();
}

function deleteRow() {
    if (height > 1) {
        document.getElementById("div" + (height - 1)).remove();
        if (posy == height - 1) {
            posy--;
            myfocus();
        }
        height--;
    }
    updateDimensions();
}

function newCol() {
    for (let i = 0; i < height; i++) {
        const newInput = makeNewCell(width, i);
        document.getElementById("div" + i).appendChild(newInput);
    }

    width++;

    updateDimensions();
}

function deleteCol() {
    if (width > 1) {
        for (let i = 0; i < height; i++)
            document.getElementById("cell-" + (width - 1) + "-" + i).remove();
        if (posx == width - 1) {
            posx--;
            myfocus();
        }
        width--;
    }
    updateDimensions();
}

function updateDimensions() {
    document.getElementById("dimensions").innerHTML =
        "The dimensions of your matrix are " + height + "x" + width;
}

function wolframize() {
    let out = "{";
    for (let i = 0; i < height; i++) {
        out += "{";
        for (let j = 0; j < width; j++) {
            out += document.getElementById("cell" + "-" + j + "-" + i).value + ", ";
        }
        out = out.substring(0, out.length - 2);
        out += "}, ";
    }
    out = out.substring(0, out.length - 3);
    out += "}}";
    document.getElementById("output").innerHTML = out;
}

function mycopy() {
    navigator.clipboard.writeText(document.getElementById("output").innerHTML);
}
