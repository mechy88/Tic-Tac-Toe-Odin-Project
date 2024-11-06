function Gameboard() {
    this.tiles = [["-", "-", "-"], ["-", "-", "-"], ["-", "-", "-"]];
}

function Gamemode(gameboard) {
    this.gameboard = gameboard;
    this.markX = (x, y) => {
        gameboard.tiles[x][y] = "x"
    };
    this.markO = (x, y) => {
        gameboard.tiles[x][y] = "o"
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

gameboard = new Gameboard();
gamemode = new Gamemode(gameboard);

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