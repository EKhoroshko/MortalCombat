import { enemyAttack, playerAttack } from './dmg.js';
import { createElement} from './createMark.js';
import { changeHp, elHP, renderHP } from './render.js';
import { showResult, switchLog } from './loger.js';

export const $arena = document.querySelector('.arenas'),
            $formFight = document.querySelector('.control'),
            $chat = document.querySelector('.chat');

export const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: 'harpoon',
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    },
    changeHp,
    elHP,
    renderHP,
};

export const player2 = {
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: 'suriken',
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    },
    changeHp,
    elHP,
    renderHP,
};

function createPlayer(obj) {
    const $box = createElement('div', 'player' + obj.player);
    const $progres = createElement('div', 'progressbar');
    const $life = createElement('div', 'life');
    const $pname = createElement('div', 'name');
    const $char = createElement('div', 'character');
    const picter = createElement('img');

    $life.style.width = `${obj.hp}%`;
    $pname.textContent = obj.name;
    picter.src = obj.img;
    $progres.append($life, $pname);
    $char.appendChild(picter);
    $box.append($progres, $char);
    return $box;
}

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));

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