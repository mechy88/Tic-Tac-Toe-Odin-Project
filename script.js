ui_gameboard = document.querySelector("#gameboard");
console.log(ui_gameboard);

let tiles = [[], [], []];

function Gameboard() {
    this.tiles = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
}

function Gamemode(gameboard) {
    // true = X; false = O
    this.state = true;
    this.gameboard = gameboard;
    this.mark = (sym, x, y) => {
        gameboard.tiles[x][y] = sym;
        return new Move(sym, x, y);
    };

    //Utility Functions
    this.printPretty = () => {
        let returnValue = "";
        gameboard.tiles.forEach(element => {
            element.forEach(element => {
                returnValue = returnValue + element;
            })
            returnValue = returnValue + "\n";
        });
        return returnValue;
    }

    this.winCheck = (move) => {
        // check for row
        if (this.gameboard.tiles[move.x].every(element => element == move.sym)) return true;

        // check for column
        if (this.gameboard.tiles.every(element => element[move.y] == move.sym)) return true;

        // check for diagonal backslash
        if (move.x == move.y) {
            if (this.gameboard.tiles.every((element, index) => element[index] == move.sym)) return true;
        }

        // check for diagonal forward slash
        if (move.x + move.y == 2) {
            if (this.gameboard.tiles.every((element, index) => element[element.length - index - 1] == move.sym)) return true;
        }
        return false;
    }
}

function Move(sym, x, y) {
    this.sym = sym;
    this.x = x;
    this.y = y;
}

function render(gameboard) {
    for (let x = 0; x < ui_gameboard.children.length; x++) {
        for (let y = 0; y < ui_gameboard.children[x].children.length; y++) {
            ui_gameboard.children[x].children[y].textContent = gameboard.tiles[x][y];
        }
    }
}

gameboard = new Gameboard();
gamemode = new Gamemode(gameboard);

for (let x = 0; x < ui_gameboard.children.length; x++) {
    for (let y = 0; y < ui_gameboard.children[x].children.length; y++) {
        ui_tile = ui_gameboard.children[x].children[y];
        ui_tile.x = x;
        ui_tile.y = y;

        console.log(ui_tile.x, ui_tile.y);
        ui_tile.addEventListener('click', () => {
            let sym = gamemode.state ? "x" : "o";
            move = gamemode.mark(sym, ui_gameboard.children[x].children[y].x, ui_gameboard.children[x].children[y].y);
            render(gameboard);
            if (gamemode.winCheck(move)) alert("Win!");
            gamemode.state = !gamemode.state;

        })
    }
}

// console.log(gamemode.printPretty());

// gamemode.markX(0, 0);
// gamemode.markX(1, 1);
// gamemode.markX(2, 2);

// console.log(gamemode.printPretty());

// console.log(gamemode.winCheck(new Move("x", 0, 0)));

/*

move = {
"x" -input symbol/turn,
x - x coordinate
y - y coordinate
}

check every row and column (and diagonal if applecable) if the player won

*/