export const flowControl = (boardState, btn) => {
    const [newY, newX] = [parseInt(btn.dataset.y), parseInt(btn.dataset.x)];
    if (!boardState.mustAttack && btn.classList.contains(boardState.color)) {
        pickMan(boardState, btn);
        return;
    }
    if (!boardState.mustAttack && boardState.isPicked && btn.classList.contains('V')) {
        const [oldY, oldX] = [parseInt(boardState.pickedButton.dataset.y), parseInt(boardState.pickedButton.dataset.x)];
        console.log((newY == oldY + 1), newY, oldY + 1);
        if(
            (boardState.color == 'W' && newY == oldY - 1 && Math.abs(newX - oldX) == 1) ||
            (boardState.color == 'B' && newY == oldY + 1 && Math.abs(newX - oldX) == 1)
        ) {
            moveAhead(boardState, btn);
            return;
        }
    }
    
}

const pickMan = (boardState, btn) => {
    boardState.pickedButton = btn;
    boardState.isPicked = true;
}

const moveAhead = (boardState, btn) => {
    const [y, x] = [btn.dataset.y, btn.dataset.x];
    const [pickedY, pickedX] = [boardState.pickedButton.dataset.y, boardState.pickedButton.dataset.x];
    const color = boardState.color;
    if (btn.classList.contains(color)) {
        boardState.pickedButton = btn;
    }
    if (btn.classList.contains('V')) {
        btn.classList.remove(...btn.classList);
        btn.classList.add(...boardState.pickedButton.classList);
        boardState.pickedButton.classList.remove(...boardState.pickedButton.classList);
        boardState.pickedButton.classList.add('V');
        boardState.isPicked = false;
        boardState.color = (boardState.color == 'W') ? 'B' : 'W';
    }
}