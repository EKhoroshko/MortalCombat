import { Player } from "./player.js";
import { enemyAttack, playerAttack, $formFight } from './dmg.js';
import { switchLog, playerWins } from './utils/switc.js';
import { createReloadButton } from './utils/createMark.js';

class Game {

    async getPlayers() {
        const playerStr = localStorage.getItem("player1");
        if (!playerStr) {
            window.location.pathname = "index.html";
        }
        localStorage.removeItem("player1");
        let p1;
        let p2;
        p1 = Object.assign({}, JSON.parse(playerStr));
        p2 = await fetch(
            "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
        ).then((res) => res.json());
        return {
            p1,
            p2,
        };
    }

    async start() {
        const { p1, p2 } = await this.getPlayers();

        this.player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas',
        });

        this.player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas',
        });

        this.player1.createPlayer();
        this.player2.createPlayer();
        switchLog('start', this.player1, this.player2);
        $formFight.addEventListener('submit', (e) => {
            this.submitCallback(e);
        });
    }

    submitCallback(e) {
        e.preventDefault();
        const enemy = enemyAttack();
        const player = playerAttack();

        if (player.defence !== enemy.hit) {

            this.player1.changeHp(enemy.value);
            this.player1.renderHP();

            switchLog('hit', this.player2, this.player1, enemy.value);
        } else {
            switchLog('defence', this.player2, this.player1);
        }

        if (enemy.defence !== player.hit) {
            this.player2.changeHp(player.value);
            this.player2.renderHP();
            switchLog('hit', this.player1, this.player2, player.value);
        } else {
            switchLog('defence', this.player1, this.player2);
        }
        this.showResult();
    }

    showResult() {
        const $arena = document.querySelector('.arenas');
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            $formFight.disabled = true;
            $arena.append(createReloadButton());
        }

        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            $arena.appendChild(playerWins(this.player2.name));
            switchLog('end', this.player2, this.player1);
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            $arena.appendChild(playerWins(this.player1.name));
            switchLog('end', this.player1, this.player2);
        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
            $arena.appendChild(playerWins());
            switchLog('draw');
        }
    }

}

export { Game };