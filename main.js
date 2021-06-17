import { enemyAttack, playerAttack } from './dmg.js';
import Player from './player.js';
import { showResult, switchLog } from './loger.js';


export const $arena = document.querySelector('.arenas');
export const $formFight = document.querySelector('.control');
export const $chat = document.querySelector('.chat');

export const player1 = new Player({
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    rootSelector: 'arenas',
});

export const player2 = new Player({
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    rootSelector: 'arenas',
});

function init() {
    player1.createPlayer();
    player2.createPlayer();
}
init();

$formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHp(enemy.value);
        player1.renderHP();
        switchLog('hit', player2, player1, enemy.value);
    } else {
        switchLog('defence', player2, player1);
    }

    if (enemy.defence !== player.hit) {
        player2.changeHp(player.value);
        player2.renderHP();
        switchLog('hit', player1, player2, player.value);
    } else {
        switchLog('defence', player1, player2);
    }

    showResult();
});

switchLog('start', player1, player2);