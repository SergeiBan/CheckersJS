import { checkForTargets } from "./checkForTargets.js";

export const moveAhead = boardState => {
    const btn = boardState.buttonPosition;
    const [y, x] = [btn.dataset.y, btn.dataset.x];
    const [pickedY, pickedX] = [boardState.pickedButton.dataset.y, boardState.pickedButton.dataset.x];
    const color = boardState.color;
    if (btn.classList.contains(color)) {
        boardState.pickedButton = btn;
    }
    if (btn.classList.contains('V')) {
        btn.classList.remove(...btn.classList);
        btn.classList.add(...boardState.pickedButton.classList);
        boardState.boardNow[y][x] = boardState.boardNow[pickedY][pickedX];

        boardState.pickedButton.classList.remove(...boardState.pickedButton.classList);
        boardState.pickedButton.classList.add('V');
        boardState.boardNow[pickedY][pickedX] = 'V';

        boardState.isPicked = false;
        boardState.attackScenarios = checkForTargets(boardState);
        if (boardState.attackScenarios.length > 0) { boardState.mustAttack = true; }
        
        boardState.color = (boardState.color == 'W') ? 'B' : 'W';
    }
}