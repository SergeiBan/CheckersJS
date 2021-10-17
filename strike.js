import { pickMan } from "./pickMan.js";
import { discardScenarios } from "./discardScenarios.js";
import { checkForTargets } from "./checkForTargets.js";

export const strike = boardState => {
    const btn = boardState.buttonPosition;
    const pickedBtn = boardState.pickedButton;
    const [newY, newX] = [parseInt(btn.dataset.y), parseInt(btn.dataset.x)];
    const [pickedY, pickedX] = [parseInt(pickedBtn.dataset.y), parseInt(pickedBtn.dataset.x)];
    for (let i = 0; i < boardState.attackScenarios.length; i++) {
        const scenario = boardState.attackScenarios[i];
        if (scenario.initial.y == newY && scenario.initial.x == newX) {
            pickMan(boardState);
            return;
        }
        console.log(scenario.stops, newY, newX);
        if (scenario.stops[0].y == newY && scenario.stops[0].x == newX
        && scenario.initial.y == pickedY && scenario.initial.x == pickedX) {

            discardScenarios(scenario, boardState);

            btn.classList.remove(...btn.classList);
            btn.classList.add(...boardState.pickedButton.classList);
            boardState.boardNow[newY][newX] = boardState.boardNow[pickedY][pickedX];

            boardState.pickedButton.classList.remove(...boardState.pickedButton.classList);
            boardState.pickedButton.classList.add('V');
            boardState.boardNow[pickedY][pickedX] = 'V';

            const [eatenY, eatenX] = [scenario.eaten[0].y, scenario.eaten[0].x];
            const target = document.querySelector(`[data-y="${eatenY}"][data-x="${eatenX}"]`);
            target.classList.remove(...target.classList);
            target.classList.add('V');
            boardState.boardNow[eatenY][eatenX] = 'V';

            if (scenario.counter > 1) {
                boardState.pickedButton = boardState.buttonPosition;
                scenario['initial'] = scenario['stops'][0];
                scenario['stops'].shift();
                scenario['eaten'].shift();
                scenario['counter'] -= 1;
                return;
            } else {
                const newScenarios = checkForTargets(boardState);
                boardState.mustAttack = (newScenarios.length > 0) ? true : false;
                boardState.attackScenarios = newScenarios;
                boardState.color = (boardState.color == 'W') ? 'B' : 'W';
                return;
            }
        }
    }
    
}