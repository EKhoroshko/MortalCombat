import { createElement } from './createMark.js';
import { getRandom } from './getRandom.js';
import timeToFight from './time.js';
import logs from '../logs.js';

function playerWins(name) {
    const $losemsg = createElement('div', 'loseTitle');
    if (name) {
        $losemsg.textContent = name + ' win';
    } else {
        $losemsg.textContent = 'drow';
    }
    return $losemsg;
}

const $chat = document.querySelector('.chat');


function switchLog(type, player1, player2, value,) {
    let text = '';
    let el = '';
    switch (type) {
        case 'start':
            text = logs[type].replace('[player1]', player1.name)
                .replace('[player2]', player2.name).replace('[time]', timeToFight());
            el = `<p> ${text}</p>`;
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
            el = `<p>Вы играете слишком долго, сделайте перерыв</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}

export { playerWins, switchLog };
