import { moveAhead } from "./moveAhead.js";
import { strike } from "./strike.js";
import { pickMan } from "./pickMan.js";

export const flowControl = boardState => {
    const btn = boardState.buttonPosition;
    const [newY, newX] = [parseInt(btn.dataset.y), parseInt(btn.dataset.x)];
    if (!boardState.mustAttack && btn.classList.contains(boardState.color)) {
        pickMan(boardState, btn);
        return;
    }
    if (!boardState.mustAttack && boardState.isPicked && btn.classList.contains('V')) { // Moving ahead
        const [oldY, oldX] = [parseInt(boardState.pickedButton.dataset.y), parseInt(boardState.pickedButton.dataset.x)];
        if(
            (boardState.color == 'W' && newY == oldY - 1 && Math.abs(newX - oldX) == 1) ||
            (boardState.color == 'B' && newY == oldY + 1 && Math.abs(newX - oldX) == 1)
        ) {
            moveAhead(boardState);
            return;
        }
    }
    if (boardState.mustAttack && !boardState.isPicked) { // We can only pick those, who must attack
        boardState.attackScenarios.forEach(scenario => {
            if (scenario.initial.y == parseInt(btn.dataset.y) && scenario.initial.x == parseInt(btn.dataset.x)) {
                pickMan(boardState);
            }
        });
        return;
    }
    
    if (boardState.mustAttack && boardState.isPicked) {
        strike(boardState);
        return;
    }
}