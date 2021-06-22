import { Player, player1, player2 } from "./player.js";
import { enemyAttack, playerAttack } from './dmg.js';
import { switchLog, showResult } from './utils/switc.js';

export default class Game {
    constructor() {
        this.$arena = document.querySelector('.arenas');
        this.player1 = new Player(player1);
        this.player2 = new Player(player2);
    }

    start() {
        this.player1.createPlayer();
        this.player2.createPlayer();
        switchLog('start', this.player1, this.player2);
    }

}

const $formFight = document.querySelector('.control');
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


