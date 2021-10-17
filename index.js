import { flowControl } from "./flowControl.js";

// const board = [
//     ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'],
//     ['B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V'],
//     ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'],
//     ['B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V'],
//     ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
//     ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
//     ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W'],
//     ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V'],
//     ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W'],
//     ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V']
// ];

const board = [
    ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'],
    ['B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V'],
    ['V', 'B', 'V', 'B', 'V', 'B', 'V', 'B', 'V', 'B'],
    ['B', 'V', 'B', 'V', 'B', 'V', 'V', 'V', 'B', 'V'],
    ['V', 'V', 'V', 'V', 'V', 'B', 'V', 'B', 'V', 'V'],
    ['V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V', 'V'],
    ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'V'],
    ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V'],
    ['V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W'],
    ['W', 'V', 'W', 'V', 'W', 'V', 'W', 'V', 'W', 'V']
];

const boardElement = document.createElement("div");
boardElement.classList.add("board");
document.body.appendChild(boardElement);

const boardState = {
    color: 'W',
    mustAttack: false,
    isPicked: false,
    boardNow: board,
    pickedButton: 0,
    buttonPosition: 0,
    attackScenarios: []
}

for (let row = 0; row < board.length; row++) {
    for (let man = 0; man < board.length; man++) {
        let btn = document.createElement("button");
        btn.classList.add(board[row][man]);
        if (row == 6 && man == 3) { btn.classList.add('Q'); board[row][man] += 'Q';}
        btn.setAttribute('data-y', row);
        btn.setAttribute('data-x', man);
        btn.onclick = function() {
            boardState.buttonPosition = btn;
            flowControl(boardState, btn);
        }
        boardElement.appendChild(btn);
    }
}