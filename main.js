import logs from './logs.js';
const $arena = document.querySelector('.arenas'),
    $formFight = document.querySelector('.control'),
    $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
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

const player2 = {
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

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

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

function changeHp(num) {
    this.hp -= num;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    return this.hp;
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

function playerWins(name) {
    const $losemsg = createElement('div', 'loseTitle');
    if (name) {
        $losemsg.textContent = name + ' win';
     //   switchLog('end');
    } else {
        $losemsg.textContent = 'drow';
    //    switchLog('draw');
    }
    return $losemsg;
}

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

function createReloadButton() {
    const $wrapper = createElement('div', 'reloadWrap');
    const $btnReload = createElement('button', 'button');
    $btnReload.textContent = ' Restart';
    $wrapper.appendChild($btnReload);
    $btnReload.addEventListener('click', () => {
        window.location.reload();
    });
    return $wrapper;
}

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];
    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    };
}

function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }
    return attack;
}

function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true;
        $arena.appendChild(createReloadButton());
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arena.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arena.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arena.appendChild(playerWins());
    }
}

function timeToFight() {
    const date = new Date();
    function getZero(num) {
        if (num > 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }
    const time = getZero(date.getHours()) + ':' + getZero(date.getMinutes());
    return time;
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
            text = logs[type][getRandom(type.length)].replace('[playerWins]', this.name)
                .replace('[playerLose]', this.name);
            el = `<p>${timeToFight()} ${text}</p>`;
            break;
        case 'hit':
            text = logs[type][getRandom(type.length)].replace('[playerKick]', player1.name)
                .replace('[playerDefence]', player2.name);
            el = `<p>${timeToFight()} ${text} ${- value}</p>`;
            break;
        case 'defence':
             text = logs[type][getRandom(type.length)].replace('[playerKick]', player2.name)
                .replace('[playerDefence]', player1.name);
            el = `<p>${timeToFight()} ${text}</p>`;
            break;
        case 'draw':
            text = logs[type][getRandom(type.length)];
            el = `<p>${timeToFight()} ${text}</p>`;
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', el);
}

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

