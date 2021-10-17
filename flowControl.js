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
    if (!boardState.mustAttack && boardState.isPicked) { // Moving ahead
        moveAhead(boardState);
        return;
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