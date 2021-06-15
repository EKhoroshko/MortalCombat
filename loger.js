import { createElement, createReloadButton } from './createMark.js';
import timeToFight from './time.js';
import logs from './logs.js';
import getRandom from './getRandom.js';
import { $arena, $formFight, $chat, player1, player2 } from './main.js';

function playerWins(name) {
    const $losemsg = createElement('div', 'loseTitle');
    if (name) {
        $losemsg.textContent = name + ' win';
    } else {
        $losemsg.textContent = 'drow';
    }
    return $losemsg;
}

function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true;
        $arena.appendChild(createReloadButton());
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arena.appendChild(playerWins(player2.name));
        switchLog('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arena.appendChild(playerWins(player1.name));
        switchLog('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arena.appendChild(playerWins());
        switchLog();
    }
}

function switchLog(type, player1, player2, value,) {
    let text = '';
    let el = '';
    switch (type) {
        case 'start':
            text = logs[type].replace('[player1]', player1.name)
                .replace('[player2]', player2.name).replace('[time]', timeToFight());
            el = `<p>${timeToFight()} ${text}</p>`;
            break;
        case 'end':
            text = logs[type][getRandom(type.length - 1)].replace('[playerWins]', player1.name)
                .replace('[playerLose]', player2.name);
            el = `<p>${timeToFight()} ${text}</p>`;
            break;
        case 'hit':
            text = logs[type][getRandom(type.length - 1)].replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            el = `<p>${timeToFight()} ${text} ${- value} ${player1.hp && player2.hp + '/' + 100}</p>`;
            break;
        case 'defence':
            text = logs[type][getRandom(type.length - 1)].replace('[playerKick]', player2.name)
                .replace('[playerDefence]', player1.name);
            el = `<p>${timeToFight()} ${text}</p>`;
            break;
        case 'draw':
            text = logs[type][getRandom(type.length - 1)];
            el = `<p>${timeToFight()} ${text}</p>`;
            break;
        default:
            el = `Вы играете слишком долго, сделайте перерыв`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}

export { playerWins, showResult, switchLog };