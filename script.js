var content = document.getElementById('content');
var cells = [];
var q1 = [];
var q2 = [];
var q3 = [];
var q4 = [];
var q5 = [];
var q6 = [];
var q7 = [];
var q8 = [];
var q9 = [];
var number;
var counter = 0;

function createGrid() {
    var html = "";
    for (var y = 0; y < 9; y++) {


        for (x = 0; x < 9; x++) {
            html += '<div id="cell-r' + (y + 1) + '-c' + (x + 1) + '" class="cell row' + (y + 1) + '"></div>';

            // cells[y][x].style.width = cellWidth + 'px';
            // cells[y][x].style.height = cellHeight + 'px';
        }
    }
    content.innerHTML = html;
    for (var y = 0; y < 9; y++) {
        cells.push(y);
        cells[y] = document.querySelectorAll('.row' + (y + 1));
    }
}

function createSections() {

    //Create Q1, Q2, Q3
    for (y = 0; y < 3; y++) {
        for (x = 0; x < 3; x++) {
            q1.push(cells[y][x]);
        }

        for (x = 3; x < 6; x++) {
            q2.push(cells[y][x]);
        }

        for (x = 6; x < 9; x++) {
            q3.push(cells[y][x]);
        }
    }

    //Create Q4, Q5, Q6
    for (y = 3; y < 6; y++) {
        for (x = 0; x < 3; x++) {
            q4.push(cells[y][x]);
        }

        for (x = 3; x < 6; x++) {
            q5.push(cells[y][x]);
        }

        for (x = 6; x < 9; x++) {
            q6.push(cells[y][x]);
        }
    }

    //Create Q7, Q8, Q9
    for (y = 6; y < 9; y++) {
        for (x = 0; x < 3; x++) {
            q7.push(cells[y][x]);
        }

        for (x = 3; x < 6; x++) {
            q8.push(cells[y][x]);
        }

        for (x = 6; x < 9; x++) {
            q9.push(cells[y][x]);
        }
    }

    //Styling sections
    for (i = 0; i < q1.length; i++) {
        q1[i].classList.add("lighter");
        q2[i].classList.add("darker");
        q3[i].classList.add("lighter");
        q4[i].classList.add("darker");
        q5[i].classList.add("lighter");
        q6[i].classList.add("darker");
        q7[i].classList.add("lighter");
        q8[i].classList.add("darker");
        q9[i].classList.add("lighter");
    }
}

function fill() {

    for (var r = 0; r < 9; r++) {
        var prevNumbers = [];
        var fillArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        for (var c = 0; c < 9; c++) {
            
            if (r > 0) {
                fillArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                var colNumbers = getColumnNumbers(c);
                var quadNumbers = getQuadNumbers(Math.floor(r/3), Math.floor(c/3));
                fillArray = fillArray.filter(function(n) { return quadNumbers.indexOf(n) == -1; });
                fillArray = fillArray.filter(function(n) { return colNumbers.indexOf(n) == -1; });
                fillArray = fillArray.filter(function(n) { return prevNumbers.indexOf(n) == -1; });
                console.log(quadNumbers);
                console.log(colNumbers);
                debugger;
            }
            //console.log(fillArray);
            if(fillArray.length == 0){
                var counter;
                if (!counter) {
                    counter = 1;
                }
                counter++;
                debugger;
                prevNumbers = [];
                c=-1;
                for (i = 0; i < 9; i++) {
                    cells[r][i].innerHTML = "";
                }
                if (counter < 300) {
                    for (var r = 0; r < 9; r++) {
                        for (var c = 0; c < 9; c++) {
                            cells[r][c].innerHTML = ""; 
                        }
                    }
                    fill();
                }
                continue;
            }

            var index = Math.floor((Math.random() * fillArray.length));
            cells[r][c].innerHTML = fillArray[index];
            prevNumbers.push(fillArray[index]);
            fillArray.splice(index, 1);
        }
    }
}

function getColumnNumbers(c) {
    var arr = [];
    for (var r = 0; r < 9; r++) {
        var n = cells[r][c].innerHTML;
        if (n != "")
            arr.push(Number(n));
    }
    
    return arr;
}

function getQuadNumbers(qr, qc) {
    var arrQuad = [];
    for (var r = 0; r < 3; r++) {
        for ( var c = 0; c < 3; c++) {
            var n = cells[qr * 3 + r][qc * 3 + c].innerHTML;
            if ( n != "")
                arrQuad.push(Number(n));
        }
    }

    return arrQuad;
}

createGrid();
createSections();
fill();